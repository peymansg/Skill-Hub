package com.skillhub.spring_boot_skillhub.dao;

import com.skillhub.spring_boot_skillhub.entity.Project;
import com.skillhub.spring_boot_skillhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project,Long> {

}
