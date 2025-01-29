package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "colleges")
public class Colleges {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long departmentID;

    @Column(nullable = false, length = 100)
    private String departmentName;

    public Long getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(Long departmentID) {
        this.departmentID = departmentID;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}
