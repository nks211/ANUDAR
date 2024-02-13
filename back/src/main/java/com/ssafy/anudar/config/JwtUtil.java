package com.ssafy.anudar.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

@Slf4j
public class JwtUtil {

    public static String getUsername(String token, String key) {
        return extrectClaims(token, key).get("username", String.class);
    }

    public static boolean isExpired(String token,String key) {
        Date expiredDate = extrectClaims(token, key).getExpiration();
        return expiredDate.before(new Date());
    }

    private static Claims extrectClaims(String token, String secret) {
        return Jwts.parser().setSigningKey(secret)
                .parseClaimsJws(token).getBody();
    }

    public static String generateToken(String username, String secret, long expiredTimeMs){
        Claims claims = Jwts.claims();
        claims.put("username",username);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredTimeMs))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

}
