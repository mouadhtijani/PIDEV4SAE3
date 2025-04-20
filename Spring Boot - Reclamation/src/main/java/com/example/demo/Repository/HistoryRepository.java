// src/main/java/com/example/demo/Repository/HistoryRepository.java
package com.example.demo.Repository;

import com.example.demo.Entity.HistoryEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepository extends JpaRepository<HistoryEntry, Long> {
    List<HistoryEntry> findAllByOrderByTimestampDesc();
}
