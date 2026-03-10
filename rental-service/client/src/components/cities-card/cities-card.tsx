// components/cities-card/cities-card.tsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavoriteAction } from '../../store/api-action';
import { AppRoute, AuthorizationStatus } from "../../conts.ts";
import './cities-card.css'

type CitiesCardProps = {
    id: string;
    title: string;
    type: string;
    price: number;
    isPremium: boolean;
    isFavorite: boolean;
    previewImage: string;
    rating: number;
    isNearby?: boolean;
    onMouseOver?: (id: string) => void;
    onMouseOut?: () => void;
}

function CitiesCard({
                        id,
                        title,
                        type,
                        price,
                        previewImage,
                        isPremium,
                        isFavorite,
                        rating,
                        isNearby = false,
                        onMouseOver,
                        onMouseOut
                    }: CitiesCardProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

    const [, setActiveOfferId] = useState('');

    const handleMouseOver = () => {
        setActiveOfferId(id);
        if (onMouseOver) {
            onMouseOver(id);
        }
    };

    const handleMouseOut = () => {
        setActiveOfferId('');
        if (onMouseOut) {
            onMouseOut();
        }
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('🔥 Favorite clicked:', {
            id,
            isFavorite,
            status: isFavorite ? 0 : 1,
            isAuthorized
        });

        if (!isAuthorized) {
            console.log('🚫 Not authorized, redirecting to login');
            navigate(AppRoute.Login);
            return;
        }

        dispatch(toggleFavoriteAction({
            offerId: id,
            status: isFavorite ? 0 : 1
        }))
            .unwrap()
            .then(() => {
                console.log('✅ Favorite toggled successfully');
            })
            .catch((error) => {
                console.error('❌ Failed to toggle favorite:', error);
            });
    };

    const imageWrapperClass = isNearby
        ? "near-places__image-wrapper place-card__image-wrapper"
        : "cities__image-wrapper place-card__image-wrapper";

    const articleClass = isNearby
        ? "near-places__card place-card"
        : "cities__card place-card";

    return (
        <article
            className={articleClass}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className={imageWrapperClass}>
                <Link to={`/offer/${id}`}>
                    <div className="place-card__image-container">
                        <img
                            className="place-card__image"
                            src={previewImage}
                            width="260"
                            height="200"
                            alt={title}
                            style={{ objectFit: 'cover' }}
                            onError={(e) => {
                                e.currentTarget.src = '/img/default-placeholder.jpg';
                            }}
                        />
                    </div>
                </Link>
            </div>

            <div className="place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button
                        className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
                        type="button"
                        onClick={handleFavoriteClick}
                    >
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                            {/* 👈 ИСПРАВЛЕНО: xlinkHref → href */}
                            <use href="/img/icon-bookmark.svg"></use>
                        </svg>
                        <span className="visually-hidden">
                            {isFavorite ? 'In bookmarks' : 'To bookmarks'}
                        </span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{width: `${rating * 20}%`}}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={`/offer/${id}`}>
                        {title}
                    </Link>
                </h2>
                <p className="place-card__type">{type}</p>
            </div>
        </article>
    );
}

export {CitiesCard};