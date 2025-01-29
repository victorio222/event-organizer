package com.example.demo.Service;

import com.example.demo.Model.Colleges;
import com.example.demo.Model.Event;
import com.example.demo.Repository.CollegesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollegesService {
    private final CollegesRepository collegesRepository;

    public CollegesService(CollegesRepository collegesRepository) {
        this.collegesRepository = collegesRepository;
    }

    public List<Colleges> getAllColleges() {
        return collegesRepository.findAll();
    }

    public Colleges addCollege(Colleges colleges) {
        return collegesRepository.save(colleges);
    }
}
