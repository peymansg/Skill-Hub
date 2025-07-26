package com.skillhub.spring_boot_skillhub.controller;

import com.skillhub.spring_boot_skillhub.dao.SkillRepository;
import com.skillhub.spring_boot_skillhub.dao.UsersRepository;
import com.skillhub.spring_boot_skillhub.dto.SkillDTO;
import com.skillhub.spring_boot_skillhub.entity.Skill;
import com.skillhub.spring_boot_skillhub.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private final SkillRepository skillRepository;

    @Autowired
    private final UsersRepository usersRepository;

    public SkillController(SkillRepository skillRepository,UsersRepository usersRepository) {
        this.skillRepository = skillRepository;
        this.usersRepository=usersRepository;
    }


    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills(){
        List<Skill> skills= skillRepository.findAll();
        return ResponseEntity.ok(skills);
    }

    @PutMapping
    public ResponseEntity<Skill> updateSkill(@RequestBody Skill skill) {
        // example: save or update the skill
        Skill updated = skillRepository.save(skill);
        return ResponseEntity.ok(updated);
    }

    @PostMapping
    public ResponseEntity<?> addSkill(@RequestBody SkillDTO skillDTO) {
        Optional<User> userOptional = usersRepository.findById(skillDTO.getUser_id());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found with ID: " + skillDTO.getUser_id());
        }

        User user = userOptional.get();

        Skill skill = new Skill();
        skill.setTitle(skillDTO.getTitle());
        skill.setLevel(skillDTO.getLevel());
        skill.setDescription(skillDTO.getDescription());
        skill.setUser(user);

        Skill savedSkill = skillRepository.save(skill);
        System.out.println("savedSkill savedSkill savedSkill"+savedSkill);

        return ResponseEntity.ok(savedSkill);
    }

    @DeleteMapping("/{id}")

    public ResponseEntity<?> deleteSkill(@PathVariable Long id){
        if(skillRepository.existsById(id)){
            skillRepository.deleteById(id);
            return ResponseEntity.ok(Collections.singletonMap("message","Skill deleted successfully."));

        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error","Skill not found."));
        }
    }

}
