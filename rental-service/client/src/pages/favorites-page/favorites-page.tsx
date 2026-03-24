// pages/favorites-page/favorites-page.tsx
import { useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction, fetchFavoritesAction } from '../../store/api-action';
import { Logo } from "../../components/logo/logo";
import { FavoritesCardList } from "../../components/favorite-card-list/favorite-card-list";
import { AppRoute, AuthorizationStatus } from '../../conts.ts';
import {Header} from "../../components/header/header.tsx";

function FavoritesPages() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const user = useAppSelector((state) => state.user);
    const favorites = useAppSelector((state) => state.favorites);

    const favoritesCount = favorites.length;

    useEffect(() => {
        dispatch(fetchFavoritesAction());
    }, [dispatch]);

    const handleLogout = async () => {
        try {
            await dispatch(logoutAction()).unwrap();
            navigate(AppRoute.Main);
        } catch (error) {
            navigate(AppRoute.Main);
        }
    };

    if (authorizationStatus !== AuthorizationStatus.Auth) {
        return <Navigate to={AppRoute.Login} replace />;
    }

    return (
        <div className="page">
            <Header/>

            <main className="page__main page__main--favorites">
                <div className="page__favorites-container container">
                    {favoritesCount === 0 ? (
                        <section className="favorites favorites--empty">
                            <h1 className="visually-hidden">Favorites (empty)</h1>
                            <div className="favorites__status-wrapper">
                                <b className="favorites__status">Nothing yet saved.</b>
                                <p className="favorites__status-description">
                                    Save properties to narrow down search or plan your future trips.
                                </p>
                            </div>
                        </section>
                    ) : (
                        <section className="favorites">
                            <h1 className="favorites__title">Saved listing</h1>
                            <FavoritesCardList offersList={favorites} />
                        </section>
                    )}
                </div>
            </main>

            <footer className="footer container">
                <Link className="footer__logo-link" to={AppRoute.Main}>
                    <img
                        className="footer__logo"
                        src="img/logo.svg"
                        alt="Rent service logo"
                        width="64"
                        height="33"
                    />
                </Link>
            </footer>
        </div>
    );
}

export { FavoritesPages };