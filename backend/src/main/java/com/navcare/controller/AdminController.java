package com.navcare.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.navcare.dto.ApiResponse;
import com.navcare.dto.StaffDTO;
import com.navcare.dto.UserDTO;
// import com.navcare.model.Staff;
import com.navcare.service.AdminService;

import jakarta.validation.Valid;

@CrossOrigin 
@RestController 
@RequestMapping("/admin")
public class AdminController {
    
    @Autowired 
    private AdminService adminService; 

    @GetMapping("/staff/{staffID}")
    public ResponseEntity<ApiResponse<UserDTO>> getStaffById(@PathVariable(required = true) Integer staffID) {
        ApiResponse<UserDTO> response = adminService.getStaffById(staffID);
        return ResponseEntity.status(response.getHttpCode()).body(response);
    }

    @PostMapping("staff/addStaff")
    public ResponseEntity<ApiResponse<Void>> createStaff(@Valid @RequestBody StaffDTO staff) {
        ApiResponse<Void> response = adminService.createStaff(staff);
        return ResponseEntity.status(response.getHttpCode()).body(response);
    }

    @GetMapping("/staff/staffList")
    public ResponseEntity<ApiResponse<Page<StaffDTO>>> fetchAllStaffs(
        @RequestParam(defaultValue = "0") Integer pageNo,
        @RequestParam(defaultValue = "10") Integer pageSize,
        @RequestParam(required = false) String searchText
    ) {
        ApiResponse<Page<StaffDTO>> response = adminService.fetchAllStaffs(pageNo, pageSize, searchText);
        return ResponseEntity.status(response.getHttpCode()).body(response);
    }


}
