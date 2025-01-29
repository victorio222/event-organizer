package com.example.demo.Repository;

import com.example.demo.Model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
//    @Query("SELECT n FROM Notification n WHERE n.eventID.organizer.userID = :userID")
//    List<Notification> findByEventID_EventID(Long eventId);


    @Query("SELECT n FROM Notification n WHERE n.eventID.eventID = :eventID AND n.eventID.organizer.userID = :userID")
    List<Notification> findByEventIDAndUserID(@Param("eventID") Long eventID, @Param("userID") Long userID);

    @Query("SELECT n FROM Notification n WHERE n.eventID.organizer.userID = :userID")
    List<Notification> findByUserID(Long userID);

}
