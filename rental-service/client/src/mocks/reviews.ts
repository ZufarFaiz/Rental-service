import type {ReviewType} from "../types/reviews.ts";

const reviews: ReviewType[] = [
    {
        id: 1,
        offerId: 'bbb86a0e-3f92-446d-9a6e-cbd4b5d38e2b', // Paris apartment
        comment: "Отличное расположение отеля! В нескольких минутах ходьбы от Эйфелевой башни и Лувра. Персонал очень дружелюбный и помог с бронированием экскурсий.",
        date: "2024-03-15T10:30:00.000Z",
        rating: 5,
        user: {
            name: "Мария Иванова",
            avatarUrl: "https://i.pravatar.cc/150?img=1",
            isPro: true
        }
    },
    {
        id: 2,
        offerId: 'bbb86a0e-3f92-446d-9a6e-cbd4b5d38e2b', // Paris apartment
        comment: "Чистые номера, хороший завтрак с круассанами. Вид из окна на Париж потрясающий. Рекомендую для романтического отдыха.",
        date: "2024-03-10T14:45:00.000Z",
        rating: 4,
        user: {
            name: "Алексей Петров",
            avatarUrl: "https://i.pravatar.cc/150?img=2",
            isPro: false
        }
    },
    {
        id: 3,
        offerId: 'ccc86a0e-3f92-446d-9a6e-cbd4b5d38e2c', // Hamburg loft
        comment: "Современный лофт в центре Гамбурга. Все новое и качественное. Отличное соотношение цены и качества.",
        date: "2024-03-05T09:15:00.000Z",
        rating: 5,
        user: {
            name: "Анна Смирнова",
            avatarUrl: "https://i.pravatar.cc/150?img=3",
            isPro: true
        }
    },
    {
        id: 4,
        offerId: 'ddd86a0e-3f92-446d-9a6e-cbd4b5d38e2d', // Brussels studio
        comment: "Уютная студия прямо рядом с Гран-Плас. Идеально для короткой поездки в Брюссель. Хозяева очень гостеприимные.",
        date: "2024-02-28T16:20:00.000Z",
        rating: 4,
        user: {
            name: "Дмитрий Козлов",
            avatarUrl: "https://i.pravatar.cc/150?img=4",
            isPro: false
        }
    },
    {
        id: 5,
        offerId: 'eee86a0e-3f92-446d-9a6e-cbd4b5d38e2e', // Amsterdam houseboat
        comment: "Незабываемый опыт жизни на хаусботе! Вид на канал каждое утро - это нечто. Обязательно вернусь снова!",
        date: "2024-02-20T11:10:00.000Z",
        rating: 5,
        user: {
            name: "Екатерина Волкова",
            avatarUrl: "https://i.pravatar.cc/150?img=5",
            isPro: true
        }
    },
    {
        id: 6,
        offerId: 'eee86a0e-3f92-446d-9a6e-cbd4b5d38e2e', // Amsterdam houseboat
        comment: "Оригинальное жилье с характером. Немного качает по ночам, но к этому быстро привыкаешь. Отличное расположение.",
        date: "2024-02-15T13:55:00.000Z",
        rating: 4,
        user: {
            name: "Сергей Николаев",
            avatarUrl: "https://i.pravatar.cc/150?img=6",
            isPro: false
        }
    }
];

export {reviews};