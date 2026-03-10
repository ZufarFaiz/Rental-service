import type {City} from "./types/city.ts";

export const Setting = {
    rentalOffersCount: 312,
} as const;

export const AppRoute = {
    Main: '/',
    Login: '/login',
    Favorites: '/favorites',
    Offer: '/offer/:id',
} as const;

export const AuthorizationStatus = {
    Auth: 'AUTH',
    NoAuth: 'NO_AUTH',
    Unknown: 'UNKNOWN',
} as const;

export const CITIES_LOCATION: City[] = [
    {
        title: 'Paris',
        lat: 48.5112,
        lng: 2.2055,
        zoom: 8
    },
    {
        title: 'Cologne',
        lat: 50.9375,
        lng: 6.9603,
        zoom: 8
    },
    {
        title: 'Brussels',
        lat: 50.8503,
        lng: 4.3517,
        zoom: 8
    },
    {
        title: 'Amsterdam',
        lat: 52.2226,
        lng: 4.5322,
        zoom: 8
    },
    {
        title: 'Hamburg',
        lat: 53.5511,
        lng: 9.9937,
        zoom: 8
    },
    {
        title: 'Dusseldorf',
        lat: 51.2277,
        lng: 6.7735,
        zoom: 8
    },
];

export const SortOffersType = {
    Popular: 'Popular',
    PriceToLow: 'Price: low to high',
    PriceToHigh: 'Price: high to low',
    TopRated: 'Top rated first',
} as const;

export const APIRoute = {
    Offers: '/api/offers',
    Login: '/api/users/login',
    Logout: '/api/users/logout',
    Check: '/api/users/check',
    Register: '/api/users/register',
    Favorite: '/api/offers/favorite',
    Reviews: '/api/reviews',
} as const;

export const TIMEOUT_SHOW_ERROR = 2000;