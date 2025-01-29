package com.example.demo.Repository;

import com.example.demo.Model.Event;
import com.example.demo.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByOrganizer_UserID(Long organizerID);
    List<Event> findByStatus(Event.Status status);
}
