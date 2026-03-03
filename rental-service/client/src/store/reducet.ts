import { createReducer } from '@reduxjs/toolkit';
import {changeCity, offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus} from './action';
import {AuthorizationStatus, CITIES_LOCATION} from "../conts.ts";
import {getCity} from "../util.ts";
import type {City} from "../types/city.ts";
import type {OffersList} from "../types/offer.ts";
import type {AuthorizationStatusType} from "../types/authorization-status.ts";

const defaultCity = getCity('Paris', CITIES_LOCATION);

export type InitialState = {
    city: City | undefined;
    offers: OffersList[];
    authorizationStatus: AuthorizationStatusType;
    error: string | null;
    isOffersDataLoading: boolean;
}

const initialState : InitialState = {
    city: defaultCity,
    offers: [],
    authorizationStatus: AuthorizationStatus.UnknownAuth,
    error: null,
    isOffersDataLoading: false,
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

});

export { reducer };
