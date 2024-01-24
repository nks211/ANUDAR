package com.ssafy.anudar.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("BUYER")
public class Buyer extends User {
    // Buyer에 특화된 필드나 메소드...
}
