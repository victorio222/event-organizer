//package com.example.demo.Service;
//
//import com.example.demo.Model.Photo;
//import com.example.demo.Repository.PhotoRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.server.ResponseStatusException;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardCopyOption;
//import java.text.SimpleDateFormat;
//import java.util.*;
//
//@Service
//public class PhotoService {
//    public PhotoService(PhotoRepository photoRepository) {
//        this.photoRepository = photoRepository;
//    }
//
//    @Autowired
//    private final PhotoRepository photoRepository;
//
//    @Value("${photo.upload.dir}")
//    private String uploadDir;
//
//    // Method to get all photos
//    public List<Photo> getAllPhotos() {
//        File folder = new File(uploadDir);
//        File[] listOfFiles = folder.listFiles((dir, name) -> name.endsWith(".jpg") || name.endsWith(".png") || name.endsWith(".jpeg"));
//
//        if (listOfFiles == null || listOfFiles.length == 0) {
//            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No photos found");
//        }
//
//        List<Photo> photos = new ArrayList<>();
//        for (File file : listOfFiles) {
//            Photo photo = new Photo();
//            photo.setFileName(file.getName());
//            photo.setFilePath(file.getPath());
//            photo.setUploadDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(file.lastModified())));
//            photo.setUrl("/api/photos/" + file.getName());
//            photos.add(photo);
//        }
//        return photoRepository.findAll();
//    }
//
//    // Method to upload a photo
//    public Photo uploadPhoto(MultipartFile file) throws IOException {
//        // Ensure the directory exists
//        File uploadDirectory = new File(uploadDir);
//        if (!uploadDirectory.exists()) {
//            uploadDirectory.mkdirs(); // Create the directory if it doesn't exist
//        }
//
//        if (file.isEmpty()) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is empty");
//        }
//
//        Path path = Paths.get(uploadDir, file.getOriginalFilename());
//        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
//
//        Photo photo = new Photo();
//        photo.setFileName(file.getOriginalFilename());
//        photo.setFilePath(path.toString());
//        photo.setUploadDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
//        photo.setUrl("/api/photos/" + file.getOriginalFilename());
//
//        return photoRepository.save(photo);
//    }
//
//    // Method to serve a photo by its file name
//    public byte[] getPhoto(String fileName) throws IOException {
//        Path path = Paths.get(uploadDir, fileName);
//        return Files.readAllBytes(path);
//    }
//
//    public void deletePhoto(Long id) throws IOException {
//        Optional<Photo> photoOptional = photoRepository.findById(id);
//        if (photoOptional.isPresent()) {
//            Photo photo = photoOptional.get();
//            Path filePath = Paths.get(photo.getFilePath());
//            Files.deleteIfExists(filePath); // Delete the file from disk
//            photoRepository.delete(photo); // Delete from the database
//        }
//    }
//}




package com.example.demo.Service;

import com.example.demo.Model.Folder;
import com.example.demo.Model.Photo;
import com.example.demo.Repository.FolderRepository;
import com.example.demo.Repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PhotoService {

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Value("${photo.upload.dir}")
    private String uploadDir;

    public List<Photo> getAllPhotos() {
        File folder = new File(uploadDir);

        File[] listOfFiles = folder.listFiles((dir, name) -> name.endsWith(".jpg") || name.endsWith(".png") || name.endsWith(".jpeg"));

        if (listOfFiles == null || listOfFiles.length == 0) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No photos found");
        }

        List<Photo> photos = new ArrayList<>();
        for (File file : listOfFiles) {
            Photo photo = new Photo();
            photo.setFileName(file.getName());
            photo.setFilePath(file.getPath());
            photo.setUploadDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(file.lastModified())));
            photo.setUrl("/api/photos/" + file.getName());
            photos.add(photo);
        }

        return photoRepository.findAll();
    }

    // Fetch all photos for a specific folder
    public List<Photo> getPhotosForFolder(Long folderId) {
        File folder = new File(uploadDir);

        File[] listOfFiles = folder.listFiles((dir, name) -> name.endsWith(".jpg") || name.endsWith(".png") || name.endsWith(".jpeg"));

        if (listOfFiles == null || listOfFiles.length == 0) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No photos found");
        }

        List<Photo> photos = new ArrayList<>();
        for (File file : listOfFiles) {
            Photo photo = new Photo();
            photo.setFileName(file.getName());
            photo.setFilePath(file.getPath());
            photo.setUploadDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(file.lastModified())));
            photo.setUrl("/api/photos/" + file.getName());
            photos.add(photo);
        }

        return photoRepository.findByFolderId(folderId);
    }

    // Add a new photo to a folder
    public Photo uploadPhoto(Long folderId, MultipartFile file) throws IOException {
        Folder folder = folderRepository.findById(folderId).orElseThrow(() -> new RuntimeException("Folder not found"));

        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs(); // Create the directory if it doesn't exist
        }

        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is empty");
        }

        Path path = Paths.get(uploadDir, file.getOriginalFilename());
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        Photo photo = new Photo();
        photo.setFileName(file.getOriginalFilename());
        photo.setFilePath(path.toString());
        photo.setUploadDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        photo.setUrl("/api/photos/" + file.getOriginalFilename());
        photo.setFolder(folder);

        return photoRepository.save(photo);
    }


    // Method to serve a photo by its file name
    public byte[] getPhoto(String fileName) throws IOException {
        Path path = Paths.get(uploadDir, fileName);
        return Files.readAllBytes(path);
    }

    // Delete a photo from a folder
    public void deletePhoto(Long id) {
        photoRepository.deleteById(id);
    }
}
