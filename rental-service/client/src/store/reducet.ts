// store/reducer.ts
import { createReducer } from '@reduxjs/toolkit';
import {
    changeCity,
    offersCityList,
    requireAuthorization,
    setCurrentOffer,
    setError,
    setOffersDataLoadingStatus,
    setUser,
    setReviews,
    addReview,
    setReviewSubmittingStatus,
    setFavorites  // 👈 Импортируем
} from './action';
import { AuthorizationStatus, CITIES_LOCATION } from "../conts.ts";
import { getCity } from "../util";
import type { City } from "../types/city";
import type { FullOffer, OffersList } from "../types/offer";
import type { AuthorizationStatusType } from "../types/authorization-status";
import type { UserData } from "../types/user-data";
import type { ReviewType } from "../types/reviews.ts";

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitialState = {
    city: City | undefined;
    offers: OffersList[];
    authorizationStatus: AuthorizationStatusType;
    error: string | null;
    isOffersDataLoading: boolean;
    user: UserData | null;
    currentOffer: FullOffer | null;
    reviews: ReviewType[];
    isReviewSubmitting: boolean;
    favorites: OffersList[];  // 👈 Добавляем поле для избранного
}

const initialState: InitialState = {
    city: defaultCity,
    offers: [],
    authorizationStatus: AuthorizationStatus.Unknown,
    error: null,
    isOffersDataLoading: false,
    user: null,
    currentOffer: null,
    reviews: [],
    isReviewSubmitting: false,
    favorites: [],  // 👈 Инициализируем
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeCity, (state, action) => {
            state.city = action.payload;
        })
        .addCase(offersCityList, (state, action) => {
            state.offers = action.payload;
        })
        .addCase(requireAuthorization, (state, action) => {
            state.authorizationStatus = action.payload;
        })
        .addCase(setError, (state, action) => {
            state.error = action.payload;
        })
        .addCase(setOffersDataLoadingStatus, (state, action) => {
            state.isOffersDataLoading = action.payload;
        })
        .addCase(setUser, (state, action) => {
            state.user = action.payload;
        })
        .addCase(setCurrentOffer, (state, action) => {
            state.currentOffer = action.payload;
        })
        .addCase(setReviews, (state, action) => {
            state.reviews = action.payload;
        })
        .addCase(addReview, (state, action) => {
            state.reviews.push(action.payload);
        })
        .addCase(setReviewSubmittingStatus, (state, action) => {
            state.isReviewSubmitting = action.payload;
        })
        // 👇 Новый обработчик для избранного
        .addCase(setFavorites, (state, action) => {
            console.log('💾 Setting favorites in store:', action.payload);
            state.favorites = action.payload;
        });
});

export { reducer };