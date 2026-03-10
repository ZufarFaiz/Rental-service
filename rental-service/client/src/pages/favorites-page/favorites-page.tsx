// pages/favorites-page/favorites-page.tsx
import { useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction, fetchFavoritesAction } from '../../store/api-action';
import { Logo } from "../../components/logo/logo";
import { FavoritesCardList } from "../../components/favorite-card-list/favorite-card-list";
import { AppRoute, AuthorizationStatus } from '../../conts.ts';

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
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <Logo />
                        </div>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item user">
                                    <Link
                                        className="header__nav-link header__nav-link--profile"
                                        to={AppRoute.Favorites}
                                    >
                                        <div
                                            className="header__avatar-wrapper user__avatar-wrapper"
                                            style={user?.avatarUrl ? {
                                                backgroundImage: `url(${user.avatarUrl})`,
                                                borderRadius: '50%',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            } : {}}
                                        />
                                        <span className="header__user-name user__name">
                                            {user?.email || 'user@mail.com'}
                                        </span>
                                        <span className="header__favorite-count">{favoritesCount}</span>
                                    </Link>
                                </li>
                                <li className="header__nav-item">
                                    <a
                                        className="header__nav-link"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLogout();
                                        }}
                                    >
                                        <span className="header__signout">Sign out</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

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