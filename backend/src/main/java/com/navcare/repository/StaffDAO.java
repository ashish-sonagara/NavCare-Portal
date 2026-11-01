package com.navcare.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.navcare.model.Staff;

@Repository 
public interface StaffDAO extends JpaRepository<Staff, Long> {
    
    Optional<Staff> findByUserName(String userName);

}   
