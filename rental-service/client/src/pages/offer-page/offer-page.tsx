// pages/offer-page/offer-page.tsx
import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOfferByIdAction, logoutAction, fetchReviewsAction, toggleFavoriteAction } from '../../store/api-action';
import { Logo } from '../../components/logo/logo';
import Map from '../../components/map/map';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { ReviewsList } from '../../components/review-list/review-list';
import { ReviewForm } from '../../components/review-form/review-form';
import type { City as CityType, Point } from '../../types/city';
import { AppRoute, AuthorizationStatus } from '../../conts.ts';

function OfferPage() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const fetchedRef = useRef(false);
    const [notFound, setNotFound] = useState(false);

    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const user = useAppSelector((state) => state.user);
    const offers = useAppSelector((state) => state.offers);
    const currentOffer = useAppSelector((state) => state.currentOffer);
    const isLoading = useAppSelector((state) => state.isOffersDataLoading);
    const error = useAppSelector((state) => state.error);
    const reviews = useAppSelector((state) => state.reviews);

    // Загрузка предложения
    useEffect(() => {
        if (!id) return;

        if (error === 'Offer not found') {
            setNotFound(true);
            return;
        }

        if (currentOffer?.id === id) {
            return;
        }

        if (fetchedRef.current) {
            return;
        }

        console.log('🔥 Fetching offer once:', id);
        dispatch(fetchOfferByIdAction(id));
        fetchedRef.current = true;
    }, [id, dispatch, currentOffer, error]);

    // Загрузка отзывов
    useEffect(() => {
        if (id && currentOffer) {
            dispatch(fetchReviewsAction(id));
        }
    }, [id, currentOffer, dispatch]);

    const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

    const handleFavoriteClick = () => {
        if (!isAuthorized) {
            navigate(AppRoute.Login);
            return;
        }

        dispatch(toggleFavoriteAction({
            offerId: currentOffer.id,
            status: currentOffer.isFavorite ? 0 : 1
        }));
    };

    if (notFound) {
        return <Navigate to="/404" replace />;
    }

    if (isLoading && !currentOffer) {
        return (
            <div className="page">
                <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    if (!currentOffer && fetchedRef.current && !isLoading) {
        return <Navigate to="/404" replace />;
    }

    if (!currentOffer) {
        return null;
    }

    const offerReviews = useMemo(() => {
        return reviews.filter((review) => review.offerId === id);
    }, [reviews, id]);

    const nearbyOffers = offers
        .filter((item) => item.id !== currentOffer.id && item.city.name === currentOffer.city.name)
        .slice(0, 3);

    const city: CityType = {
        title: currentOffer.city.name,
        lat: currentOffer.city.location.latitude,
        lng: currentOffer.city.location.longitude,
        zoom: currentOffer.city.location.zoom || 13,
    };

    const points: Point[] = [
        {
            title: currentOffer.title,
            lat: currentOffer.location.latitude,
            lng: currentOffer.location.longitude,
        },
        ...nearbyOffers.map((item) => ({
            title: item.title,
            lat: item.location.latitude,
            lng: item.location.longitude,
        })),
    ];

    const selectedPoint: Point = {
        title: currentOffer.title,
        lat: currentOffer.location.latitude,
        lng: currentOffer.location.longitude,
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutAction()).unwrap();
            navigate(AppRoute.Main);
        } catch (error) {
            navigate(AppRoute.Main);
        }
    };

    const favoritesCount = user && 'favoritesCount' in user ? user.favoritesCount : 0;

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
                                {isAuthorized ? (
                                    <>
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
                                    </>
                                ) : (
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

            <main className="page__main page__main--offer">
                <section className="offer">
                    <div className="offer__gallery-container container">
                        <div className="offer__gallery">
                            {currentOffer.images?.map((image) => (
                                <div key={image} className="offer__image-wrapper">
                                    <img
                                        className="offer__image"
                                        src={image}
                                        alt={currentOffer.title}
                                        onError={(e) => {
                                            e.currentTarget.src = '/img/default-placeholder.jpg';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="offer__container container">
                        <div className="offer__wrapper">
                            {currentOffer.isPremium && (
                                <div className="offer__mark">
                                    <span>Premium</span>
                                </div>
                            )}
                            <div className="offer__name-wrapper">
                                <h1 className="offer__name">
                                    {currentOffer.title}
                                </h1>
                                <button
                                    className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                                    type="button"
                                    onClick={handleFavoriteClick}
                                    disabled={!isAuthorized}
                                >
                                    <svg className="offer__bookmark-icon" width="31" height="33">
                                        <use href="#icon-bookmark" />
                                    </svg>
                                    <span className="visually-hidden">
                                        {currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                                    </span>
                                </button>
                            </div>
                            <div className="offer__rating rating">
                                <div className="offer__stars rating__stars">
                                    <span style={{ width: `${Math.round(currentOffer.rating) * 20}%` }} />
                                    <span className="visually-hidden">Rating</span>
                                </div>
                                <span className="offer__rating-value rating__value">
                                    {currentOffer.rating}
                                </span>
                            </div>
                            <ul className="offer__features">
                                <li className="offer__feature offer__feature--entire">
                                    {currentOffer.type}
                                </li>
                                <li className="offer__feature offer__feature--bedrooms">
                                    {currentOffer.bedrooms} Bedrooms
                                </li>
                                <li className="offer__feature offer__feature--adults">
                                    Max {currentOffer.maxAdults} adults
                                </li>
                            </ul>
                            <div className="offer__price">
                                <b className="offer__price-value">€{currentOffer.price}</b>
                                <span className="offer__price-text">&nbsp;night</span>
                            </div>
                            <div className="offer__inside">
                                <h2 className="offer__inside-title">What&apos;s inside</h2>
                                <ul className="offer__inside-list">
                                    {currentOffer.goods?.map((good) => (
                                        <li key={good} className="offer__inside-item">
                                            {good}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="offer__host">
                                <h2 className="offer__host-title">Meet the host</h2>
                                <div className="offer__host-user user">
                                    <div className={`offer__avatar-wrapper ${currentOffer.host?.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                                        {currentOffer.host?.avatarUrl && (
                                            <img
                                                className="offer__avatar user__avatar"
                                                src={currentOffer.host.avatarUrl}
                                                width="74"
                                                height="74"
                                                alt="Host avatar"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/img/default-avatar.jpg';
                                                }}
                                            />
                                        )}
                                    </div>
                                    <span className="offer__user-name">
                                        {currentOffer.host?.name}
                                    </span>
                                    {currentOffer.host?.isPro && (
                                        <span className="offer__user-status">Pro</span>
                                    )}
                                </div>
                                <div className="offer__description">
                                    <p className="offer__text">
                                        {currentOffer.description}
                                    </p>
                                </div>
                            </div>

                            <ReviewsList reviews={offerReviews} />
                            {isAuthorized && <ReviewForm offerId={id || ''} />}
                        </div>
                    </div>

                    <section className="offer__map map" style={{ width: '1144px', margin: '0 auto', display: 'block' }}>
                        <Map
                            city={city}
                            points={points}
                            selectedPoint={selectedPoint}
                        />
                    </section>
                </section>

                <div className="container">
                    <section className="near-places places">
                        <h2 className="near-places__title">Other places in the neighbourhood</h2>
                        <CitiesCardList
                            offersList={nearbyOffers}
                            isNearby={true}
                        />
                    </section>
                </div>
            </main>
        </div>
    );
}

export { OfferPage };