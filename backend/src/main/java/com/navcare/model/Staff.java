package com.navcare.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

@Entity 
@Table (name = "staff")
@Data 
public class Staff {
    
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer staffID;

    @Column (nullable = false)
    private String name;

    @Column (nullable = false, unique = true)
    private String userName;

    @Column (nullable = false, unique = true)
    private String phoneNumber;

    @Column (nullable = false, unique = true)
    private String email;

    @Column (nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.STAFF;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    private Admin admin;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    @Column (nullable = false)
    private Date createdAt;

}
