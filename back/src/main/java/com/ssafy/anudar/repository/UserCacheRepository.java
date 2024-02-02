package com.ssafy.anudar.repository;

import com.ssafy.anudar.model.UserPrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserCacheRepository {

    private final RedisTemplate<String, UserPrincipalDetails> redisTemplate;
    private final static Duration USER_CACHE_TTL = Duration.ofDays(3);

    public void setUser(UserPrincipalDetails user) {
        redisTemplate.opsForValue().set(getKey(user.getUsername()),user, USER_CACHE_TTL);
    }

    public Optional<UserPrincipalDetails> getUser(String username) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(getKey(username)));
    }

    private String getKey(String username) {
        return "USER:"+username;
    }
}
