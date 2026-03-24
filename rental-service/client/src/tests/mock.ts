import { faker } from '@faker-js/faker';
import type { FullOffer, OffersList, CityOffer, OfferLocation, HostOffer } from '../types/offer';
import type { UserData } from '../types/user-data';
import { AuthorizationStatus } from "../conts.ts";
import type { ReviewType } from "../types/reviews.ts";
import type { InitialState } from "../store/reducet";
import type {City} from "../types/city.ts";

// Функция для создания City (для store)
function makeFakeCity(): City {
    return {
        title: faker.location.city(),
        lat: faker.number.float({ min: 48, max: 49 }),
        lng: faker.number.float({ min: 2, max: 3 }),
        zoom: 13,
    };
}

// Функция для создания CityOffer
function makeFakeCityOffer(): CityOffer {
    return {
        name: faker.location.city(),
        location: {
            latitude: faker.number.float({ min: 48, max: 49 }),
            longitude: faker.number.float({ min: 2, max: 3 }),
            zoom: 13,
        },
    };
}

// Функция для создания OfferLocation
function makeFakeOfferLocation(): OfferLocation {
    return {
        latitude: faker.number.float({ min: 48, max: 49 }),
        longitude: faker.number.float({ min: 2, max: 3 }),
        zoom: 13,
    };
}

export function makeFakeOffer(): OffersList {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.words(3),
        type: 'apartment',
        price: faker.number.int({ min: 50, max: 500 }),
        city: makeFakeCityOffer(),
        location: makeFakeOfferLocation(),
        isFavorite: faker.datatype.boolean(),
        isPremium: faker.datatype.boolean(),
        rating: faker.number.float({ min: 1, max: 5 }),
        previewImage: faker.image.url(),
    };
}

export function makeFakeFullOffer(): FullOffer {
    const baseOffer = makeFakeOffer();
    return {
        ...baseOffer,
        description: faker.lorem.paragraph(),
        bedrooms: faker.number.int({ min: 1, max: 5 }),
        goods: [faker.commerce.productName(), faker.commerce.productName()],
        host: {
            name: faker.person.fullName(),
            avatarUrl: faker.image.avatar(),
            isPro: faker.datatype.boolean(),
        },
        images: [faker.image.url(), faker.image.url()],
        maxAdults: faker.number.int({ min: 1, max: 10 }),
    };
}

export function makeFakeReview(): ReviewType {
    return {
        id: 1,
        comment: faker.lorem.sentence(),
        rating: faker.number.int({ min: 1, max: 5 }),
        date: new Date().toISOString(),
        user: {
            name: faker.person.fullName(),
            avatarUrl: faker.image.avatar(),
            isPro: faker.datatype.boolean(),
        },
        offerId: faker.string.uuid(),
    };
}

export const fakeUserInfo: UserData = {
    name: 'Test User',
    email: 'test@example.com',
    avatarUrl: 'https://example.com/avatar.jpg',
    isPro: false,
    token: 'fake-token',
};

export function makeFakeStore(
    overrides: Partial<InitialState> = {}
): InitialState {
    return {
        city: makeFakeCity(),  // ← используем makeFakeCityOffer
        offers: [],
        authorizationStatus: AuthorizationStatus.NoAuth,
        error: null,
        isOffersDataLoading: false,
        user: null,
        currentOffer: null,
        reviews: [],
        isReviewSubmitting: false,
        favorites: [],
        ...overrides,
    };
}