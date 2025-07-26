package com.skillhub.spring_boot_skillhub.controller;

import com.skillhub.spring_boot_skillhub.dao.ProjectRepository;
import com.skillhub.spring_boot_skillhub.dao.UsersRepository;
import com.skillhub.spring_boot_skillhub.dto.ProjectDTO;
import com.skillhub.spring_boot_skillhub.entity.Project;
import com.skillhub.spring_boot_skillhub.entity.User;
import jakarta.websocket.server.PathParam;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
@Data
    public class ProjectController {

        @Autowired
        private ProjectRepository projectRepository;

    @Autowired
    private UsersRepository usersRepository;

        @GetMapping
        public List<Project> getAllProjects() {
            return projectRepository.findAll();
        }

        @GetMapping("/{id}")
        public Project getProjectById(@PathVariable Long id) {
            return projectRepository.findById(id).orElse(null);
        }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectDTO projectDTO) {
        User user = usersRepository.findById(projectDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + projectDTO.getUserId()));

        Project project = new Project();
        project.setTitle(projectDTO.getTitle());
        project.setDescription(projectDTO.getDescription());
        project.setSkillsRequirements(projectDTO.getSkillsRequirements());
        project.setPostedBy(user.getFirstname() + " " + user.getLastname()); // or just user.getFirstname()
        project.setCreatedAt(LocalDateTime.now());
        project.setUser(user); // 👈 MOST IMPORTANT


        System.out.println("Project"+project);
        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
        }

        @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id){
            if(projectRepository.existsById(id)){
                projectRepository.deleteById(id);
                return ResponseEntity.ok(Collections.singletonMap("message","Project deleted successfully."));

            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("error","Project not found."));
            }
        }

}

