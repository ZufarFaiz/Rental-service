package server.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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
@Tag(name = "Offers", description = "Управление предложениями")
public class OfferController {

    private final OfferServiceImpl offerService;

    @GetMapping
    @Operation(
            summary = "Получить все предложения",
            description = "Возвращает список всех доступных предложений"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список предложений",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = OfferResponse.class))))
    })
    public ResponseEntity<List<OfferResponse>> getAllOffers() {
        List<OfferResponse> offers = offerService.getAllOffers();
        return ResponseEntity.ok(offers);
    }

    @PostMapping(value = "/create-offer", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Создать новое предложение",
            description = "Создает новое предложение с изображениями. Только для авторизованных пользователей"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Предложение успешно создано",
                    content = @Content(schema = @Schema(implementation = OfferResponse.class))),
            @ApiResponse(responseCode = "400", description = "Ошибка валидации данных"),
            @ApiResponse(responseCode = "401", description = "Не авторизован"),
            @ApiResponse(responseCode = "415", description = "Неподдерживаемый формат изображения")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<OfferResponse> createOffer(
            @Valid
            @RequestPart("request") OfferRequest request,
            @RequestParam("previewImage") MultipartFile previewImage,
            @RequestParam("photos") List<MultipartFile> photos) {

        return ResponseEntity.ok(offerService.createOffer(request, previewImage, photos));
    }

    @GetMapping("/offer/{offerId}")
    @Operation(
            summary = "Получить полную информацию о предложении",
            description = "Возвращает детальную информацию о конкретном предложении"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Информация о предложении",
                    content = @Content(schema = @Schema(implementation = FullOfferResponse.class))),
            @ApiResponse(responseCode = "404", description = "Предложение не найдено")
    })
    public ResponseEntity<FullOfferResponse> getFullOffer(@PathVariable Long offerId) {
        return ResponseEntity.ok(offerService.getFullOffer(offerId));
    }

    @GetMapping("/favorite")
    @Operation(
            summary = "Получить избранные предложения",
            description = "Возвращает список избранных предложений текущего пользователя"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список избранных предложений",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = OfferResponse.class)))),
            @ApiResponse(responseCode = "401", description = "Не авторизован")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<List<OfferResponse>> getFavoriteOffers() {
        return ResponseEntity.ok(offerService.getFavoriteOffers());
    }

    @PostMapping("/favorite/{offerId}/{status}")
    @Operation(
            summary = "Изменить статус избранного",
            description = "Добавляет или удаляет предложение из избранного"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Статус обновлен",
                    content = @Content(schema = @Schema(implementation = OfferResponse.class))),
            @ApiResponse(responseCode = "401", description = "Не авторизован"),
            @ApiResponse(responseCode = "404", description = "Предложение не найдено")
    })
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<OfferResponse> toggleFavorite(
            @PathVariable Long offerId,
            @PathVariable boolean status) {

        OfferResponse response = offerService.toggleFavorite(offerId, status);
        return ResponseEntity.ok(response);
    }
}