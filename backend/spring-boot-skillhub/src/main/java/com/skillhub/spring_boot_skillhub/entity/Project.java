package com.skillhub.spring_boot_skillhub.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@Data

public class Project {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Long id;

        @Column(name = "title")
        private String title;

        @Column(name = "description")
        private String description;

        @Column(name = "skills_requirements")
        private String skillsRequirements;

        @Column(name = "posted_by")
        private String postedBy;

        @Column(name = "created_at")
        private LocalDateTime createdAt;

        @ManyToOne
        @JoinColumn(name = "user_id",nullable = false)
        private User user;

        public Project() {}

        public Project(String title, String description, String skillsRequirements, String postedBy, LocalDateTime createdAt,User user) {
                this.title = title;
                this.description = description;
                this.skillsRequirements = skillsRequirements;
                this.postedBy = postedBy;
                this.createdAt = createdAt;
                this.user=user;
        }

        // Getters and Setters

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public String getTitle() {
                return title;
        }

        public void setTitle(String title) {
                this.title = title;
        }

        public String getDescription() {
                return description;
        }

        public void setDescription(String description) {
                this.description = description;
        }

        public String getSkillsRequirements() {
                return skillsRequirements;
        }

        public void setSkillsRequirements(String skillsRequirements) {
                this.skillsRequirements = skillsRequirements;
        }

        public String getPostedBy() {
                return postedBy;
        }

        public void setPostedBy(String postedBy) {
                this.postedBy = postedBy;
        }

        public LocalDateTime getCreatedAt() {
                return createdAt;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
                this.createdAt = createdAt;
        }

        public User getUser(){
                return user;
        }

        public void setUser(User user){
                this.user=user;
        }

        @Override
        public String toString() {
            return "Project{" +
                    "id=" + id +
                    ", title='" + title + '\'' +
                    ", description='" + description + '\'' +
                    ", skillsRequirements='" + skillsRequirements + '\'' +
                    ", postedBy='" + postedBy + '\'' +
                    ", created_at='" + (createdAt != null ? "[PROVIDED]" : null) + '\'' +
                    ", userId='" + (user != null ? user.getId() : null) + '\'' +

                    '}';
        }

    }

