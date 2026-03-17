package server.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.enums.OfferType;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Краткая информация о предложении (для списка)")
public class OfferResponse {

    @Schema(description = "ID предложения", example = "1")
    private Long id;

    @Schema(description = "Название", example = "Beautiful Apartment in City Center")
    private String title;

    @Schema(description = "Город")
    private CityDto city;

    @Schema(description = "URL превью изображения", example = "/static/preview.jpg")
    private String previewImage;

    @Schema(description = "Премиум предложение", example = "true")
    private boolean isPremium;

    @Schema(description = "В избранном", example = "false")
    private boolean isFavorite;

    @Schema(description = "Рейтинг", example = "4.5")
    private BigDecimal rating;

    @Schema(description = "Тип жилья", example = "APARTMENT")
    private OfferType type;

    @Schema(description = "Цена за ночь", example = "5000")
    private Integer price;

    @Schema(description = "Координаты")
    private Location location;
}