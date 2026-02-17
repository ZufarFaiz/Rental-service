package server.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.enums.Feature;
import server.model.enums.OfferType;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FullOfferResponse {
    private Long id;
    private String title;
    private String description;
    private CityDto city;
    private boolean isPremium;
    private boolean isFavorite;
    private BigDecimal rating;
    private OfferType type;
    private Integer price;
    private Location location;
    private List<String> photos;
    private List<Feature> featureList;
    private Host host;
    private int rooms;
    private int guests;
}