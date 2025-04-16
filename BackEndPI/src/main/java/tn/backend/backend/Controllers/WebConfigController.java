package tn.backend.backend.Controllers;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfigController implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Specify the location of the uploads directory
        String uploadPath = Paths.get("uploads").toAbsolutePath().toUri().toString();

        // Map any request to /uploads/** to be served from the uploads folder
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadPath);
    }
}
