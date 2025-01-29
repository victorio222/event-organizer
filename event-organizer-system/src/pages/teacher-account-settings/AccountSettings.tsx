// import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';

const AdminAccountSettings = () => {
  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {/* Personal Information */}
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            Personal Information
          </Typography>
          <TextField label="Full Name" variant="outlined" fullWidth margin="normal" defaultValue="Admin Name" />
          <TextField label="Email Address" variant="outlined" fullWidth margin="normal" defaultValue="admin@university.edu" />
          <TextField label="Role" variant="outlined" fullWidth margin="normal" value="Administrator" InputProps={{ readOnly: true }} />
          <Button variant="contained" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Paper>
      </Grid>

      {/* Security Settings */}
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            Security Settings
          </Typography>
          <TextField label="Current Password" variant="outlined" fullWidth margin="normal" type="password" />
          <TextField label="New Password" variant="outlined" fullWidth margin="normal" type="password" />
          <TextField label="Confirm New Password" variant="outlined" fullWidth margin="normal" type="password" />
          <Button variant="contained" color="error" sx={{ mt: 2 }}>
            Update Password
          </Button>
        </Paper>
      </Grid>

      {/* Role Management */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            User & Role Management
          </Typography>
          <TextField
            label="Assign Role"
            variant="outlined"
            fullWidth
            margin="normal"
            select
            defaultValue="Teacher"
          >
            <MenuItem value="Teacher">Teacher</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Event Organizer">Event Organizer</MenuItem>
          </TextField>
          <Button variant="contained" sx={{ mt: 2 }}>
            Assign Role
          </Button>
        </Paper>
      </Grid>

      {/* Event Approval Settings */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            Event Approval Settings
          </Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Enable Event Approval Workflow" />
          <FormControlLabel control={<Switch />} label="Receive Email Notifications for Pending Events" />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminAccountSettings;
