// import { Box, Typography, Grid, Avatar, Button, Container, Divider, Paper } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import Header from 'components/sections/user/header/header';
// import Footer from 'components/sections/user/footer/footer';
// import AvatarImage from 'assets/images/profile.png';

// const Profile = () => {
//   const navigate = useNavigate();

//   const handleEditProfile = () => {
//     navigate('/profile/edit');
//   };

//   return (
//     <Box sx={{ m: -3.5, mt: -4 }}>
//       {/* Navbar */}
//       <Header />

//       {/* Main Content */}
//       <Container sx={{ mt: 8, py: 6, textAlign: 'center', maxWidth: 'lg' }}>
//         <Typography variant="h3" fontWeight="bold" sx={{ color: '#2C3E50', letterSpacing: '1px', textAlign: 'center' }}>
//           User Profile
//         </Typography>

//         {/* Profile Section */}
//         <Grid container justifyContent="center" spacing={4}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={6} sx={{ p: 4, borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
//               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <Avatar alt="User Profile" src={AvatarImage} sx={{ width: 130, height: 130, border: '4px solid #BDC3C7', boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)' }} />
//               </Box>
//               <Typography variant="h5" sx={{ mt: 2, color: '#34495E', fontWeight: '500' }}>
//                 John Doe
//               </Typography>
//               <Typography variant="body1" color="text.secondary" sx={{ fontSize: '16px', fontWeight: '400', color: '#7F8C8D' }}>
//                 johndoe@example.com
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>

//         <Divider sx={{ mt: 4, width: '60%', mx: 'auto', borderColor: '#BDC3C7', borderWidth: 1 }} />

//         {/* Profile Details */}
//         <Box sx={{ mt: 6 }}>
//           <Typography variant="h5" sx={{ color: '#34495E', fontWeight: '500', textAlign: 'center', textTransform: 'uppercase' }}>
//             Profile Details
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mt: 2, fontSize: '16px', maxWidth: '800px', mx: 'auto', lineHeight: 1.8, color: '#7F8C8D' }}>
//             Update your personal details, manage your preferences, or explore other settings. Our goal is to provide a seamless user experience tailored to your needs.
//           </Typography>

//           {/* Edit Profile Button */}
//           <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
//             <Button onClick={handleEditProfile} variant="contained" color="primary" sx={{ fontSize: '1rem', padding: '12px 24px', borderRadius: '20px', textTransform: 'none', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
//               Edit Profile
//             </Button>
//           </Box>
//         </Box>
//       </Container>

//       {/* Footer */}
//       <Footer />
//     </Box>
//   );
// };

// export default Profile;














import { Box, Typography, Grid, Avatar, Button, Container, Divider, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import Header from 'components/sections/user/header/header';
import Footer from 'components/sections/user/footer/footer';
import AvatarImage from 'assets/images/profile.png';

const Profile = () => {
  const [open, setOpen] = useState(false);  // Modal open state
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [profilePicture, setProfilePicture] = useState(AvatarImage);

  const handleEditProfile = () => {
    setOpen(true);  // Open the modal when "Edit Profile" is clicked
  };

  const handleCloseModal = () => {
    setOpen(false);  // Close the modal
  };

  const handleSaveProfile = () => {
    // You can add save functionality here, such as API calls to update the user's profile.
    setOpen(false);  // Close the modal after saving
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
                <Avatar alt="User Profile" src={profilePicture} sx={{ width: 130, height: 130, border: '4px solid #BDC3C7', boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)' }} />
              </Box>
              <Typography variant="h5" sx={{ mt: 2, color: '#34495E', fontWeight: '500' }}>
                {name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '16px', fontWeight: '400', color: '#7F8C8D' }}>
                {email}
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
            Update your personal details, manage your preferences, or explore other settings. Our goal is to provide a seamless user experience tailored to your needs.
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
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Profile Picture URL"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
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
