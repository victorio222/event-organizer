package com.example.demo.Repository;

import com.example.demo.Model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findByFolderId(Long folderId);
//    void deleteByPhotoId(Long id);
}
