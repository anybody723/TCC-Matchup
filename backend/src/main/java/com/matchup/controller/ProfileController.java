package com.matchup.controller;

import com.matchup.model.user.User;
import com.matchup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/get/user/")
public class ProfileController {

    private final UserService userService;

    @Autowired
    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("by/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
        return new ResponseEntity<>(userService.findByUsername(username).get(), HttpStatus.ACCEPTED);
    }

    @GetMapping("profile-picture/by/id/{id}")
    @PostAuthorize("true")
    public ResponseEntity<byte[]> getProfilePictureById(@PathVariable("id") long userId, @RequestParam("width") int width, @RequestParam("height") int height) {
        return new ResponseEntity<>(userService.getProfilePictureById(userId, width, height), HttpStatus.OK);
    }


/*    @PostMapping("/user")
    @PostAuthorize("true")
    public ResponseEntity<User> register(@RequestBody UserDto userDto) {
        System.out.println("register-user");
        System.out.println(userDto.getBirthDate());

        *//*if (!userService.verifyDate(userDto.getBirthDate())){
            throw new DateTimeException(userDto.getBirthDate().toString());
        }*//*

        return new ResponseEntity<>(userService.registerUser(userDto), HttpStatus.OK);
    }*/

}

