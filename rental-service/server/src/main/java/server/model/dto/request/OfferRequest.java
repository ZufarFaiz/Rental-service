package server.model.dto.request;

import lombok.Data;
import server.model.dto.response.Location;
import server.model.enums.City;
import server.model.enums.Feature;
import server.model.enums.OfferType;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OfferRequest {
    private String title;
    private String description;
    private City city;
    private Location location;
    private boolean isPremium;
    private boolean isFavorite;
    private BigDecimal rating;
    private OfferType type;
    private Integer rooms;
    private Integer guests;
    private Integer price;
    private List<Feature> feature;
    private Integer commentsCount;

    private Long authorId;
}