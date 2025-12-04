// mocks/offers.ts
import type {FullOffer} from '../types/offer.ts';

const offers: FullOffer[] = [
    // Amsterdam offers (2 предложения)
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
                'latitude': 52.3676,
                'longitude': 4.9041,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 52.366400,
            'longitude': 4.903050,
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
    },
    {
        'id': 'fff86a0e-3f92-446d-9a6e-cbd4b5d38e2f',
        'title': 'Modern Loft in Amsterdam Center',
        'description': 'Bright and stylish loft with panoramic city views in the heart of Amsterdam',
        'type': 'apartment',
        'price': 420,
        'images': [
            '../../public/img/amsterdam/amsterdam-7.jpg',
            '../../public/img/amsterdam/amsterdam-8.jpg',
            '../../public/img/amsterdam/amsterdam-9.jpg',
        ],
        'city': {
            'name': 'Amsterdam',
            'location': {
                'latitude': 52.3676,
                'longitude': 4.9041,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 52.367563,
            'longitude': 4.900400,
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
    // Paris offers (2 предложения)
    {
        'id': 'bbb86a0e-3f92-446d-9a6e-cbd4b5d38e2b',
        'title': 'Wood and stone place near Eiffel Tower',
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
        'maxAdults': 3,
    },
    {
        'id': 'ggg86a0e-3f92-446d-9a6e-cbd4b5d38e2g',
        'title': 'Charming Parisian Studio',
        'description': 'Beautiful studio in Montmartre with view on Sacré-Cœur',
        'type': 'room',
        'price': 180,
        'images': [
            '../../public/img/paris/paris-7.jpg',
            '../../public/img/paris/paris-8.jpg',
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
            'latitude': 48.886700,
            'longitude': 2.343100,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchenette',
            'Coffee machine',
            'Hair dryer'
        ],
        'host': {
            'isPro': false,
            'name': 'Sophie',
            'avatarUrl': '../../public/img/avatar-sophie.jpg'
        },
        'isPremium': false,
        'isFavorite': false,
        'rating': 4.3,
        'bedrooms': 1,
        'maxAdults': 2
    },
    // Brussels offer (1 предложение)
    {
        'id': 'hhh86a0e-3f92-446d-9a6e-cbd4b5d38e2h',
        'title': 'Cozy Studio near Grand Place',
        'description': 'Charming studio apartment in the heart of Brussels, just steps away from main attractions',
        'type': 'room',
        'price': 290,
        'images': [
            '../../public/img/brussels/brussels-1.jpg',
            '../../public/img/brussels/brussels-2.jpg',
            '../../public/img/brussels/brussels-3.jpg',
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
            'latitude': 50.846700,
            'longitude': 4.352500,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchenette',
            'Coffee machine',
            'Hair dryer',
            'Towels'
        ],
        'host': {
            'isPro': false,
            'name': 'Jean',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': false,
        'isFavorite': true,
        'rating': 4.5,
        'bedrooms': 1,
        'maxAdults': 2
    },
    // Hamburg offer (1 предложение)
    {
        'id': 'iii86a0e-3f92-446d-9a6e-cbd4b5d38e2i',
        'title': 'Modern Loft in Hamburg Harbor',
        'description': 'Stylish loft with harbor view in the trendy HafenCity district',
        'type': 'apartment',
        'price': 380,
        'images': [
            '../../public/img/hamburg/hamburg-1.jpg',
            '../../public/img/hamburg/hamburg-2.jpg',
            '../../public/img/hamburg/hamburg-3.jpg',
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
            'latitude': 53.543800,
            'longitude': 9.991500,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'TV',
            'Washing machine',
            'Coffee machine'
        ],
        'host': {
            'isPro': true,
            'name': 'Klaus',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.6,
        'bedrooms': 2,
        'maxAdults': 3
    },
    // Cologne offer (1 предложение)
    {
        'id': 'jjj86a0e-3f92-446d-9a6e-cbd4b5d38e2j',
        'title': 'Apartment near Cologne Cathedral',
        'description': 'Modern apartment with view on the famous Cologne Cathedral',
        'type': 'apartment',
        'price': 320,
        'images': [
            '../../public/img/cologne/cologne-1.jpg',
            '../../public/img/cologne/cologne-2.jpg',
        ],
        'city': {
            'name': 'Cologne',
            'location': {
                'latitude': 50.937531,
                'longitude': 6.960278,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 50.941200,
            'longitude': 6.958300,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Heating',
            'Kitchen',
            'TV',
            'Washing machine'
        ],
        'host': {
            'isPro': true,
            'name': 'Thomas',
            'avatarUrl': '../../public/img/avatar-max.jpg'
        },
        'isPremium': false,
        'isFavorite': true,
        'rating': 4.4,
        'bedrooms': 2,
        'maxAdults': 4
    },
    // Dusseldorf offer (1 предложение)
    {
        'id': 'kkk86a0e-3f92-446d-9a6e-cbd4b5d38e2k',
        'title': 'Luxury Apartment in Dusseldorf',
        'description': 'Spacious luxury apartment in the media harbor of Dusseldorf',
        'type': 'apartment',
        'price': 450,
        'images': [
            '../../public/img/dusseldorf/dusseldorf-1.jpg',
            '../../public/img/dusseldorf/dusseldorf-2.jpg',
        ],
        'city': {
            'name': 'Dusseldorf',
            'location': {
                'latitude': 51.227741,
                'longitude': 6.773456,
                'zoom': 13
            }
        },
        'location': {
            'latitude': 51.220200,
            'longitude': 6.771800,
            'zoom': 16
        },
        'goods': [
            'Wi-Fi',
            'Air conditioning',
            'Kitchen',
            'TV',
            'Washing machine',
            'Dishwasher',
            'Parking'
        ],
        'host': {
            'isPro': true,
            'name': 'Anna',
            'avatarUrl': '../../public/img/avatar-angelina.jpg'
        },
        'isPremium': true,
        'isFavorite': false,
        'rating': 4.9,
        'bedrooms': 3,
        'maxAdults': 5
    }
];

export {offers}