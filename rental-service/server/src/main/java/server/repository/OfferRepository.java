package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.model.entity.Offer;

public interface OfferRepository extends JpaRepository<Offer,Long> {
}
