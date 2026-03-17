package server.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Информация о городе")
public class CityDto {

    @Schema(description = "Название города", example = "Paris")
    private String name;

    @Schema(description = "Координаты города")
    private Location location;
}