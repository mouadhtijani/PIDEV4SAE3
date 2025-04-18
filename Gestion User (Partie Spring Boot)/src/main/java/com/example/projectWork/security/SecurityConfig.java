package com.example.projectWork.security;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig  {

    private final AuthenticationProvider authenticationProvider;
    private final  JwtFilter jwtAuthFilter;


    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req->req.requestMatchers(
                                "/api/v1/auth/**",
                                "/v3/api-docs/**",       // OpenAPI 3.0 API docs
                                "/swagger-ui/**",        // Swagger UI resources
                                "/swagger-ui.html",      // Swagger UI HTML
                                "/swagger-resources/**", // Swagger resources
                                "/webjars/**",
                                "/swagger-ui/index.html",// Webjars used by Swagger UI
                                "/v2/api-docs/**",
                                "/api/v1/internship",
                                "/api/v1/internship/**",
                                "/api/v1/company",
                                "/api/v1/company/**",
                                "/api/v1/company/Create",
                                "/api/v1/application",
                                "/api/v1/application/internship/**",
                                "/api/v1/user",
                                "/api/v1/feedback",
                                "/api/v1/user/student/**"

                                // Swagger 2.0 API docs (if applicable)
                        ).permitAll()
                        .anyRequest()
                        .authenticated())
                .sessionManagement(session->session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }


}
