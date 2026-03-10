// adapters/offer-adapters.ts
import type { FullOffer, OffersList } from '../types/offer';

// Интерфейс ответа от сервера
interface ServerOffer {
    id: number;
    title: string;
    description?: string;
    city: {
        name: string;
        location: {
            latitude: number;
            longitude: number;
            zoom: number;
        };
    };
    isPremium?: boolean;
    isFavorite?: boolean;
    rating: number;
    type: string;
    price: number;
    location: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
    photos?: string[];
    previewImage?: string;
    featureList?: Array<{ name: string } | string>;
    host?: {
        name: string;
        avatarUrl: string;
        isPro: boolean;
    };
    rooms?: number;
    guests?: number;
    favorite?: boolean;
    premium?: boolean;
}

// Адаптер для полного предложения
export const adaptFullOfferToClient = (serverOffer: ServerOffer): FullOffer => {
    return {
        id: serverOffer.id.toString(),
        title: serverOffer.title,
        description: serverOffer.description || '',
        city: {
            name: serverOffer.city.name,
            location: {
                latitude: serverOffer.city.location.latitude,
                longitude: serverOffer.city.location.longitude,
                zoom: serverOffer.city.location.zoom || 13
            }
        },
        location: {
            latitude: serverOffer.location.latitude,
            longitude: serverOffer.location.longitude,
            zoom: serverOffer.location.zoom || 13
        },
        isFavorite: serverOffer.favorite || serverOffer.isFavorite || false,
        isPremium: serverOffer.premium || serverOffer.isPremium || false,
        rating: serverOffer.rating,
        type: serverOffer.type?.toLowerCase() || 'apartment',
        price: serverOffer.price || 0,
        images: serverOffer.photos || [],
        goods: serverOffer.featureList?.map(f =>
            typeof f === 'string' ? f : f.name || String(f)
        ) || [],
        host: {
            name: serverOffer.host?.name || '',
            avatarUrl: serverOffer.host?.avatarUrl || '',
            isPro: serverOffer.host?.isPro || false
        },
        bedrooms: serverOffer.rooms || 0,
        maxAdults: serverOffer.guests || 0
    };
};

// Адаптер для списка предложений
export const adaptOffersListToClient = (serverOffer: any): OffersList => {
    return {
        id: serverOffer.id.toString(),
        title: serverOffer.title,
        type: serverOffer.type?.toLowerCase() || 'apartment',
        price: serverOffer.price || 0,
        city: {
            name: serverOffer.city?.name || '',
            location: {
                latitude: serverOffer.city?.location?.latitude || 0,
                longitude: serverOffer.city?.location?.longitude || 0,
                zoom: serverOffer.city?.location?.zoom || 13
            }
        },
        location: {
            latitude: serverOffer.location?.latitude || 0,
            longitude: serverOffer.location?.longitude || 0,
            zoom: serverOffer.location?.zoom || 13
        },
        // 👇 Преобразуем favorite → isFavorite
        isFavorite: serverOffer.favorite || false,
        // 👇 Преобразуем premium → isPremium
        isPremium: serverOffer.premium || false,
        rating: serverOffer.rating || 0,
        previewImage: serverOffer.previewImage || '/img/default-placeholder.jpg'
    };
};