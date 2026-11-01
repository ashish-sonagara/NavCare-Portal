package com.navcare.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.navcare.model.Admin;

@Repository 
public interface AdminDAO extends JpaRepository<Admin , Long>{

    Optional<Admin> findByUserName(String userName);
    Optional<Admin> findByPhoneNumber(String phoneNumber);
    Optional<Admin> findByEmail(String email);
    
}
