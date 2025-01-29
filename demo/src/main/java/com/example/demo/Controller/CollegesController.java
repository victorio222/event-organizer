package com.example.demo.Controller;

import com.example.demo.Model.Colleges;
import com.example.demo.Model.Event;
import com.example.demo.Service.CollegesService;
import com.example.demo.Service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colleges")
public class CollegesController {
    private final CollegesService collegesService;

    public CollegesController(CollegesService collegesService) {
        this.collegesService = collegesService;
    }

    @GetMapping
    public List<Colleges> getAllEvents() {
        return collegesService.getAllColleges();
    }

    @PostMapping("/add")
    public ResponseEntity<Colleges> addCollege(@RequestBody Colleges colleges) {
        Colleges newCollege = collegesService.addCollege(colleges);
        return ResponseEntity.ok(newCollege);
    }
}
