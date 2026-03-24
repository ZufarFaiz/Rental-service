import type {City} from "./types/city.ts";
import type {OffersList} from "./types/offer.ts";
import {SortOffersType} from "./conts.ts";
import type {SortOffer} from "./types/sort.ts";

export function getCity(cityName:string,cities:City[]):City{
    return cities.find(city=>city.title===cityName)!;
}

export function getOffersByCity(city:string,offers:OffersList[]){
    return offers.filter(offer=>offer.city.name === city);
}

export function sortOffersByType (offers: OffersList[], type: SortOffer): OffersList[] {
    // Создаём копию массива, чтобы не мутировать оригинал
    const sortedOffers = [...offers];

    switch (type) {
        case SortOffersType.PriceToHigh:  // ← исправлено
            return sortedOffers.sort((a, b) => a.price - b.price);
        case SortOffersType.PriceToLow:
            return sortedOffers.sort((a, b) => b.price - a.price);
        case SortOffersType.TopRated:
            return sortedOffers.sort((a, b) => b.rating - a.rating);
        default:
            return sortedOffers;
    }
}

const BACKEND_URL = 'http://localhost:8080';

export const getStaticUrl = (path: string | undefined | null): string => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/static/')) return `${BACKEND_URL}${path}`;
    return `${BACKEND_URL}/static/${path}`;
};

export const getAvatarUrl = (path: string | undefined | null): string => {
    if (!path) return '/img/default-avatar.jpg';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/static/')) return `${BACKEND_URL}${path}`;
    return `${BACKEND_URL}/static/${path}`;
};

export const getImageUrl = (path: string | undefined | null): string => {
    if (!path) return '/img/default-placeholder.jpg';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/static/')) return `${BACKEND_URL}${path}`;
    return `${BACKEND_URL}/static/${path}`;
};