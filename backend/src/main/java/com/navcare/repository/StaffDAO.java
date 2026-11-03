package com.navcare.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.navcare.model.Staff;

@Repository 
public interface StaffDAO extends JpaRepository<Staff, Integer> {
    
    Optional<Staff> findByUserName(String userName);
    Optional<Staff> findByPhoneNumber(String phoneNumber);
    Optional<Staff> findByEmail(String email);

}   
