import { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Avatar, Button, Container, Divider, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Header from 'components/sections/user/header/header';
import Footer from 'components/sections/user/footer/footer';
import AvatarImage from 'assets/images/profile.png';
import { useUserContext } from 'contexts/UserContext';
import Swal from 'sweetalert2';

const Profile = () => {
  const [open, setOpen] = useState(false);  // Modal open state
  const [firstName, setFirstName] = useState('');  // State for Name
  const [lastName, setLastName] = useState('');  // State for Name
  const [email, setEmail] = useState('');  // State for Email
  const [phoneNumber, setPhoneNumber] = useState('');  // State for Phone Number
  const { user, setUser } = useUserContext();  // Assuming you have a context to manage the user data

  const handleEditProfile = () => {
    setOpen(true);  // Open the modal when "Edit Profile" is clicked
    setFirstName(user.firstName || "");  // Pre-fill form with current data
    setLastName(user.lastName || "");
    setEmail(user.email || "");
    setPhoneNumber(user.phoneNumber || "");
  };

  const handleCloseModal = () => {
    setOpen(false);  // Close the modal
  };

  const handleSaveProfile = async () => {
    try {
      const updatedUser = {
        firstName,
        lastName,
        email,
        phoneNumber,
      };
      
    setOpen(false); 

      // Update the backend with the new data
      await axios.put(`http://localhost:8080/api/user/${user.userID}/update`, updatedUser);

      // If successful, update the context or state to reflect changes immediately
      setUser({ ...user, ...updatedUser });

      const successMessage = 'Your account has been updated!';
      
      // Use SweetAlert2 for success alert
      Swal.fire({
        title: 'Success',
        text: successMessage,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        setOpen(false);  // Close the modal after saving
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile');
    }
  };

  return (
    <Box sx={{ m: -3.5, mt: -4 }}>
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <Container sx={{ mt: 8, py: 6, textAlign: 'center', maxWidth: 'lg' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: '#2C3E50', letterSpacing: '1px', textAlign: 'center' }}>
          User Profile
        </Typography>

        {/* Profile Section */}
        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar alt="User Profile" src={AvatarImage} sx={{ width: 130, height: 130, border: '4px solid #BDC3C7', boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)' }} />
              </Box>
              <Typography variant="h5" sx={{ mt: 2, color: '#34495E', fontWeight: '500' }}>
                {user.firstName + ' ' + user.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '16px', fontWeight: '400', color: '#7F8C8D' }}>
                email: {user.email}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, width: '60%', mx: 'auto', borderColor: '#BDC3C7', borderWidth: 1 }} />

        {/* Profile Details */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ color: '#34495E', fontWeight: '500', textAlign: 'center', textTransform: 'uppercase' }}>
            Profile Details
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, fontSize: '16px', maxWidth: '800px', mx: 'auto', lineHeight: 1.8, color: '#7F8C8D' }}>
          Keep your profile up-to-date by editing your personal details and contact information. This ensures a personalized and seamless experience tailored just for you.
          </Typography>

          {/* Edit Profile Button */}
          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleEditProfile} variant="contained" color="primary" sx={{ fontSize: '1rem', padding: '12px 24px', borderRadius: '20px', textTransform: 'none', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Profile Edit Modal */}
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent sx={{ minWidth: '300px' }}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: '100%', padding: '12px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: '100%', padding: '12px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: '100%', padding: '12px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Profile;
