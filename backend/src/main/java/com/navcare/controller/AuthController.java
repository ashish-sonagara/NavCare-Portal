package com.navcare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.navcare.dto.ApiResponse;
import com.navcare.dto.AdminDTO;
import com.navcare.dto.LoginDTO;
import com.navcare.dto.UserDTO;
import com.navcare.service.AuthService;

import jakarta.validation.Valid;

@CrossOrigin 
@RestController 
@RequestMapping("/authentication")
public class AuthController {
    
    @Autowired 
    private AuthService authService;

    @PostMapping("/registerAdmin")
    public ResponseEntity<ApiResponse<Void>> registerAdmin(@Valid @RequestBody AdminDTO createAdmin) {
        ApiResponse<Void> response = authService.signUp(createAdmin);
        return ResponseEntity.status(response.getHttpCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDTO>> login(@Valid @RequestBody LoginDTO loginDTO) {
        ApiResponse<UserDTO> response = authService.login(loginDTO);
        return ResponseEntity.status(response.getHttpCode()).body(response);
    }
}
