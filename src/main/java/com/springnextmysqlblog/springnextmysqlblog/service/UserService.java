package com.springnextmysqlblog.springnextmysqlblog.service;

import com.springnextmysqlblog.springnextmysqlblog.model.Role;
import com.springnextmysqlblog.springnextmysqlblog.model.User;
import com.springnextmysqlblog.springnextmysqlblog.repository.RoleRepository;
import com.springnextmysqlblog.springnextmysqlblog.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }




    public void initRolesAndUser(){
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("admin role");
        roleRepository.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("default role for newly created record.");
        roleRepository.save(userRole);

        User adminUser = new User();
        adminUser.setUserName("admin");
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        adminUser.setEmail("amar.tauqeer@gmail.com");
        // date
        long millis=System.currentTimeMillis();
        java.sql.Date date=new java.sql.Date(millis);
        adminUser.setCreatedAt(date);
        adminUser.setUserPassword(encodedPassword("admin@pass"));
        Set<Role> adminRoles= new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userRepository.save(adminUser);

    }

    public String encodedPassword(String password){
        return passwordEncoder.encode(password);
    }
    public User addUser(User user){
        Role role = roleRepository.findById("User").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRole(roles);

        user.setUserPassword(encodedPassword(user.getUserPassword()));
        System.out.println("encoded user password"+ user);
//        return user;
        return userRepository.save(user);
    }

    public String deleteUserById(String name){

//        User user = userRepository.findById(name).get();
//        System.out.println(user.getUserName());
//        Set<Role> roles = new HashSet<>();
//        roles.remove(user.getRole());
//        user.setRole(roles);
//
        userRepository.deleteById(name);
        return "User with name " + name + " has been deleted successfully.";
//        return  user.getUserName();
    }

    public User updateUser(@RequestBody User newUser) {
        return userRepository.findById(newUser.getUserName())
                .map(user -> {
                    user.setEmail(newUser.getEmail());
                    user.setUserName(newUser.getUserName());
                    user.setUserFirstName(newUser.getUserFirstName());
                    user.setUserLastName(newUser.getUserLastName());
                    user.setUserImage(newUser.getUserImage());
//                    user.setUserPassword(encodedPassword(newUser.getUserPassword()));
                    return userRepository.save(user);
                }).orElse(null);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
    public User getUserById(String name) {
        return userRepository.findById(name).orElse(null);
    }
}
