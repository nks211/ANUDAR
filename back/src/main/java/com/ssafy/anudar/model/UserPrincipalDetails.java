package com.ssafy.anudar.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Getter
@AllArgsConstructor
public class UserPrincipalDetails implements UserDetails {

    private Long id;
    private String username;
    private String password;
    private UserRole userRole;
    private String name;
    private String nickname;
    private String email;
    private String image;
    private String phone;

    public static UserPrincipalDetails fromEntity(User user) {
        return new UserPrincipalDetails(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getRole(),
                user.getName(),
                user.getNickname(),
                user.getEmail(),
                user.getImage(),
                user.getPhone()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.getUserRole().name()));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
