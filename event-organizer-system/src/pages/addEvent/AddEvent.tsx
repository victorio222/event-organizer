import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import axios from 'axios';
import { useUserContext } from 'contexts/UserContext';
import Swal from 'sweetalert2';

const AddEvent = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();

  console.log(user)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const currentTimestamp = new Date().toISOString();

    if (
      title === '' &&
      description === '' &&
      startDate === '' &&
      endDate === '' &&
      location === ''
    ) {
      alert('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const eventData = {
        title,
        description,
        startDate,
        endDate,
        location,
        organizer: {
          userID: user.userID,  // Assign the user's ID as the organizer
        },
        createdAt: currentTimestamp,  // Add createdAt timestamp
        updatedAt: currentTimestamp,  // Add updatedAt timestamp
      };

      await axios.post(`http://localhost:8080/api/events/${user.userID}}`, eventData);
      console.log(`http://localhost:8080/api/events/${user.userID}`);

      const successMessage = 'Event has been added successfully!';

      // Use SweetAlert2 for success alert
      Swal.fire({
        title: 'Success',
        text: successMessage,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {

        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setLocation('');
      });

    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={12} lg={12}>
        <Box
          sx={{
            padding: '20px',
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#fff',
            width: '100%',
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Add New Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Event Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: 56,
                      border: 'none',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: 56,
                      border: 'none',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    '& .MuiInputBase-root': {
                      border: 'none',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="datetime-local"
                  variant="outlined"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: 56,
                      border: 'none',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="datetime-local"
                  variant="outlined"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: 56,
                      border: 'none',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  sx={{ alignSelf: 'center' }}
                >
                  {loading ? 'Creating...' : 'Create Event'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddEvent;
