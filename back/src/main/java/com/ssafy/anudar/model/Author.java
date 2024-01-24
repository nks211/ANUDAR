package com.ssafy.anudar.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("AUTHOR")
public class Author extends User{
    // Author에 특화된 필드나 메소드
}
