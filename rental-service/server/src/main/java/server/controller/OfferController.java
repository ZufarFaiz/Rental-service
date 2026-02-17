package server.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.model.dto.request.OfferRequest;
import server.model.dto.response.FullOfferResponse;
import server.model.dto.response.OfferResponse;
import server.service.impl.OfferServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@RequiredArgsConstructor
public class OfferController {

    private final OfferServiceImpl offerService;

    @GetMapping
    public ResponseEntity<List<OfferResponse>> getAllOffers() {
        List<OfferResponse> offers = offerService.getAllOffers();
        return ResponseEntity.ok(offers);
    }

    @PostMapping("/create-offer")
    public ResponseEntity<OfferResponse> createOffer(
            @Valid
            @RequestPart("request") OfferRequest request,
            @RequestParam(value = "previewImage") MultipartFile previewImage,
            @RequestParam (value="photos")List<MultipartFile> photos) {

        return ResponseEntity.ok(offerService.createOffer(request,previewImage,photos));
    }

    @GetMapping("/offer/{offerId}")
    public ResponseEntity<FullOfferResponse> getFullOffer(@PathVariable Long offerId){
        return ResponseEntity.ok(offerService.getFullOffer(offerId));
    }
}