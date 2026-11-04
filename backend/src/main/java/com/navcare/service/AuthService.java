package com.navcare.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.navcare.dto.ApiResponse;
import com.navcare.dto.AdminDTO;
import com.navcare.dto.LoginDTO;
import com.navcare.dto.UserDTO;
import com.navcare.model.Admin;
import com.navcare.model.Role;
import com.navcare.model.Staff;
import com.navcare.repository.AdminDAO;
import com.navcare.repository.StaffDAO;

@Service
public class AuthService {

  @Autowired
  public AdminDAO adminDAO;

  @Autowired
  public StaffDAO staffDAO;

  private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

  public ApiResponse<Void> signUp(AdminDTO createAdmin) {
    
    if (adminDAO.findByPhoneNumber(createAdmin.getPhoneNumber()).isPresent()) {
      return new ApiResponse<>(
        "Admin with same Mobile Number already exist",
        null,
        HttpStatus.BAD_REQUEST.value(),
        false
      );
    }

    if (adminDAO.findByEmail(createAdmin.getEmail()).isPresent()) {
      return new ApiResponse<>(
        "Admin with same Email already exist",
        null,
        HttpStatus.BAD_REQUEST.value(),
        false
      );
    }

    if (adminDAO.findByUserName(createAdmin.getUsername()).isPresent()) {
      return new ApiResponse<>(
        "Admin with same userName already exist",
        null,
        HttpStatus.BAD_REQUEST.value(),
        false
      );
    }

    Admin admin = new Admin();
    admin.setName(createAdmin.getName());
    admin.setUserName(createAdmin.getUsername());
    admin.setPhoneNumber(createAdmin.getPhoneNumber());
    admin.setEmail(createAdmin.getEmail());
    admin.setCreatedAt(new Date());
    admin.setPassword(encoder.encode(createAdmin.getPassword()));
    admin.setRole(Role.ADMIN);

    adminDAO.save(admin);

    return new ApiResponse<>(
      "Admin Created Successfully",
      null,
      HttpStatus.CREATED.value(),
      true
    );
  }

  public ApiResponse<UserDTO> login(LoginDTO loginDTO) {
    String username = loginDTO.getUsername();
    String password = loginDTO.getPassword();
    Optional<Admin> adminOpt = adminDAO.findByUserName(username);

    if (adminOpt.isPresent()) {
      Admin admin = adminOpt.get();
      if (!encoder.matches(password, admin.getPassword())) {
        return new ApiResponse<>(
          "Logged-In failed",
          null,
          HttpStatus.UNAUTHORIZED.value(),
          false);
      }

      UserDTO user = new UserDTO();
      user.setUserID(admin.getAdminID());
      user.setName(admin.getName());
      user.setPhoneNumber(admin.getPhoneNumber());
      user.setEmail(admin.getEmail());
      user.setRole(admin.getRole());

      return new ApiResponse<>(
        "Logged In Successful as Admin",
        user,
        HttpStatus.OK.value(),
        true
        );
    }

    Optional<Staff> staffOpt = staffDAO.findByUserName(username);

    if (staffOpt.isPresent()) {
      Staff staff = staffOpt.get();
      if (!encoder.matches(password, staff.getPassword())) {
        return new ApiResponse<>(
          "Logged-In failed",
          null,
          HttpStatus.UNAUTHORIZED.value(),
          false);
      }

      UserDTO user = new UserDTO();
      user.setUserID(staff.getStaffID());
      user.setName(staff.getName());
      user.setPhoneNumber(staff.getPhoneNumber());
      user.setEmail(staff.getEmail());
      user.setRole(staff.getRole());

      return new ApiResponse<>(
          "Logged In Successful as Staff",
          user,
          HttpStatus.OK.value(),
          true);
    }

    return new ApiResponse<>(
        "Logged-In failed",
        null,
        HttpStatus.UNAUTHORIZED.value(),
        false);
  }

}
