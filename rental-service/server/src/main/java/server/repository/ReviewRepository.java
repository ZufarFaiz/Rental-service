package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.model.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}
