package com.matchup.model;

import com.matchup.model.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class VerificationCode {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", updatable = false)
    private String code;

    @Column(name = "expiration_date", nullable = false, updatable = false)
    private LocalDateTime expirationDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // <editor-fold desc="Constructors">

    public VerificationCode() {}

    public VerificationCode(String code, LocalDateTime expirationDate, User user) {
        this.code = code;
        this.expirationDate = expirationDate;
        this.user = user;
    }

    public VerificationCode(String code, LocalDateTime expirationDate) {
        this.code = code;
        this.expirationDate = expirationDate;
    }

    // </editor-fold>

    // <editor-fold desc="Encapsulation">

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String verificationCode) {
        this.code = verificationCode;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    // </editor-fold>

}
