package com.springnextmysqlblog.springnextmysqlblog.controller;

import com.springnextmysqlblog.springnextmysqlblog.model.Post;
import com.springnextmysqlblog.springnextmysqlblog.model.User;
import com.springnextmysqlblog.springnextmysqlblog.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.POST,
        RequestMethod.GET, RequestMethod.DELETE, RequestMethod.OPTIONS,
        RequestMethod.PATCH, RequestMethod.PUT})
@RequestMapping("/user")
@RestController
public class UserController {
    @Autowired
    private final UserService userService;

    private final String FOLDER_PATH = "/home/amar/D/Java/JavaProject/spring-next-mysql-blog/src" +
            "/main/upload/static/images";

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void initRolesAndUsers() {
        userService.initRolesAndUser();
    }

    @PostMapping("/addUser")
    public User addUser(@ModelAttribute("user") User user,
                        @RequestParam(value = "file", required = false) MultipartFile file) {

        System.out.println(user);

        if (file != null) {

            String fileName = file.getOriginalFilename();
            LocalDate localDate = LocalDate.now();
            fileName = localDate + "-" + fileName;

            Path fileNamePath = Paths.get(FOLDER_PATH, fileName);


            try {
                Files.write(fileNamePath, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            user.setUserImage(fileName);
        }

        return userService.addUser(user);
    }


    @GetMapping
    @PreAuthorize("hasRole('Admin')")
    public List<User> getUsers() {
        return userService.getUsers();
    }


    @GetMapping("/{name}")
    @PreAuthorize("hasAnyRole('Admin','User')")
    public User getUserById(@PathVariable String name) {
        return userService.getUserById(name);
    }

    @DeleteMapping("/delete/{name}")
    @PreAuthorize("hasRole('Admin')")
    public String deleteUser(@PathVariable String name) throws IOException {

        User existingUser = userService.getUserById(name);
        String userImage = existingUser.getUserImage();

        if (!userImage.isEmpty()) {

            Path imagePath = Paths.get(FOLDER_PATH, userImage);
            System.out.println("image path " + imagePath);
            Files.delete(imagePath);
        }

        return userService.deleteUserById(name);
    }

    @PutMapping("/update")
//    @PreAuthorize("hasRole('Admin')")
    public User updateUser(@ModelAttribute("user") User newUser,
                           @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        System.out.println("file" + file);

        User existingUser = userService.getUserById(newUser.getUserName());
        System.out.println("existing user" + existingUser);
        String oldImage = existingUser.getUserImage();
        System.out.println("old image" + oldImage);

        if (file != null) {
            System.out.println("file =null");
            String fileName = file.getOriginalFilename();
            LocalDate localDate = LocalDate.now();
            fileName = localDate + "-" + fileName;

            if (!file.isEmpty()) {

                Path fileNamePath = Paths.get(FOLDER_PATH, fileName);
                if ((oldImage == null) || (oldImage.isEmpty())) {
                    System.out.println("1");
                    Files.write(fileNamePath, file.getBytes());
                } else {
                    System.out.println("2");
                    Path oldImagePath = Paths.get(FOLDER_PATH, oldImage);
                    System.out.println("old image path " + oldImagePath);
                    Files.write(fileNamePath, file.getBytes());
                    Files.delete(oldImagePath);

                }
                System.out.println("4 " + newUser + " " + fileName);
                newUser.setUserImage(fileName);
                System.out.println("5 " + newUser);
            }
        }
        if (oldImage != null) {
            newUser.setUserImage(oldImage);
        }

        System.out.println(newUser);
        return userService.updateUser(newUser);

    }

    @GetMapping("/forAdmin")
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin() {
        return "This URL is only accessible to admin.";
    }


    @GetMapping("/forUser")
    @PreAuthorize("hasRole('User')")
//    @PreAuthorize("hasAnyRole('User','Admin')") for multiple roles
    public String forUser() {
        return "This URL is only accessible to user.";
    }

}
