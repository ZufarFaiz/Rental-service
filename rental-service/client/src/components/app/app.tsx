import { BrowserRouter, Route, Routes } from "react-router-dom";
import {MainPage} from "../../pages/main-page/main-page.tsx";
import {AppRoute,AuthorizationStatus} from "../../conts.ts";
import {LoginPage} from "../../pages/login-page/login-page.tsx";
import {FavoritesPages} from "../../pages/favorites-page/favorites-page.tsx";
import {OfferPage} from "../../pages/offer-page/offer-page.tsx";
import {NotFound} from "../not-found/not-found.tsx";
import {PrivateRoute} from "../private-route/private-route.tsx";
import type {FullOffer,OffersList} from "../../types/offer.ts";




type AppMainPageProps = {
    rentalOffersCount: number;
    offersList: OffersList[];
    offers: FullOffer[];
}

function App({rentalOffersCount,offers,offersList}: AppMainPageProps) {
    return (
        <BrowserRouter>
        <Routes>
            <Route path={AppRoute.Main}
                   element={<MainPage rentalOffersCount={rentalOffersCount} offersList={offersList}/>}/>
            <Route path={AppRoute.Login} element={<LoginPage/>}/>

            <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage offers={offers}/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path={AppRoute.Favorites} element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                    <FavoritesPages  offersList={offersList}/>
                </PrivateRoute>
            }/>
        </Routes>
            </BrowserRouter>
    )
}

export {App};