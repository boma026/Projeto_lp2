package tech.buildrun.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.buildrun.api.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}