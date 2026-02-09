package server.model.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.enums.City;
import server.model.enums.Feature;
import server.model.enums.OfferType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OfferResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime publishDate;
    private City city;
    private String previewImage;
    private List<String> photos;
    private boolean isPremium;
    private boolean isFavorite;
    private BigDecimal rating;
    private OfferType type;
    private Integer rooms;
    private Integer guests;
    private Integer price;
    private List<Feature> features;
    private Integer commentsCount;
    private Double latitude;
    private Double longitude;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private UserResponse author;
}