package com.navcare.service;

import java.security.Principal;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.navcare.dto.ApiResponse;
import com.navcare.dto.CreateStaffDTO;
import com.navcare.dto.UserDTO;
import com.navcare.model.Admin;
import com.navcare.model.Role;
import com.navcare.model.Staff;
import com.navcare.repository.AdminDAO;
import com.navcare.repository.StaffDAO;

@Service 
public class AdminService {

   @Autowired
   private StaffDAO staffDAO;

   @Autowired
   private AdminDAO adminDAO;

   private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

   public ApiResponse<UserDTO> getStaffById(Integer staffID) {
      Optional<Staff> staffOPT = staffDAO.findById(staffID);

      if (staffOPT.isEmpty()) {
         return new ApiResponse<>(
            "Staff with ID does not exist",
            null,
            HttpStatus.BAD_REQUEST.value(),
            false
         );
      }

      UserDTO user = new UserDTO(
         staffOPT.get().getStaffID(),
         staffOPT.get().getName(),
         staffOPT.get().getPhoneNumber(),
         staffOPT.get().getEmail(),
         staffOPT.get().getRole()
      );

      return new ApiResponse<>(
         "Staff retrieved successfully",
         user,
         HttpStatus.OK.value(),
         true
      );
   }

   public ApiResponse<Void> createStaff(CreateStaffDTO staff) {
      
      if (staffDAO.findByUserName(staff.getUserName()).isPresent()) {
         return new ApiResponse<>(
            "Staff with the same username already exists",
            null,
            HttpStatus.BAD_REQUEST.value(),
            false
         );
      }

      if (staffDAO.findByPhoneNumber(staff.getPhoneNumber()).isPresent()) {
         return new ApiResponse<>(
            "Staff with the same phone number already exists",
            null,
            HttpStatus.BAD_REQUEST.value(),
            false
         );
      }
      
      if (staffDAO.findByEmail(staff.getEmail()).isPresent()) {
         return new ApiResponse<>(
            "Staff with the same email already exists",
            null,
            HttpStatus.BAD_REQUEST.value(),
            false
         );
      }

      Optional<Admin> adminOPT = adminDAO.findById(staff.getAdminID());

      if (adminOPT.isEmpty()) {
         return new ApiResponse<>(
            "Admin ID not found",
            null,
            HttpStatus.BAD_REQUEST.value(),
            false
         );
      }

      Staff newStaff = new Staff();
      newStaff.setName(staff.getName());
      newStaff.setUserName(staff.getUserName());
      newStaff.setPhoneNumber(staff.getPhoneNumber());
      newStaff.setEmail(staff.getEmail());
      newStaff.setPassword(encoder.encode(staff.getPassword()));
      newStaff.setRole(Role.STAFF);
      newStaff.setAdmin(adminOPT.get());
      newStaff.setCreatedAt(new Date());

      staffDAO.save(newStaff);

      return new ApiResponse<>(
         "Staff created successfully",
         null,
         HttpStatus.CREATED.value(),
         true
      );

   }
}
