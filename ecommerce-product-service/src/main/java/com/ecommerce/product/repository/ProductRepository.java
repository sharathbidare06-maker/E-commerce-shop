package com.ecommerce.product.repository;

import com.ecommerce.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByCategory(String category);
    List<Product> findByStockGreaterThan(Integer stock);

    @Query("select p from Product p where lower(p.name) like lower(concat('%', :query, '%')) or lower(p.description) like lower(concat('%', :query, '%')) or lower(p.category) like lower(concat('%', :query, '%'))")
    List<Product> search(@Param("query") String query);

    List<Product> findByStockLessThanEqual(Integer threshold);
}
