package server.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.entity.Offer;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    private Double latitude;
    private Double longitude;
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