import { createAction } from '@reduxjs/toolkit';
import type {OffersList} from "../types/offer.ts";
import type {City} from "../types/city.ts";
import type {AuthorizationStatusType} from "../types/authorization-status.ts";


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

export { changeCity, offersCityList,requireAuthorization,setError, setOffersDataLoadingStatus };
