import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-action';
import { AppRoute, AuthorizationStatus } from '../../conts';
import { Logo } from '../logo/logo';

function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const user = useAppSelector((state) => state.user);
    const favoritesCount = useAppSelector((state) =>
        state.offers.filter((offer) => offer.isFavorite).length
    );

    const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

    const handleLogout = async () => {
        try {
            await dispatch(logoutAction()).unwrap();
            navigate(AppRoute.Main);
        } catch (error) {
            console.error('Logout failed:', error);
            navigate(AppRoute.Main);
        }
    };

    console.log('👤 Header render - user:', user);
    console.log('👤 Avatar URL:', user?.avatarUrl);

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Logo />
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            {isAuthorized ? (
                                // Авторизованный пользователь
                                <>
                                    <li className="header__nav-item user">
                                        <Link
                                            className="header__nav-link header__nav-link--profile"
                                            to={AppRoute.Favorites}
                                        >
                                            <div
                                                className="header__avatar-wrapper user__avatar-wrapper"
                                                style={user?.avatarUrl ? {
                                                    backgroundImage: `url(http://localhost:8080/static/${user.avatarUrl})`,
                                                    borderRadius: '50%',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                } : {}}
                                            />
                                            <span className="header__user-name user__name">
                        {user?.email || 'user@mail.com'}
                      </span>
                                            <span className="header__favorite-count">
                        {favoritesCount}
                      </span>
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
                                </>
                            ) : (
                                // Гость
                                <li className="header__nav-item user">
                                    <Link
                                        className="header__nav-link header__nav-link--profile"
                                        to={AppRoute.Login}
                                    >
                                        <div className="header__avatar-wrapper user__avatar-wrapper" />
                                        <span className="header__login">Sign in</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export { Header };