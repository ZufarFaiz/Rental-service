package server.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import server.model.dto.request.ReviewRequest;
import server.model.entity.Offer;
import server.model.entity.Review;
import server.model.entity.User;
import server.repository.OfferRepository;
import server.repository.ReviewRepository;
import server.repository.UserRepository;

@Service
@AllArgsConstructor
public class ReviewServiceImpl {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final OfferRepository offerRepository;

    public String addReview(ReviewRequest request){

        User author = userRepository.findById(request.getUserId()).orElseThrow(()-> new RuntimeException("User not found"));

        Offer offer = offerRepository.findById(request.getOfferId()).orElseThrow(()->new RuntimeException("Offer not found"));

        Review review = new Review();
        review.setAuthor(author);
        review.setOffer(offer);
        review.setText(request.getText());
        review.setRating(request.getRating());

        reviewRepository.save(review);

        return "Create review with id " + review.getId();
    }
}
