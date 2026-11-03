package com.navcare.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.Data;

@Entity 
@Data
@Table (name = "admins")
public class Admin {
    
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)    
    private Integer adminID;

    @Column(nullable = false)
    private String name;

    @Column (nullable = false , unique = true)
    private String userName;

    @Column (nullable = false, unique = true)
    private String phoneNumber;

    @Column (nullable = false, unique = true)
    private String email;

    @Column (nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.ADMIN;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Staff> staffList;

    @JsonFormat(pattern = "dd/MM/yyyy hh:mm")
    @Column (nullable = false)
    private Date createdAt;
}
