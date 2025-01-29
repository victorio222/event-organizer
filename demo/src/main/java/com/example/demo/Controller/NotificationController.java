package com.example.demo.Controller;

import com.example.demo.Model.Event;
import com.example.demo.Model.Notification;
import com.example.demo.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/notification")
public class NotificationController {
    @Autowired
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<Notification> getAllNotification() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable Long id) {
        return notificationService.getNotificationByID(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//    @GetMapping("/event/{eventId}")
//    public List<Notification> getNotificationsByEventId(@PathVariable Long eventId) {
//        return notificationService.getNotificationsByEventId(eventId);
//    }

    @GetMapping("/event")
    public List<Notification> getNotificationsByEventAndUser(@RequestParam Long eventId, @RequestParam Long userID) {
        return notificationService.getNotificationsByEventAndUser(eventId, userID);
    }

    @GetMapping("/event/{userID}")
    public List<Notification> getNotificationsByUser(@PathVariable Long userID) {
        return notificationService.getNotificationsByUser(userID);
    }

//    public List<Notification> getNotificationsByEventAndUser(
//            @RequestParam Long eventID,
//            @RequestParam Long userID) {
//        return notificationService.getNotificationsByEventAndUser(eventID, userID);
//    }

    @PostMapping("/{id}/add")
    public ResponseEntity<Notification> newNotification(@RequestBody Notification notification) {
        Notification newNotification = notificationService.newNotification(
                notification.getNotificationDescription(), notification.getStatus(), notification.getEventID().getEventID()
        );
        return ResponseEntity.ok(newNotification);
    }
}
