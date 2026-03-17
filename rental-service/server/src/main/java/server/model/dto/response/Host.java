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
@Schema(description = "Информация о хосте")
public class Host {

    @Schema(description = "Имя хоста", example = "John Doe")
    private String name;

    @Schema(description = "Pro статус", example = "true")
    private boolean isPro;

    @Schema(description = "URL аватара", example = "/static/avatar.jpg")
    private String avatarUrl;
}