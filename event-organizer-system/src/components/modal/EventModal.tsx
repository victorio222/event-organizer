// src/components/sections/dashboard/events/EditEventModal.tsx
import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface EditEventModalProps {
  open: boolean;
  onClose: () => void;
  eventId?: number; // optional eventId prop if needed for editing specific event
}

const EventModal = ({ open, onClose, eventId }: EditEventModalProps) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
  });

  useEffect(() => {
    if (eventId) {
      // Fetch event details using eventId (e.g., from an API)
      fetch(`http://localhost:8080/api/events/${eventId}`)
        .then((response) => response.json())
        .then((data) => setEventData(data))
        .catch((error) => console.error('Error fetching event data:', error));
    }
  }, [eventId]);

  const handleSave = () => {
    // Handle save logic (e.g., send updated data to backend)
    console.log('Saving event data:', eventData);
    onClose(); // Close modal after saving
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Event Name"
          value={eventData.title}
          onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
        />
        <TextField
          fullWidth
          label="Description"
          value={eventData.description}
          onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
          multiline
          rows={4}
          sx={{ marginTop: 2 }}
        />
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={eventData.startDate}
          onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
          sx={{ marginTop: 2 }}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={eventData.endDate}
          onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
          sx={{ marginTop: 2 }}
        />
        <TextField
          fullWidth
          label="Location"
          value={eventData.location}
          onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
          sx={{ marginTop: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
