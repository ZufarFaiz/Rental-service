package server.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import server.exception.NotFoundException;
import server.model.dto.request.ReviewRequest;
import server.model.dto.response.Host;
import server.model.dto.response.ReviewResponse;
import server.model.entity.Offer;
import server.model.entity.Review;
import server.model.entity.User;
import server.model.enums.UserType;
import server.repository.OfferRepository;
import server.repository.ReviewRepository;
import server.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class ReviewServiceImpl {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final OfferRepository offerRepository;

    public String addReview(ReviewRequest request){

        User author = userRepository.findById(request.getUserId()).orElseThrow(()-> new NotFoundException("User not found"));

        Offer offer = offerRepository.findById(request.getOfferId()).orElseThrow(()->new NotFoundException("Offer not found"));

        Review review = new Review();
        review.setAuthor(author);
        review.setOffer(offer);
        review.setText(request.getText());
        review.setRating(request.getRating());

        reviewRepository.save(review);

        return "Create review with id " + review.getId();
    }

    public List<ReviewResponse> getAllReviews(Long offerId){
        Offer offer = offerRepository.findById(offerId).orElseThrow(()->new NotFoundException("Offer not found"));
        List<Review> allReviews = reviewRepository.findAllByOffer(offer);
        return allReviews.stream()
                .map(this::convertToReviewResponse)
                .toList();

    }
    private ReviewResponse convertToReviewResponse(Review review){
        Host host = new Host();
        host.setName(review.getAuthor().getUsername());
        host.setAvatarUrl(review.getAuthor().getAvatar() !=null?
                "/static/" + review.getAuthor().getAvatar() : null);
        host.setPro(review.getAuthor().getUserType().equals(UserType.PRO));

        return ReviewResponse.builder()
                .host(host)
                .rating(review.getRating())
                .publishDate(review.getPublishDate())
                .text(review.getText())
                .build();
    }
}
