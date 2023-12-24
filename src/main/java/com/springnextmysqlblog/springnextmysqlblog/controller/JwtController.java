package com.springnextmysqlblog.springnextmysqlblog.controller;

import com.springnextmysqlblog.springnextmysqlblog.model.JwtRequest;
import com.springnextmysqlblog.springnextmysqlblog.model.JwtResponse;
import com.springnextmysqlblog.springnextmysqlblog.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*",methods = {RequestMethod.POST})
public class JwtController {

    @Autowired
    private JwtService jwtService;


    @PostMapping("/authenticate")
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        return jwtService.createJwtToken(jwtRequest);
    }


}