package server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import server.exception.NotFoundException;
import server.model.dto.request.OfferRequest;
import server.model.dto.response.CityDto;
import server.model.dto.response.FullOfferResponse;
import server.model.dto.response.Host;
import server.model.dto.response.OfferResponse;
import server.model.entity.Offer;
import server.model.entity.User;
import server.model.enums.UserType;
import server.repository.OfferRepository;
import server.repository.UserRepository;
import server.service.OfferService;

import java.util.List;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {

    private final OfferRepository offerRepository;
    private final UserRepository userRepository;
    private final FileStorageServiceImpl fileStorageService;

    public OfferResponse createOffer(OfferRequest request, MultipartFile previewImage, List<MultipartFile> photos) {
        User author = userRepository.findById(request.getAuthorId())
                .orElseThrow(() -> new NotFoundException("User not found"));

        Offer offer = new Offer();
        offer.setTitle(request.getTitle());
        offer.setDescription(request.getDescription());
        offer.setCity(request.getCity());
        offer.setCommentsCount(request.getCommentsCount());
        offer.setRating(request.getRating());
        offer.setPrice(request.getPrice());
        offer.setPremium(request.isPremium());
        offer.setGuests(request.getGuests());
        offer.setRooms(request.getRooms());

        if (request.getLocation() != null) {
            offer.setLocation(request.getLocation());
        } else {
            offer.setLatitude(request.getCity().getLocation().getLatitude());
            offer.setLongitude(request.getCity().getLocation().getLongitude());
        }

        offer.setPreviewImage(fileStorageService.storeFile(previewImage));
        offer.setPhotos(photos.stream()
                .map(fileStorageService::storeFile)
                .collect(Collectors.toList()));
        offer.setFavorite(request.isFavorite());
        offer.setAuthor(author);
        offer.setFeatures(request.getFeature());
        offer.setType(request.getType());

        Offer savedOffer = offerRepository.save(offer);
        return convertToResponse(savedOffer);
    }

    public List<OfferResponse> getAllOffers() {
        return offerRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<OfferResponse> getFavoriteOffers(){
        return offerRepository.findByIsFavorite(true).stream()
                .map(this::convertToResponse)
                .toList();
    }

    public OfferResponse toggleFavorite(Long offerId,boolean isFavorite){
        Offer offer = offerRepository.findById(offerId).orElseThrow(()->new NotFoundException("Offer not found"));
        offer.setFavorite(isFavorite);
        Offer savedOffer = offerRepository.save(offer);
        return convertToResponse(savedOffer);
    }

    private OfferResponse convertToResponse(Offer offer) {
        CityDto cityDto = CityDto.builder()
                .name(offer.getCity().getDisplayName())
                .location(offer.getCity().getLocation())
                .build();

        return OfferResponse.builder()
                .id(offer.getId())
                .title(offer.getTitle())
                .city(cityDto)
                .previewImage(fullFilePath(offer.getPreviewImage()))
                .isPremium(offer.isPremium())
                .isFavorite(offer.isFavorite())
                .rating(offer.getRating())
                .type(offer.getType())
                .price(offer.getPrice())
                .location(offer.getLocation())
                .build();
    }

    private FullOfferResponse convertToFullResponse(Offer offer) {
        CityDto cityDto = CityDto.builder()
                .name(offer.getCity().getDisplayName())
                .location(offer.getCity().getLocation())
                .build();
        Host host = Host.builder()
                .name(offer.getAuthor().getUsername())
                .isPro(offer.getAuthor().getUserType().equals(UserType.PRO))
                .avatarUrl(offer.getAuthor().getAvatar())
                .build();

        return FullOfferResponse.builder()
                .id(offer.getId())
                .title(offer.getTitle())
                .description(offer.getDescription())
                .city(cityDto)
                .isPremium(offer.isPremium())
                .isFavorite(offer.isFavorite())
                .rating(offer.getRating())
                .type(offer.getType())
                .price(offer.getPrice())
                .location(offer.getLocation())
                .photos(offer.getPhotos().stream()
                        .map(this::fullFilePath)
                        .collect(Collectors.toList()))
                .featureList(offer.getFeatures())
                .host(host)
                .rooms(offer.getRooms())
                .guests(offer.getGuests())
                .build();
    }

    private String fullFilePath(String relativePath) {
        if (relativePath == null || relativePath.isEmpty()) {
            return null;
        }
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/static/")
                .path(relativePath)
                .toUriString();
    }

    public FullOfferResponse getFullOffer(Long offerId){
        Offer offer = offerRepository.findById(offerId).orElseThrow(
                ()-> new NotFoundException("Offer not found")
        );
        return convertToFullResponse(offer);
    }
}