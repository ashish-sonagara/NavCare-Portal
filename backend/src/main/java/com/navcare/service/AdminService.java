package com.navcare.service;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.navcare.dto.ApiResponse;
import com.navcare.dto.StaffDTO;
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
         staffOPT.get().getUserName(),
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

   public ApiResponse<Void> createStaff(StaffDTO staff) {
      
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

   @Transactional(readOnly = true)
   public ApiResponse<Page<StaffDTO>> fetchAllStaffs(Integer pageNo, Integer pageSize, String searchText) {
      Pageable pageable = PageRequest.of(
         pageNo,
         pageSize
      );

      Page<Staff> staffPage;
      if (searchText == null || searchText.trim().isEmpty()) {
         staffPage = staffDAO.findAll(pageable);
      } else {
         staffPage = staffDAO.searchStaffs(searchText.trim(), pageable);
      }

      Page<StaffDTO> staffDTOPage = staffPage.map(staff -> {
         StaffDTO dto = new StaffDTO();
         dto.setStaffID(staff.getStaffID());
         dto.setName(staff.getName());
         dto.setUserName(staff.getUserName());
         dto.setPhoneNumber(staff.getPhoneNumber());
         dto.setEmail(staff.getEmail());
         dto.setPassword(null);
         dto.setRole(staff.getRole());
         dto.setAdminID(staff.getAdmin().getAdminID());
         dto.setCreatedAt(staff.getCreatedAt());
         return dto;
      });

      return new ApiResponse<>(
         "Staff list fetched successfully",
         staffDTOPage,
         HttpStatus.OK.value(),
         true
      );
   }
   
}
