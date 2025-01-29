package com.example.demo.Service;

import com.example.demo.Model.Folder;
import com.example.demo.Repository.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService {

    @Autowired
    private FolderRepository folderRepository;

    // Create a folder
    public Folder createFolder(String name) {
        Folder folder = new Folder();
        folder.setName(name);
        return folderRepository.save(folder);
    }

    // Get all folders
    public List<Folder> getAllFolders() {
        return folderRepository.findAll();
    }

    // Get folder by id
    public Folder getFolderById(Long id) {
        return folderRepository.findById(id).orElse(null);
    }
}
