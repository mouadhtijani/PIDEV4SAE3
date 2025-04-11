package com.esprit.user.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JwtFilter jwtAuthFilter;

    // Constructor injection
    public SecurityConfig(AuthenticationProvider authenticationProvider, JwtFilter jwtAuthFilter) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200", "http://localhost:8081")  // Allow these origins (adjust as necessary)
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults())  // Use the WebMvcConfigurer CORS configuration
                .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF for stateless API
                .authorizeHttpRequests( req -> req
                        .requestMatchers(
                                "/api/v1/auth/register",  // Allow registration without authentication
                                "/v3/api-docs/**",        // OpenAPI Docs
                                "/swagger-ui/**",         // Swagger UI resources
                                "/swagger-ui.html",       // Swagger UI HTML page
                                "/swagger-resources/**",  // Swagger resources
                                "/webjars/**",            // Swagger webjars
                                "/swagger-ui/index.html", // Swagger UI index
                                "/v2/api-docs/**",        // OpenAPI v2 docs
                                "/api/v1/internship",     // Public resources
                                "/api/v1/company",        // Public resources
                                "/api/v1/application",    // Public resources
                                "/api/v1/user",           // Access to user endpoints
                                "/api/v1/feedback",       // Public feedback endpoint
                                "/api/v1/user/student/**" // Access to student profile editing
                        ).permitAll()  // Make these routes accessible without authentication
                        .anyRequest().authenticated())  // Secure all other endpoints requiring authentication
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Stateless session
                .authenticationProvider(authenticationProvider)  // Custom Authentication Provider
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);  // Add JWT filter before UsernamePasswordAuthenticationFilter

        return http.build();
    }

}
