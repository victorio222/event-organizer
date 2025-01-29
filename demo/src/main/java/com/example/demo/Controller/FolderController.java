package com.example.demo.Controller;

import com.example.demo.Model.Folder;
import com.example.demo.Service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/folders")
public class FolderController {

    @Autowired
    private FolderService folderService;

    @PostMapping("/create")
    public Folder createFolder(@RequestParam String name) {
        return folderService.createFolder(name);
    }

    @GetMapping
    public List<Folder> getAllFolders() {
        return folderService.getAllFolders();
    }

    @GetMapping("/{id}")
    public Folder getFolderById(@PathVariable Long id) {
        return folderService.getFolderById(id);
    }
}
