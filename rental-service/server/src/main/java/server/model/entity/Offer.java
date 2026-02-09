package server.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import server.model.enums.City;
import server.model.enums.Feature;
import server.model.enums.OfferType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "offers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 100)
    @NotBlank
    @Size(min = 10, max = 100)
    private String title;

    @Column(name = "description", nullable = false, length = 1024)
    @NotBlank
    @Size(min = 20, max = 1024)
    private String description;

    @Column(name = "publish_date", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime publishDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "city", nullable = false)
    @NotNull
    private City city;

    @Column(name = "preview_image", nullable = false)
    @NotBlank
    private String previewImage;

    @Column(name = "photos", nullable = false)
    @JdbcTypeCode(SqlTypes.ARRAY)
    @ElementCollection
    @CollectionTable(name = "offer_photos", joinColumns = @JoinColumn(name = "offer_id"))
    private List<String> photos = new ArrayList<>();

    @Column(name = "is_premium", nullable = false)
    private boolean isPremium;

    @Column(name = "is_favorite", nullable = false)
    private boolean isFavorite = false;

    @Column(name = "rating", nullable = false, precision = 2, scale = 1)
    @DecimalMin(value = "1.0")
    @DecimalMax(value = "5.0")
    private BigDecimal rating;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    @NotNull
    private OfferType type;

    @Column(name = "rooms", nullable = false)
    @Min(value = 1)
    @Max(value = 8)
    private Integer rooms;

    @Column(name = "guests", nullable = false)
    @Min(value = 1)
    @Max(value = 10)
    private Integer guests;

    @Column(name = "price", nullable = false)
    @Min(value = 100)
    @Max(value = 100000)
    private Integer price;

    @Column(name = "features", nullable = false)
    @JdbcTypeCode(SqlTypes.ARRAY)
    @ElementCollection
    @CollectionTable(name = "offer_features", joinColumns = @JoinColumn(name = "offer_id"))
    @Enumerated(EnumType.STRING)
    private List<Feature> features = new ArrayList<>();

    @Column(name = "comments_count", nullable = false)
    private Integer commentsCount = 0;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    @NotNull
    private User author;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "offer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (publishDate == null) {
            publishDate = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}