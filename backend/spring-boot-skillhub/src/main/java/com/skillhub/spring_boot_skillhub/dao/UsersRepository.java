package com.skillhub.spring_boot_skillhub.dao;


import com.skillhub.spring_boot_skillhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsernameAndPassword(String username, String password);

    Optional<User> findAllById(Long id);
}
