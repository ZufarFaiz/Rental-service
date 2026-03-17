package server.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.entity.Offer;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Географические координаты")
public class Location {

    @Schema(description = "Широта", example = "48.8566")
    private Double latitude;

    @Schema(description = "Долгота", example = "2.3522")
    private Double longitude;

    @Schema(description = "Уровень приближения карты", example = "13")
    private Integer zoom;

    public Location(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = 13;
    }

    public static Location fromOffer(Offer offer) {
        return new Location(offer.getLatitude(), offer.getLongitude());
    }
}