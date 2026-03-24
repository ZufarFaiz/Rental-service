import {CitiesCardList} from "../../components/cities-card-list/cities-card-list.tsx";
import {useEffect, useState, useCallback} from "react";
import Map from "../../components/map/map.tsx"
import type {City, Point} from "../../types/city.ts";
import {CitiesList} from "../../components/cities-list/cities-list.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getOffersByCity, sortOffersByType} from "../../util.ts";
import type {SortOffer} from "../../types/sort.ts";
import {SortOptions} from "../../components/sort-options/sort-options.tsx";
import {Link, useNavigate} from "react-router-dom";
import {logoutAction} from "../../store/api-action";
import {CITIES_LOCATION,AppRoute,AuthorizationStatus} from "../../conts.ts";
import {Header} from "../../components/header/header.tsx";

function MainPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Селекторы из Redux store
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const user = useAppSelector((state) => state.user);
    const selectedCity = useAppSelector((state) => state.city);
    const offersListSelector = useAppSelector((state) => state.offers);

    // Вычисляем отфильтрованные предложения
    const selectedCityOffers = getOffersByCity(selectedCity?.title || '', offersListSelector);
    const rentalOffersCount = selectedCityOffers.length;

    // Состояния
    const [activeSort, setActiveSort] = useState<SortOffer>('Popular');
    const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);
    const [city, setCity] = useState<City | null>(null);
    const [cityPoints, setCityPoints] = useState<Point[]>([]);

    // Функция обновления данных карты
    const updateCityData = useCallback(() => {
        if (selectedCity?.title) {
            const foundCity = CITIES_LOCATION.find((c: City) => c.title === selectedCity.title);
            if (foundCity) {
                setCity(foundCity);
            }

            const cityOffers = getOffersByCity(selectedCity.title, offersListSelector);
            const points = cityOffers.map((offer) => ({
                id: offer.id,
                title: offer.title,
                lat: offer.location.latitude,
                lng: offer.location.longitude,
            }));
            setCityPoints(points);
            setSelectedPoint(undefined);
        }
    }, [selectedCity, offersListSelector]);

    // Эффект для обновления карты при смене города
    useEffect(() => {
        updateCityData();
    }, [updateCityData]);

    // Обработчики наведения на карточку
    const handleOfferHover = useCallback((offerId: string) => {
        const offer = selectedCityOffers.find((o) => o.id === offerId);
        if (offer) {
            const point = cityPoints.find((p) => p.title === offer.title);
            setSelectedPoint(point);
        }
    }, [selectedCityOffers, cityPoints]);

    const handleOfferLeave = useCallback(() => {
        setSelectedPoint(undefined);
    }, []);

    // Обработчик выхода
    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logoutAction()).unwrap();
            navigate(AppRoute.Main);
        } catch (error) {
            console.error('Logout failed:', error);
            navigate(AppRoute.Main);
        }
    }, [dispatch, navigate]);

    // Проверка авторизации
    const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

    return (
        <div className="page page--gray page--main">
            <Header/>

            <main className="page__main page__main--index">
                <h1 className="visually-hidden">Cities</h1>
                <div className="tabs">
                    <section className="locations container">
                        <CitiesList selectedCity={selectedCity}/>
                    </section>
                </div>
                <div className="cities">
                    <div className="cities__places-container container">
                        <section className="cities__places places">
                            <h2 className="visually-hidden">Places</h2>
                            <b className="places__found">
                                {rentalOffersCount} place{rentalOffersCount !== 1 ? 's' : ''} to stay in {selectedCity?.title}
                            </b>
                            <SortOptions
                                activeSorting={activeSort}
                                onChange={(newSorting) => setActiveSort(newSorting)}
                            />
                            <CitiesCardList
                                offersList={sortOffersByType(selectedCityOffers, activeSort)}
                                isNearby={false}
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