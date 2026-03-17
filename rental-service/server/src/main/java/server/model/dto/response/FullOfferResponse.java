package server.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Полная информация о предложении")
public class FullOfferResponse {

    @Schema(description = "ID предложения", example = "1")
    private Long id;

    @Schema(description = "Название", example = "Beautiful Apartment in City Center")
    private String title;

    @Schema(description = "Описание", example = "This is a beautiful apartment with all amenities included.")
    private String description;

    @Schema(description = "Город")
    private CityDto city;

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

    @Schema(description = "Список фото")
    private List<String> photos;

    @Schema(description = "Список удобств")
    private List<Feature> featureList;

    @Schema(description = "Информация о хосте")
    private Host host;

    @Schema(description = "Количество комнат", example = "2")
    private int rooms;

    @Schema(description = "Количество гостей", example = "3")
    private int guests;
}