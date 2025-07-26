package com.skillhub.spring_boot_skillhub.dao;

import com.skillhub.spring_boot_skillhub.entity.Skill;
import com.skillhub.spring_boot_skillhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill,Long> {

    Optional<Skill> findAllById(Long id);
}
