package com.esprit.iqtest.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class ImConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // ✅ Make sure this path points to the correct 'captures' folder location
        Path uploadDir = Paths.get("iqtest/captures"); // relative to project root
        String uploadPath = uploadDir.toFile().getAbsolutePath();

        registry.addResourceHandler("/captures/**")
                .addResourceLocations("file:" + uploadPath + "/");
    }
}
