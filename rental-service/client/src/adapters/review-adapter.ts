// adapters/review-adapter.ts
import type { ReviewType, CommentData } from '../types/reviews';

// Интерфейс ответа от сервера
interface ServerReview {
    id?: number;
    host: {
        id: number;
        name: string;
        avatarUrl: string;
        isPro: boolean;
    };
    rating: number;
    publishDate: string;
    text: string;
}

// Генератор ID для отзывов (пока сервер не присылает id)
let reviewIdCounter = 1000;

export const adaptReviewToClient = (serverReview: ServerReview, offerId: string): ReviewType => {
    return {
        id: serverReview.id || reviewIdCounter++,
        offerId: offerId,
        comment: serverReview.text,
        date: serverReview.publishDate,
        rating: serverReview.rating,
        user: {
            name: serverReview.host.name,
            avatarUrl: serverReview.host.avatarUrl,
            isPro: serverReview.host.isPro
        }
    };
};

export const adaptReviewsToClient = (serverReviews: ServerReview[], offerId: string): ReviewType[] => {
    return serverReviews.map((review) => adaptReviewToClient(review, offerId));
};

export const adaptCommentToServer = (rating: number, comment: string): CommentData => {
    return {
        rating: rating,
        text: comment
    };
};