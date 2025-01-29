package com.example.demo.Service;

import com.example.demo.Model.Event;
import com.example.demo.Repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public List<Event> getEventsByOrganizer(Long organizerID) {
        return eventRepository.findByOrganizer_UserID(organizerID);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        return eventRepository.findById(id).map(event -> {
            event.setTitle(updatedEvent.getTitle());
            event.setDescription(updatedEvent.getDescription());
            event.setStartDate(updatedEvent.getStartDate());
            event.setEndDate(updatedEvent.getEndDate());
            event.setLocation(updatedEvent.getLocation());
            event.setOrganizer(updatedEvent.getOrganizer());
            return eventRepository.save(event);
        }).orElseThrow(() -> new IllegalArgumentException("Event not found with ID: " + id));
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    // Approve an event
    public Event approveEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        event.setStatus(Event.Status.Approved); // Set the status to Approved
        return eventRepository.save(event); // Save the updated event
    }

    // Decline an event
    public Event declineEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        event.setStatus(Event.Status.Declined); // Set the status to Declined
        return eventRepository.save(event); // Save the updated event
    }

    // Cancel an event
    public Event cancelEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        event.setStatus(Event.Status.Cancelled); // Set the status to Declined
        return eventRepository.save(event); // Save the updated event
    }
}
