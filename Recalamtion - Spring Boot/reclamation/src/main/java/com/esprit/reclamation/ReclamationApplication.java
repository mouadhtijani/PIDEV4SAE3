package com.esprit.reclamation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@EnableFeignClients // Enables Feign Client

@SpringBootApplication
public class ReclamationApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReclamationApplication.class, args);
    }
}
