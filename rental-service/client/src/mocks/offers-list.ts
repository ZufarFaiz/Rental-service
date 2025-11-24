import type {OffersList} from '../types/offer';

export const offersList: OffersList[] = [
    {
        id: 'bbb86a0e-3f92-446d-9a6e-cbd4b5d38e2b',
        title: 'Wood and stone place',
        type: 'apartment',
        price: 370,
        previewImage: '../../public/img/paris/paris-preview.jpg',
        city: {
            name: 'Paris',
            location: {
                latitude: 48.85661,
                longitude: 2.351499,
                zoom: 13
            }
        },
        location: {
            latitude: 48.858610800000004,
            longitude: 2.342499,
            zoom: 16
        },
        isFavorite: true,
        isPremium: false,
        rating: 4.9
    },
    {
        id: 'ccc86a0e-3f92-446d-9a6e-cbd4b5d38e2c',
        title: 'Modern Loft in City Center',
        type: 'apartment',
        price: 420,
        previewImage: '../../public/img/hamburg/hamburg-preview.jpg',
        city: {
            name: 'Hamburg',
            location: {
                latitude: 53.551086,
                longitude: 9.993682,
                zoom: 13
            }
        },
        location: {
            latitude: 53.550086,
            longitude: 9.992682,
            zoom: 16
        },
        isFavorite: false,
        isPremium: true,
        rating: 4.7
    },
    {
        id: 'ddd86a0e-3f92-446d-9a6e-cbd4b5d38e2d',
        title: 'Cozy Studio near Grand Place',
        type: 'room',
        price: 290,
        previewImage: '../../public/img/brussels/brussels-preview.jpg',
        city: {
            name: 'Brussels',
            location: {
                latitude: 50.850346,
                longitude: 4.351721,
                zoom: 13
            }
        },
        location: {
            latitude: 50.849346,
            longitude: 4.350721,
            zoom: 16
        },
        isFavorite: true,
        isPremium: false,
        rating: 4.5
    },
    {
        id: 'eee86a0e-3f92-446d-9a6e-cbd4b5d38e2e',
        title: 'Canal View Houseboat',
        type: 'house',
        price: 510,
        previewImage: '../../public/img/amsterdam/amsterdam-preview.jpg',
        city: {
            name: 'Amsterdam',
            location: {
                latitude: 52.367573,
                longitude: 4.904139,
                zoom: 13
            }
        },
        location: {
            latitude: 52.366573,
            longitude: 4.903139,
            zoom: 16
        },
        isFavorite: false,
        isPremium: true,
        rating: 4.8
    }
];