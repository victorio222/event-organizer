import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { useUserContext } from 'contexts/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminAccountSettings: React.FC = () => {
  const { user, setUser } = useUserContext(); // Destructure setUser from context

  // Set initial state values based on user data
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Update local state if user context changes
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setEmail(user.email || '');
  }, [user]); // This will run whenever the user context changes

  // Handle personal information update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentTimestamp = new Date().toISOString();

    try {
      const updatedUserData = {
        firstName,
        lastName,
        email,
        updatedAt: currentTimestamp,  // Add updatedAt timestamp
      };

      // Update user data in the backend
      await axios.put(`http://localhost:8080/api/user/${user.userID}/update`, updatedUserData);

      const successMessage = 'Account Information has been updated!';

      // Use SweetAlert2 for success alert
      Swal.fire({
        title: 'Success',
        text: successMessage,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Update the context state using setUser to reflect the changes globally
        setUser({
          ...user, // Keep the existing properties
          firstName, // Update the first name
          lastName, // Update the last name
          email, // Update the email
        });
      });

    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account');
    }
  };

  // Handle password update
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword || password !== user.password) {
      Swal.fire({
        title: 'Error',
        text: 'Passwords do not match or current password is incorrect',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else if (newPassword === confirmPassword && password === user.password) {
      const currentTimestamp = new Date().toISOString();

      try {
        // Hash the new password before sending it to the server
        // const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds

        const updatedUserPassword = {
          password: newPassword,
          updatedAt: currentTimestamp,  // Add updatedAt timestamp
        };

        // Make the API request with the hashed password
        await axios.put(`http://localhost:8080/api/user/${user.userID}/updatePassword`, updatedUserPassword);

        const successMessage = 'Password has been changed!';

        Swal.fire({
          title: 'Success',
          text: successMessage,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          setPassword('');
          setNewPassword('');
          setConfirmPassword('');
        });

      } catch (error) {
        console.error('Error updating password:', error);
        alert('Failed to update password');
      }
    }
    else if (password === null && confirmPassword === null && newPassword === null) {
      Swal.fire({
        title: 'Error',
        text: 'Please input all the fields!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {/* Personal Information */}
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3, boxShadow: 1 }}>
          <form onSubmit={handleUpdate}>
            <Typography variant="h4" mb={2}>
              Personal Information
            </Typography>
            <Grid sx={{ display: 'flex', alignItems: 'center', marginTop: -1 }}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px',
                  margin: '8px 0',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  marginRight: 9,
                  transition: 'border-color 0.3s ease', // Smooth transition
                }}
                onFocus={(e) => e.target.style.borderColor = '#3f51b5'} // Change border color on focus
                onBlur={(e) => e.target.style.borderColor = '#ccc'} // Revert to default border color
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px',
                  margin: '8px 0',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3f51b5'}
                onBlur={(e) => e.target.style.borderColor = '#ccc'}
              />
            </Grid>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                margin: '8px 0',
                border: '1px solid #ccc',
                borderRadius: '10px',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3f51b5'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
            <Grid sx={{ display: 'flex', justifyContent: 'right' }}>
              <Button variant="contained" sx={{ mt: 1 }} type="submit">
                Save Changes
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>

      {/* Security Settings */}
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3,boxShadow: 1 }}>
          <form onSubmit={handleUpdatePassword}>
            <Typography variant="h4" mb={2}>
              Security Settings
            </Typography>
            <input
              type="password"
              placeholder="Current Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                margin: '8px 0',
                border: '1px solid #ccc',
                borderRadius: '10px',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3f51b5'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                margin: '8px 0',
                border: '1px solid #ccc',
                borderRadius: '10px',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3f51b5'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                margin: '8px 0',
                border: '1px solid #ccc',
                borderRadius: '10px',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3f51b5'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
            <Grid sx={{ display: 'flex', justifyContent: 'right' }}>
              <Button variant="contained" type="submit" color="primary" sx={{ mt: 2 }}>
                Update Password
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminAccountSettings;
