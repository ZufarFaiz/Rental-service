import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../../pages/main-page/main-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { FavoritesPages } from "../../pages/favorites-page/favorites-page";
import { OfferPage } from "../../pages/offer-page/offer-page";
import { NotFound } from "../not-found/not-found";
import { PrivateRoute } from "../private-route/private-route";
import type { FullOffer, OffersList } from "../../types/offer";
import type { ReviewType } from "../../types/reviews";
import { useAppSelector } from "../../hooks";
import { LoadingScreen } from "../loading-screen/loading-screen";
import {AppRoute, AuthorizationStatus} from "../../conts.ts";

type AppMainPageProps = {
    rentalOffersCount: number;
    offersList: OffersList[];
    offers: FullOffer[];
    reviews: ReviewType[];
}

function App({ rentalOffersCount, offers, offersList, reviews }: AppMainPageProps) {
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

    if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
        return <LoadingScreen />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoute.Main} element={<MainPage offersList={offersList} />} />
                <Route path={AppRoute.Login} element={<LoginPage />} />

                <Route path={AppRoute.Offer} element={<OfferPage offers={offers} reviews={reviews} />} />

                <Route path={AppRoute.Favorites} element={
                    <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                        <FavoritesPages offersList={offersList} />
                    </PrivateRoute>
                } />

                {/* ✅ NotFound должен быть последним */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export { App };