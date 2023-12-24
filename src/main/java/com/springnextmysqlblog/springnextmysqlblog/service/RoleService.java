package com.springnextmysqlblog.springnextmysqlblog.service;

import com.springnextmysqlblog.springnextmysqlblog.model.Role;
import com.springnextmysqlblog.springnextmysqlblog.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role addRole(Role role){
        return roleRepository.save(role);
    }

    public List<Role> getRoles() {
        return roleRepository.findAll();
    }


}