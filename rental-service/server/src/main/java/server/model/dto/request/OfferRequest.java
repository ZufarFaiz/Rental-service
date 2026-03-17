package server.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import server.model.dto.response.Location;
import server.model.enums.City;
import server.model.enums.Feature;
import server.model.enums.OfferType;

import java.math.BigDecimal;
import java.util.List;

@Data
@Schema(description = "Запрос на создание/обновление предложения")
public class OfferRequest {

    @Schema(description = "Название предложения", example = "Beautiful Apartment in City Center")
    private String title;

    @Schema(description = "Описание", example = "This is a beautiful apartment with all amenities included.")
    private String description;

    @Schema(description = "Город", example = "PARIS")
    private City city;

    @Schema(description = "Координаты")
    private Location location;

    @Schema(description = "Премиум предложение", example = "true")
    private boolean isPremium;

    @Schema(description = "В избранном", example = "false")
    private boolean isFavorite;

    @Schema(description = "Рейтинг", example = "4.5")
    private BigDecimal rating;

    @Schema(description = "Тип жилья", example = "APARTMENT")
    private OfferType type;

    @Schema(description = "Количество комнат", example = "2")
    private Integer rooms;

    @Schema(description = "Количество гостей", example = "3")
    private Integer guests;

    @Schema(description = "Цена за ночь", example = "5000")
    private Integer price;

    @Schema(description = "Список удобств", example = "[\"WIFI\", \"PARKING\", \"KITCHEN\"]")
    private List<Feature> feature;

    @Schema(description = "Количество комментариев", example = "5")
    private Integer commentsCount;

    @Schema(description = "ID автора", example = "1")
    private Long authorId;
}