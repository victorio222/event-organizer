package com.example.demo.Repository;

import com.example.demo.Model.Folder;
import com.example.demo.Model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    // Custom queries can be added if needed
    Optional<Folder> findByName(String name);
    List<Folder> findAll();
}
