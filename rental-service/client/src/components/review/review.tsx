import type { ReviewType } from "../../types/reviews";
import {getAvatarUrl} from "../../util.ts";


type ReviewProps = {
    review: ReviewType;
}

function Review({ review }: ReviewProps) {
    // Логируем для отладки
    console.log('📸 Review avatar debug:', {
        rawAvatarUrl: review.user?.avatarUrl,
        fullUrl: getAvatarUrl(review.user?.avatarUrl)
    });

    return (
        <li className="reviews__item">
            <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                    <img
                        className="reviews__avatar user__avatar"
                        src={getAvatarUrl(review.user?.avatarUrl)}
                        width="54"
                        height="54"
                        alt={`${review.user?.name || 'User'} avatar`}
                        style={{
                            objectFit: 'cover',
                            borderRadius: '50%',
                            width: '54px',
                            height: '54px'
                        }}
                        onError={(e) => {
                            console.error('❌ Failed to load avatar:', e.currentTarget.src);
                            e.currentTarget.src = '/img/default-avatar.jpg';
                        }}
                    />
                </div>
                <span className="reviews__user-name">
                    {review.user?.name || 'Anonymous'}
                </span>
                {review.user?.isPro && (
                    <span className="reviews__user-status">Pro</span>
                )}
            </div>
            <div className="reviews__info">
                <div className="reviews__rating rating">
                    <div className="reviews__stars rating__stars">
                        <span style={{ width: `${Math.round(review.rating) * 20}%` }} />
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <p className="reviews__text">
                    {review.comment}
                </p>
                <time className="reviews__time" dateTime={review.date}>
                    {new Date(review.date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                    })}
                </time>
            </div>
        </li>
    );
}

export { Review };