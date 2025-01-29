package com.example.demo.Controller;

import com.example.demo.Model.Event;
import com.example.demo.Service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/organizer/{organizerID}")
    public List<Event> getEventsByOrganizer(@PathVariable Long organizerID) {
        return eventService.getEventsByOrganizer(organizerID);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = eventService.createEvent(event);
        return ResponseEntity.ok(createdEvent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        try {
            Event event = eventService.updateEvent(id, updatedEvent);
            return ResponseEntity.ok(event);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    // Approve event by ID
    @PutMapping("/{id}/approve")
    public ResponseEntity<Event> approveEvent(@PathVariable Long id) {
        try {
            Event event = eventService.getEventById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Event not found"));

            event.approveEvent(); // Set status to Approved
            eventService.updateEvent(id, event); // Save the updated event
            return ResponseEntity.ok(event);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Decline event by ID
    @PutMapping("/{id}/decline")
    public ResponseEntity<Event> declineEvent(@PathVariable Long id) {
        try {
            Event event = eventService.getEventById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Event not found"));

            event.declineEvent(); // Set status to Declined
            eventService.updateEvent(id, event); // Save the updated event
            return ResponseEntity.ok(event);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Cancel event by ID
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Event> cancelEvent(@PathVariable Long id) {
        try {
            Event event = eventService.getEventById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Event not found"));

            event.cancelEvent(); // Set status to Declined
            eventService.updateEvent(id, event); // Save the updated event
            return ResponseEntity.ok(event);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
