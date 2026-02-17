package server.model.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ReviewRequest {
    @NotBlank
    @Size(min = 5, max=120)
    private String text;

    @NotNull
    @Min(value = 1)
    @Max(value = 5)
    private Integer rating;

    @NotNull
    private Long offerId;

    @NotNull
    private Long userId;
}
