package com.example.pi;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupervisorRepository extends JpaRepository<Supervisor, Long> {

        List<Supervisor> findByNameContainingOrEmailContaining(String name, String email);
    }

