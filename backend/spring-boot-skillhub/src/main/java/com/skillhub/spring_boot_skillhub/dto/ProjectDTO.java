package com.skillhub.spring_boot_skillhub.dto;
import lombok.Data;

@Data
public class ProjectDTO {

        private String title;
        private String description;
        private String skillsRequirements;
        private String postedBy;
        private Long userId;


        // Getter and Setter for user_id
    }


