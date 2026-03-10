import { createAction } from '@reduxjs/toolkit';
import type {FullOffer, OffersList} from "../types/offer.ts";
import type {City} from "../types/city.ts";
import type {AuthorizationStatusType} from "../types/authorization-status.ts";
import type {UserData} from "../types/user-data.ts";
import type {ReviewType} from "../types/reviews.ts";

const changeCity = createAction('offers/changedity', (city: City) => ({
    payload: city
}));

const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
    payload: offers
}));

const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

const setError = createAction('setError', (error: string | null) => ({
    payload: error
}));

const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

const setUser = createAction('user/setUser', (user: UserData | null) => ({
    payload: user
}));

const setCurrentOffer = createAction<FullOffer | null>('offer/setCurrentOffer');
const setReviews = createAction<ReviewType[]>('reviews/setReviews');
const addReview = createAction<ReviewType>('reviews/addReview');
const setReviewSubmittingStatus = createAction<boolean>('reviews/setReviewSubmittingStatus');
const setFavorites = createAction<OffersList[]>('data/setFavorites');
export {
    changeCity,
    offersCityList,
    requireAuthorization,
    setError,
    setOffersDataLoadingStatus,
    setUser,
    setCurrentOffer,
    setReviews,
    addReview,
    setReviewSubmittingStatus,
    setFavorites,
};