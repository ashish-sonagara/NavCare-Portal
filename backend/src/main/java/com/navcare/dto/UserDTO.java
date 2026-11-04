package com.navcare.dto;

import com.navcare.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Integer userID;
    private String name;
    private String userName;
    private String phoneNumber;
    private String email;
    private Role role;
}
