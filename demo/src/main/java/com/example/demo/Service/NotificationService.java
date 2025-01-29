package com.example.demo.Service;

import com.example.demo.Model.Colleges;
import com.example.demo.Model.Event;
import com.example.demo.Model.Notification;
import com.example.demo.Model.User;
import com.example.demo.Repository.EventRepository;
import com.example.demo.Repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final EventRepository eventRepository;

    public NotificationService(NotificationRepository notificationRepository, EventRepository eventRepository) {
        this.notificationRepository = notificationRepository;
        this.eventRepository = eventRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> getNotificationByID(Long id) {
        return notificationRepository.findById(id);
    }

    public List<Notification> getNotificationsByEventAndUser(Long eventID, Long userID) {
        return notificationRepository.findByEventIDAndUserID(eventID, userID);
    }

    public List<Notification> getNotificationsByUser(Long userID) {
        return notificationRepository.findByUserID(userID);
    }

//    public List<Notification> getNotificationsByEventId(Long eventId) {
//        return notificationRepository.findByEventID_EventID(eventId);
//    }


    public Notification newNotification(String notificationDescription, String status, Long eventID) {
        Event event = eventRepository.findById(eventID)
                .orElseThrow(() -> new RuntimeException("Events not found"));

        Notification notification = new Notification();
        notification.setNotificationDescription(notificationDescription);
        notification.setStatus(status);
        notification.setDateCreated(LocalDateTime.now());
        notification.setEventID(event);
        return notificationRepository.save(notification);
    }
}
