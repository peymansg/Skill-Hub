package com.skillhub.spring_boot_skillhub.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

    @Configuration
    public class WebConfig {
        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**") // Allow all paths
                            .allowedOrigins("http://localhost:3000") // React frontend
                            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Add allowed methods
                            .allowedHeaders("*")
                            .allowCredentials(true);
                }
            };
        }
    }

