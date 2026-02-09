package server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.model.dto.response.OfferResponse;
import server.model.entity.Offer;
import server.repository.OfferRepository;
import server.service.OfferService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {

    private final OfferRepository offerRepository;


    public List<OfferResponse> getAllOffers() {
        List<Offer> offers = offerRepository.findAll();

        return offers.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private OfferResponse convertToResponse(Offer offer) {
        return OfferResponse.builder()
                .id(offer.getId())
                .title(offer.getTitle())
                .description(offer.getDescription())
                .city(offer.getCity())
                .previewImage(offer.getPreviewImage())
                .price(offer.getPrice())
                .rating(offer.getRating())
                .type(offer.getType())
                .rooms(offer.getRooms())
                .guests(offer.getGuests())
                .isPremium(offer.isPremium())
                .isFavorite(offer.isFavorite())
                .commentsCount(offer.getCommentsCount())
                .latitude(offer.getLatitude())
                .longitude(offer.getLongitude())
                .createdAt(offer.getCreatedAt())
                .build();
    }
}