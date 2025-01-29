package com.example.demo.Repository;

import com.example.demo.Model.Colleges;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CollegesRepository extends JpaRepository<Colleges, Long> {
    Optional<Colleges> findByDepartmentID(Long departmentID);
}
