package com.navcare.repository;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.navcare.model.Staff;

@Repository 
public interface StaffDAO extends JpaRepository<Staff, Integer> {
    
    Optional<Staff> findByUserName(String userName);
    Optional<Staff> findByPhoneNumber(String phoneNumber);
    Optional<Staff> findByEmail(String email);

    @Query("""
        SELECT s FROM Staff s
        WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :searchText, '%'))
           OR LOWER(s.userName) LIKE LOWER(CONCAT('%', :searchText, '%'))
        """)
    Page<Staff> searchStaffs(@Param("searchText") String searchText, Pageable pageable);
}
