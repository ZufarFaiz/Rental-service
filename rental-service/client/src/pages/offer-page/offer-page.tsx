import {Logo} from "../../components/logo/logo.tsx";
import type {FullOffer} from "../../types/offer.ts";
import {Link, useParams} from "react-router-dom";
import {NotFound} from "../../components/not-found/not-found.tsx";
import {ReviewForm} from "../../components/review-form/review-form.tsx";
import {AppRoute} from "../../conts.ts";

type OfferProps = {
    offers: FullOffer[];
}

function OfferPage({offers}: OfferProps) {
    const params=useParams();
    const offer = offers.find((item)=>item.id === params.id);

    if (!offer) {
        return <NotFound/>;
    }

    return (
        <div className="page">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <Logo/>
                        </div>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item user">
                                    <a className="header__nav-link header__nav-link--profile" href="#">
                                        <div className="header__avatar-wrapper user__avatar-wrapper">
                                        </div>
                                        <span className="header__user-name user__name">Myemail@gmail.com</span>
                                        <span className="header__favorite-count">3</span>
                                    </a>
                                </li>
                                <li className="header__nav-item">
                                    <a className="header__nav-link" href="#">
                                        <span className="header__signout">Sign out</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="page__main page__main--offer">
                <section className="offer">
                    <div className="offer__gallery-container container">
                        <div className="offer__gallery">
                            {offer.images.map((image) => (
                                <div key={image} className="offer__image-wrapper">
                                    <img className="offer__image" src={image} alt="Photo studio"/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="offer__container container">
                        <div className="offer__wrapper">
                            {offer.isPremium ? (
                                <div className="offer__mark">
                                    <span>Premium</span>
                                </div>
                            ) : null}
                            <div className="offer__name-wrapper">
                                <h1 className="offer__name">
                                    {offer.title}
                                </h1>
                                <button className="offer__bookmark-button button" type="button">
                                    <svg className="offer__bookmark-icon" width="31" height="33">
                                        <use href="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">To bookmarks</span>
                                </button>
                            </div>
                            <div className="offer__rating rating">
                                <div className="offer__stars rating__stars">
                                    <span style={{width: `${offer.rating * 20}%`}}></span>
                                    <span className="visually-hidden">Rating</span>
                                </div>
                                <span className="offer__rating-value rating__value">{offer.rating}</span>
                            </div>
                            <ul className="offer__features">
                                <li className="offer__feature offer__feature--entire">
                                    {offer.type}
                                </li>
                                <li className="offer__feature offer__feature--bedrooms">
                                    {offer.bedrooms} Bedrooms
                                </li>
                                <li className="offer__feature offer__feature--adults">
                                    Max {offer.maxAdults} adults
                                </li>
                            </ul>
                            <div className="offer__price">
                                <b className="offer__price-value">&euro;{offer.price}</b>
                                <span className="offer__price-text">&nbsp;night</span>
                            </div>
                            <div className="offer__inside">
                                <h2 className="offer__inside-title">What&apos;s inside</h2>
                                <ul className="offer__inside-list">
                                    {offer.goods.map((good) => (
                                        <li key={good} className="offer__inside-item">
                                            {good}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="offer__host">
                                <h2 className="offer__host-title">Meet the host</h2>
                                <div className="offer__host-user user">
                                    <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                                        <img className="offer__avatar user__avatar" src={offer.host.avatarUrl}
                                             width="74" height="74" alt="Host avatar"/>
                                    </div>
                                    <span className="offer__user-name">
                                        {offer.host.name}
                                    </span>
                                    {offer.host.isPro ? (
                                        <span className="offer__user-status">
                                            Pro
                                        </span>
                                    ) : null}
                                </div>
                                <div className="offer__description">
                                    <p className="offer__text">
                                        {offer.description}
                                    </p>
                                </div>
                            </div>
                            {/* Временный заглушка для отзывов - удалить когда добавится тип Review */}
                            <section className="offer__reviews reviews">
                                <h2 className="reviews__title">Reviews &middot; <span
                                    className="reviews__amount">0</span></h2>
                                <ul className="reviews__list">
                                    {/* Отзывы временно удалены */}
                                </ul>
                                <ReviewForm/>
                            </section>
                        </div>
                    </div>
                    <section className="offer__map map"></section>
                </section>
                <div className="container">
                    <section className="near-places places">
                        <h2 className="near-places__title">Other places in the neighbourhood</h2>
                        <div className="near-places__list places__list">
                            {offers.slice(1, 4).map((nearbyOffer) => (
                                <article key={nearbyOffer.id} className="near-places__card place-card">
                                    {nearbyOffer.isPremium ? (
                                        <div className="place-card__mark">
                                            <span>Premium</span>
                                        </div>
                                    ) : null}
                                    <div className="near-places__image-wrapper place-card__image-wrapper">
                                        {/*<a href="#">*/}
                                        {/*    /!* Используем первое изображение из массива images вместо previewImage *!/*/}
                                        {/*    <img className="place-card__image" src={nearbyOffer.images[0]} width="260" height="200"*/}
                                        {/*         alt="Place image"/>*/}
                                        {/*</a>*/}
                                        <Link to={`${AppRoute.Offer}/${nearbyOffer.id}`}>
                                            <img className="place-card__image" src={nearbyOffer.images[0]} width="260" height="200" alt="Place image"/>
                                        </Link>
                                    </div>
                                    <div className="place-card__info">
                                        <div className="place-card__price-wrapper">
                                            <div className="place-card__price">
                                                <b className="place-card__price-value">&euro;{nearbyOffer.price}</b>
                                                <span className="place-card__price-text">&#47;&nbsp;night</span>
                                            </div>
                                            <button
                                                className="place-card__bookmark-button button"
                                                type="button">
                                                <svg className="place-card__bookmark-icon" width="18" height="19">
                                                    <use href="#icon-bookmark"></use>
                                                </svg>
                                                <span className="visually-hidden">In bookmarks</span>
                                            </button>
                                        </div>
                                        <div className="place-card__rating rating">
                                            <div className="place-card__stars rating__stars">
                                                <span style={{width: `${nearbyOffer.rating * 20}%`}}></span>
                                                <span className="visually-hidden">Rating</span>
                                            </div>
                                        </div>
                                        <h2 className="place-card__name">
                                            <a href="#">{nearbyOffer.title}</a>
                                        </h2>
                                        <p className="place-card__type">{nearbyOffer.type}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export {OfferPage};