// components/review-list/review-list.tsx
import { Review } from "../review/review";
import type { ReviewType } from "../../types/reviews";

type ReviewsListProps = {
    reviews: ReviewType[];
}

function ReviewsList({ reviews }: ReviewsListProps) {
    // Сортируем от новых к старым и берем последние 10
    const sortedReviews = [...reviews]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

    if (reviews.length === 0) {
        return (
            <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                    Reviews · <span className="reviews__amount">0</span>
                </h2>
                <p>No reviews yet. Be the first to leave a review!</p>
            </section>
        );
    }

    return (
        <section className="offer__reviews reviews">
            <h2 className="reviews__title">
                Reviews · <span className="reviews__amount">{reviews.length}</span>
            </h2>
            <ul className="reviews__list">
                {sortedReviews.map((review) => (
                    <Review key={review.id} review={review} />
                ))}
            </ul>
        </section>
    );
}

export { ReviewsList };