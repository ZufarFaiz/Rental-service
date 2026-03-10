// components/favorite-card/favorite-card.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavoriteAction } from '../../store/api-action';
import { AppRoute, AuthorizationStatus } from "../../conts.ts";

type FavoritesCardProps = {
    id: string;
    title: string;
    type: string;
    price: number;
    isPremium: boolean;
    previewImage: string;
    rating: number;
    isFavorite: boolean;
}

function FavoritesCard({
                           id,
                           title,
                           type,
                           price,
                           previewImage,
                           isPremium,
                           rating,
                           isFavorite
                       }: FavoritesCardProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

    const handleFavoriteClick = () => {
        if (!isAuthorized) {
            navigate(AppRoute.Login);
            return;
        }

        dispatch(toggleFavoriteAction({
            offerId: id,
            status: isFavorite ? 0 : 1
        }));
    };

    return(
        <article className="favorites__card place-card">
            {isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className="favorites__image-wrapper place-card__image-wrapper">
                <Link to={`/offer/${id}`}>
                    <img
                        className="place-card__image"
                        src={previewImage}
                        width="150"
                        height="110"
                        alt={title}
                        onError={(e) => {
                            e.currentTarget.src = '/img/default-placeholder.jpg';
                        }}
                    />
                </Link>
            </div>
            <div className="favorites__card-info place-card__info">
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
                            <use href="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">
                            {isFavorite ? 'In bookmarks' : 'To bookmarks'}
                        </span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{width: `${Math.round(rating) * 20}%`}}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={`/offer/${id}`}>{title}</Link>
                </h2>
                <p className="place-card__type">{type}</p>
            </div>
        </article>
    )
}

export {FavoritesCard};