package com.springnextmysqlblog.springnextmysqlblog.model;

import jakarta.persistence.*;


@Entity
public class Role {
    @Id
    @Column(length = 50)
    private String roleName;
    private String roleDescription;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDescription() {
        return roleDescription;
    }

    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription;
    }
}