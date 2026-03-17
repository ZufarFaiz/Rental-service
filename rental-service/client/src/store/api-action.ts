import {
    offersCityList,
    requireAuthorization,
    setError,
    setOffersDataLoadingStatus,
    setUser,
    setCurrentOffer, setReviewSubmittingStatus, addReview, setReviews, setFavorites
} from './action';
import {saveToken, dropToken} from '../services/token';
import {createAsyncThunk} from "@reduxjs/toolkit";
import type {AxiosInstance} from "axios";
import type {AppDispatch, State} from "../types/state.ts";
import type {AuthData, UserData} from "../types/user-data.ts";
import {store} from "./index.ts";
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from "../conts.ts";
import {adaptFullOfferToClient, adaptOffersListToClient} from "../adapters/offer-adapters.ts";
import {adaptCommentToServer, adaptReviewsToClient, adaptReviewToClient} from "../adapters/review-adapter.ts";

// Проверка авторизации
const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'user/checkAuth',
    async (_arg, {dispatch, extra: api}) => {
        try {
            const { data } = await api.get(APIRoute.Check);
            dispatch(requireAuthorization(AuthorizationStatus.Auth));
            if (data) {
                dispatch(setUser(data));
            }
        } catch {
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            dispatch(setUser(null));
        }
    },
);

// Вход
const loginAction = createAsyncThunk<
    UserData,
    AuthData,
    { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
    'user/login',
    async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
        try {
            const { data } = await api.post<UserData>(APIRoute.Login, { email, password });

            if (data.token) {
                saveToken(data.token);
            }

            dispatch(requireAuthorization(AuthorizationStatus.Auth));
            dispatch(setUser(data));

            return data;
        } catch (err) {
            dropToken();
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            dispatch(setUser(null));
            return rejectWithValue('Login failed');
        }
    }
);

// Выход
const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'user/logout',
    async (_arg, {dispatch, extra: api}) => {
        try {
            await api.delete(APIRoute.Logout);
        } catch (error) {
            console.warn('Logout API error, cleaning up locally');
        } finally {
            dropToken();
            dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            dispatch(setUser(null));
        }
    },
);

const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchOffers',
    async (_arg, {dispatch, extra: api}) => {
        dispatch(setOffersDataLoadingStatus(true));
        try {
            const { data } = await api.get(APIRoute.Offers);
            // Преобразуем данные с сервера в формат клиента
            const adaptedOffers = data.map((offer: any) => adaptOffersListToClient(offer));
            dispatch(offersCityList(adaptedOffers));
        } catch (error) {
            dispatch(setError('Failed to load offers'));
        } finally {
            dispatch(setOffersDataLoadingStatus(false));
        }
    },
);
const fetchOfferByIdAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchOfferById',
    async (offerId, { dispatch, extra: api, getState }) => {
        // Проверяем, не загружен ли уже этот оффер
        const state = getState() as State;
        if (state.currentOffer?.id === offerId) {
            return;
        }

        dispatch(setOffersDataLoadingStatus(true));
        try {
            console.log(`🔍 Fetching offer with id: ${offerId}`);
            const { data } = await api.get(`${APIRoute.Offers}/offer/${offerId}`);

            const adaptedOffer = adaptFullOfferToClient(data);
            dispatch(setCurrentOffer(adaptedOffer));
            dispatch(setError(null)); // Сбрасываем ошибку при успехе
        } catch (error: any) {
            console.error('❌ Failed to fetch offer:', error);

            // Если 404 - устанавливаем специальную ошибку
            if (error.response?.status === 404) {
                dispatch(setError('Offer not found'));
            } else {
                dispatch(setError('Failed to load offer'));
            }

            dispatch(setCurrentOffer(null));
        } finally {
            dispatch(setOffersDataLoadingStatus(false));
        }
    },
);

const fetchReviewsAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'reviews/fetchReviews',
    async (offerId, { dispatch, extra: api }) => {
        try {
            const { data } = await api.get(`${APIRoute.Reviews}/${offerId}`);
            const adaptedReviews = adaptReviewsToClient(data, offerId);
            dispatch(setReviews(adaptedReviews));
        } catch (error) {
            dispatch(setError('Failed to load reviews'));
        }
    },
);

// ✅ Отправка нового отзыва
const postReviewAction = createAsyncThunk<void, {
    offerId: string;
    rating: number;
    comment: string;
}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
}>(
    'reviews/postReview',
    async ({ offerId, rating, comment }, { dispatch, extra: api, rejectWithValue }) => {
        dispatch(setReviewSubmittingStatus(true));

        try {
            const commentData = adaptCommentToServer(rating, comment);

            await api.post(`${APIRoute.Reviews}/${offerId}/add-review`, commentData);

            await dispatch(fetchReviewsAction(offerId));

            dispatch(setError(null));

        } catch (error: any) {
            dispatch(setError('Failed to post review'));
            return rejectWithValue('Failed to post review');
        } finally {
            dispatch(setReviewSubmittingStatus(false));
        }
    },
);

// store/api-action.ts
// Добавьте этот action для работы с избранным

// Добавить/удалить из избранного
const toggleFavoriteAction = createAsyncThunk<void, {
    offerId: string;
    status: boolean; // 👈 Изменяем с number на boolean
}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/toggleFavorite',
    async ({ offerId, status }, { dispatch, extra: api }) => {
        try {
            console.log(`🔍 Toggling favorite for offer ${offerId} with status ${status}`);

            const url = `${APIRoute.Favorite}/${offerId}/${status}`; // status будет true/false
            console.log('📡 Request URL:', url);

            const response = await api.post(url);
            console.log('✅ Toggle response:', response.data);

            await dispatch(fetchOffersAction());
            await dispatch(fetchFavoritesAction());

        } catch (error: any) {
            console.error('❌ Failed to update favorite:', error);
            console.error('❌ Error response:', error.response?.data);
            console.error('❌ Error status:', error.response?.status);
            dispatch(setError('Failed to update favorite'));
        }
    },
);
const fetchFavoritesAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
    'data/fetchFavorites',
    async (_arg, { dispatch, extra: api }) => {
        try {
            console.log('🔍 Fetching favorites...');
            const { data } = await api.get(APIRoute.Favorite);
            console.log('✅ Raw favorites data from server:', JSON.stringify(data, null, 2));

            const adaptedFavorites = data.map((offer: any) => {
                console.log('🔄 Adapting offer:', offer);
                return adaptOffersListToClient(offer);
            });

            console.log('✅ Adapted favorites:', adaptedFavorites);

            dispatch(setFavorites(adaptedFavorites));

        } catch (error) {
            console.error('❌ Failed to load favorites:', error);
            dispatch(setError('Failed to load favorites'));
        }
    },
);
// Очистка ошибки
const clearErrorAction = createAsyncThunk(
    'clearError',
    () => {
        setTimeout(
            () => store.dispatch(setError(null)),
            TIMEOUT_SHOW_ERROR,
        );
    },
);

export {
    fetchOffersAction,
    fetchOfferByIdAction,
    checkAuthAction,
    loginAction,
    logoutAction,
    clearErrorAction,
    fetchReviewsAction,
    postReviewAction,
    toggleFavoriteAction,
    fetchFavoritesAction
};