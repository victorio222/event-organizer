package com.example.demo.Controller;

import com.example.demo.Model.Photo;
import com.example.demo.Service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    @GetMapping
    public List<Photo> getAllPhotos() {
        return photoService.getAllPhotos();
    }

    // Get all photos for a specific folder
    @GetMapping("/folder/{folderId}")
    public List<Photo> getPhotosForFolder(@PathVariable Long folderId) {
        return photoService.getPhotosForFolder(folderId);
    }

    // Upload a new photo to a folder
    @PostMapping("/upload/{folderId}")
    public ResponseEntity<Photo> uploadPhoto(@PathVariable Long folderId, @RequestParam("file") MultipartFile file) {
        try {
            Photo uploadedPhoto = photoService.uploadPhoto(folderId, file);
            return new ResponseEntity<>(uploadedPhoto, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete a photo from a folder
    @DeleteMapping("/{photoId}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long photoId) {
        try {
            photoService.deletePhoto(photoId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    @GetMapping("/{photoId}")
//    public ResponseEntity<byte[]> getPhoto(@PathVariable Long photoId) {
//        try {
//            byte[] content = photoService.getPhoto(photoId);
//            return ResponseEntity.ok(content); // Returns the image bytes with a 200 OK status
//        } catch (IOException e) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found", e);
//        }
//    }

    @GetMapping("/{fileName}")
    public ResponseEntity<byte[]> getPhoto(@PathVariable String fileName) {
        try {
            byte[] content = photoService.getPhoto(fileName);
            return ResponseEntity.ok(content);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found", e);
        }
    }
}
