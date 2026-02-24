package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.model.entity.Offer;

import java.util.List;

public interface OfferRepository extends JpaRepository<Offer,Long> {
    List<Offer> findByIsFavorite(boolean isFavorite);
}
