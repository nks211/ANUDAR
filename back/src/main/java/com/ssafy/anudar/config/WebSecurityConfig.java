package com.ssafy.anudar.config;

import com.ssafy.anudar.config.filter.JwtTokenFilter;
import com.ssafy.anudar.config.filter.CustomAuthenticationEntryPoint;
import com.ssafy.anudar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {


    private final UserService userService;

    @Value("${jwt.secret}")
    private String key;

    @Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers("/user/login")
                .requestMatchers("/user/join")
                .requestMatchers("/user/img")
                .requestMatchers("/sessions/**")
                .requestMatchers("/ws/**")
                .requestMatchers("/user/authors")
                .requestMatchers("/user/info/author/**")
                .requestMatchers("/work/infos/**")
                .requestMatchers("/exhibit/list/**")
                .requestMatchers("/exhibit/{exhibition_id}/comments-list")
                .requestMatchers("/work/infos/**")
                .requestMatchers("/work/exhibit/**")
                .requestMatchers("/work/user/**")
                .requestMatchers("/work")
                .requestMatchers("/work/like/count/**")
                .requestMatchers("/auction/works")
                .requestMatchers("/user/username")
                .requestMatchers("/user/nickname")
                .requestMatchers("/exhibit/docent/**")
                .requestMatchers("/exhibit/*/author")
                ;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable);

        http
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/user/join").permitAll()
                        .requestMatchers("/user/login").permitAll()
                        .requestMatchers("/user/img").permitAll()
                        .anyRequest().authenticated()
                );

        http
                .addFilterBefore(new JwtTokenFilter(key, userService), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(new CustomAuthenticationEntryPoint()));

        return http.build();
    }
}
