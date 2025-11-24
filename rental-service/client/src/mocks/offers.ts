import type {FullOffer} from '../types/offer.ts';

const offers: FullOffer[] = [
    {
        'id': 'bbb86a0e-3f92-446d-9a6e-cbd4b5d38e2b',
        'title': 'Wood and stone place',
        'description': 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families',
        'type': 'apartment',
        'price': 370,
        'images': [
            '../../public/img/paris/paris-1.jpg',
            '../../public/img/paris/paris-2.jpg',
            '../../public/img/paris/paris-3.jpg',
            '../../public/img/paris/paris-4.jpg',
            '../../public/img/paris/paris-5.jpg',
            '../../public/img/paris/paris-6.jpg',
        ],
        'city': {
            'name': 'Paris',
            'location': {
                'latitude': 48.85661,
                'longitude': 2.351499,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 48.858610800000004,
            'longitude': 2.342499,
            'zoom': 16
        },
        'goods': [
            'Heating',
            'Wi-Fi',
            'Fridge',
            'Laptop friendly workspace',
            'Baby seat',
            'Air conditioning',
            'Washer',
            'Towels',
            'Dishwasher',
            'Kitchen',
            'Washing machine',
            'Breakfast',
            'Coffee machine'
        ],
        'host': {
            'isPro': true,
            'name': 'Angelina',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': false,
        'isFavorite': true,
        'rating': 4.9,
        'bedrooms': 2,
        'maxAdults': 3
    },
    {
        'id': 'ccc86a0e-3f92-446d-9a6e-cbd4b5d38e2c',
        'title': 'Modern Loft in City Center',
        'description': 'Bright and stylish loft with panoramic city views. Perfect for couples and business travelers',
        'type': 'apartment',
        'price': 420,
        'images': [
            '../../public/img/hamburg/hamburg-1.jpg',
            '../../public/img/hamburg/hamburg-2.jpg',
            '../../public/img/hamburg/hamburg-3.jpg',
            '../../public/img/hamburg/hamburg-4.jpg',
            '../../public/img/hamburg/hamburg-5.jpg',
            '../../public/img/hamburg/hamburg-6.jpg',
        ],
        'city': {
            'name': 'Hamburg',
            'location': {
                'latitude': 53.551086,
                'longitude': 9.993682,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 53.550086,
            'longitude': 9.992682,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'Washing machine',
            'TV',
            'Elevator',
            'Coffee machine',
            'Iron'
        ],
        'host': {
            'isPro': true,
            'name': 'Maximilian',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.7,
        'bedrooms': 1,
        'maxAdults': 2
    },
    {
        'id': 'ddd86a0e-3f92-446d-9a6e-cbd4b5d38e2d',
        'title': 'Cozy Studio near Grand Place',
        'description': 'Charming studio apartment in the heart of Brussels, just steps away from main attractions',
        'type': 'room',
        'price': 290,
        'images': [
            '../../public/img/brussels/brussels-1.jpg',
            '../../public/img/brussels/brussels-2.jpg',
            '../../public/img/brussels/brussels-3.jpg',
            '../../public/img/brussels/brussels-4.jpg',
            '../../public/img/brussels/brussels-5.jpg',
            '../../public/img/brussels/brussels-6.jpg',
        ],
        'city': {
            'name': 'Brussels',
            'location': {
                'latitude': 50.850346,
                'longitude': 4.351721,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 50.849346,
            'longitude': 4.350721,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchenette',
            'Coffee machine',
            'Hair dryer',
            'Towels',
            'Baby seat'
        ],
        'host': {
            'isPro': false,
            'name': 'Sophie',
            'avatarUrl': '../../public/img/avatar-sophie.jpg'
        },
        'isPremium': false,
        'isFavorite': true,
        'rating': 4.5,
        'bedrooms': 1,
        'maxAdults': 2
    },
    {
        'id': 'eee86a0e-3f92-446d-9a6e-cbd4b5d38e2e',
        'title': 'Canal View Houseboat',
        'description': 'Unique houseboat experience with stunning canal views. Authentic Amsterdam living',
        'type': 'house',
        'price': 510,
        'images': [
            '../../public/img/amsterdam/amsterdam-1.jpg',
            '../../public/img/amsterdam/amsterdam-2.jpg',
            '../../public/img/amsterdam/amsterdam-3.jpg',
            '../../public/img/amsterdam/amsterdam-4.jpg',
            '../../public/img/amsterdam/amsterdam-5.jpg',
            '../../public/img/amsterdam/amsterdam-6.jpg',
        ],
        'city': {
            'name': 'Amsterdam',
            'location': {
                'latitude': 52.367573,
                'longitude': 4.904139,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 52.366573,
            'longitude': 4.903139,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Kitchen',
            'Heating',
            'TV',
            'Terrace',
            'Coffee machine',
            'Barbecue',
            'Parking'
        ],
        'host': {
            'isPro': true,
            'name': 'Lucas',
            'avatarUrl': '../../public/img/avatar-lucas.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.8,
        'bedrooms': 2,
        'maxAdults': 4
    }
];

export {offers}