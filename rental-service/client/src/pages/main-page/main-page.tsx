import {Logo} from "../../components/logo/logo.tsx";
import {CitiesCardList} from "../../components/cities-card-list/cities-card-list.tsx";
import type {OffersList} from "../../types/offer.ts";
import {cities} from "../../mocks/city.ts";
import {useEffect, useState} from "react";
import Map from "../../components/map/map.tsx"
import type {City, Point} from "../../types/city.ts";

type MainPageProps = {
    rentalOffersCount: number;
    offersList: OffersList[];
}

function MainPage({rentalOffersCount, offersList}: MainPageProps) {
    const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);
    const [city, setCity] = useState<City | null>(null);
    const [cityPoints, setCityPoints] = useState<Point[]>([]);

    useEffect(() => {
        const foundCity = cities.find((c: City) => c.title === "Amsterdam");
        if (foundCity) {
            setCity(foundCity);
        }

        // Создаем точки из offersList
        const points = offersList.map((offer) => ({
            id: offer.id,
            title: offer.title,
            lat: offer.location.latitude,
            lng: offer.location.longitude,
        }));
        setCityPoints(points);
    }, [offersList]);

    const handleOfferHover = (offerId: string) => {
        const offer = offersList.find((o) => o.id === offerId);
        if (offer) {
            const point = cityPoints.find((p) => p.title === offer.title);
            setSelectedPoint(point);
        }
    };

    const handleOfferLeave = () => {
        setSelectedPoint(undefined);
    };

    return (
        <div className="page page--gray page--main">
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

            <main className="page__main page__main--index">
                <h1 className="visually-hidden">Cities</h1>
                <div className="tabs">
                    <section className="locations container">
                        <ul className="locations__list tabs__list">
                            <li className="locations__item">
                                <a className="locations__item-link tabs__item" href="#">
                                    <span>Paris</span>
                                </a>
                            </li>
                            <li className="locations__item">
                                <a className="locations__item-link tabs__item" href="#">
                                    <span>Cologne</span>
                                </a>
                            </li>
                            <li className="locations__item">
                                <a className="locations__item-link tabs__item" href="#">
                                    <span>Brussels</span>
                                </a>
                            </li>
                            <li className="locations__item">
                                <a className="locations__item-link tabs__item tabs__item--active">
                                    <span>Amsterdam</span>
                                </a>
                            </li>
                            <li className="locations__item">
                                <a className="locations__item-link tabs__item" href="#">
                                    <span>Hamburg</span>
                                </a>
                            </li>
                            <li className="locations__item">
                                <a className="locations__item-link tabs__item" href="#">
                                    <span>Dusseldorf</span>
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
                <div className="cities">
                    <div className="cities__places-container container">
                        <section className="cities__places places">
                            <h2 className="visually-hidden">Places</h2>
                            <b className="places__found">{rentalOffersCount} places to stay in Amsterdam</b>
                            <form className="places__sorting" action="#" method="get">
                                <span className="places__sorting-caption">Sort by</span>
                                <span className="places__sorting-type" tabIndex={0}>
                                    Popular
                                    <svg className="places__sorting-arrow" width="7" height="4">
                                        <use href="#icon-arrow-select"></use>
                                    </svg>
                                </span>
                                <ul className="places__options places__options--custom places__options--opened">
                                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                                    <li className="places__option" tabIndex={0}>Top rated first</li>
                                </ul>
                            </form>

                            <CitiesCardList
                                offersList={offersList}
                                isNearby={false} // Это главная страница, не nearby
                                onOfferHover={handleOfferHover}
                                onOfferLeave={handleOfferLeave}
                            />
                        </section>
                        <div className="cities__right-section">
                            <section className="cities__map map">
                                {city && cityPoints.length > 0 && (
                                    <Map
                                        city={city}
                                        points={cityPoints}
                                        selectedPoint={selectedPoint}
                                    />
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export {MainPage};