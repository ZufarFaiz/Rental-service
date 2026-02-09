package server.service;

import server.model.dto.response.OfferResponse;

import java.util.List;

public interface OfferService {
    List<OfferResponse> getAllOffers();
}
