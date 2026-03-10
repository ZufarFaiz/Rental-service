// components/review-form/review-form.tsx
import React, { type ChangeEvent, type FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { postReviewAction } from "../../store/api-action";

type ReviewFormProps = {
    offerId: string;
};

const MIN_COMMENT_LENGTH = 10;
const MAX_COMMENT_LENGTH = 300;

function ReviewForm({ offerId }: ReviewFormProps) {
    const dispatch = useAppDispatch();
    const isSubmitting = useAppSelector((state) => state.isReviewSubmitting);

    const [rating, setRating] = useState<number | null>(null);
    const [review, setReview] = useState('');

    const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRating(Number(event.target.value));
    };

    const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setReview(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!rating || review.length < MIN_COMMENT_LENGTH) return;

        try {
            await dispatch(postReviewAction({
                offerId,
                rating,
                comment: review
            })).unwrap();

            // ✅ Очищаем форму только после успеха
            setRating(null);
            setReview('');

        } catch (error) {
            console.error('Failed to post review:', error);
        }
    };

    const isValid = rating !== null && review.length >= MIN_COMMENT_LENGTH && review.length <= MAX_COMMENT_LENGTH;

    return (
        <form className="reviews__form form" onSubmit={handleSubmit}>
            <label className="reviews__label form__label" htmlFor="review">Your review</label>
            <div className="reviews__rating-form form__rating">
                {[5,4,3,2,1].map((value) => (
                    <React.Fragment key={value}>
                        <input
                            className="form__rating-input visually-hidden"
                            name="rating"
                            value={value}
                            id={`${value}-stars`}
                            type="radio"
                            checked={rating === value}
                            onChange={handleRatingChange}
                            disabled={isSubmitting}
                        />
                        <label
                            htmlFor={`${value}-stars`}
                            className="reviews__rating-label form__rating-label"
                            title={
                                value === 5 ? 'perfect' :
                                    value === 4 ? 'good' :
                                        value === 3 ? 'not bad' :
                                            value === 2 ? 'badly' : 'terribly'
                            }
                        >
                            <svg className="form__star-image" width="37" height="33">
                                <use href="/img/sprite.svg#icon-star"></use>
                            </svg>
                        </label>
                    </React.Fragment>
                ))}
            </div>

            <textarea
                className="reviews__textarea form__textarea"
                id="review"
                name="review"
                placeholder="Tell how was your stay, what you like and what can be improved"
                value={review}
                onChange={handleReviewChange}
                disabled={isSubmitting}
            />

            <div className="reviews__button-wrapper">
                <p className="reviews__help">
                    To submit review please make sure to set{' '}
                    <span className="reviews__star">rating</span> and describe your stay with at
                    least <b className="reviews__text-amount">50 characters</b>.
                </p>
                <button
                    className="reviews__submit form__submit button"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </form>
    );
}

export { ReviewForm };