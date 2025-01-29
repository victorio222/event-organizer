import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Switch,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Pagination,
} from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material';
import Swal from 'sweetalert2';

interface Colleges {
  departmentID: number;
  departmentName: string;
}

interface Admin {
  userID: number;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  phoneNumber: string;
  colleges: Colleges;
}

const Event = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [open, setOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    colleges: { departmentID: '' },
  });
  const [departments, setDepartments] = useState<Colleges[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAdmins();
    fetchDepartments();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/colleges');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleStatusToggle = async (userID: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      await axios.put(`http://localhost:8080/api/admin/${userID}/status`, { status: newStatus });
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.userID === userID ? { ...admin, status: newStatus } : admin
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleNewAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setNewAdmin((prev) => ({
      ...prev,
      colleges: {
        ...prev.colleges,
        departmentID: value,
      },
    }));
  };

  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/admin/add', newAdmin);
      setAdmins((prev) => [...prev, response.data]); // Add the new admin to the list
      setOpen(false); // Close the modal

      fetchAdmins();
      fetchDepartments();
  
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Admin Added Successfully!',
      });
      handleClose(); // Reset the new admin form
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409 && error.response.data.message.includes('email')) {
          Swal.fire({
            icon: 'error',
            title: 'Email Already In Use',
            text: 'The email address is already associated with another account.',
          });
        } else if (error.response.status === 409 && error.response.data.message.includes('phoneNumber')) {
          Swal.fire({
            icon: 'error',
            title: 'Phone Number Already In Use',
            text: 'This phone number is already associated with another account.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error Adding Admin',
            text: 'Email or username already in use',
          });
        }
      }
    }
  };

  

  // const handleAddAdmin = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8080/api/admin/add', newAdmin);
  //     setAdmins((prev) => [...prev, response.data]);
  //     setOpen(false);

  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Done',
  //       text: 'Admin Added Successfully!',
  //     });
  //     handleClose();
  //   } 
  //   // catch (error) {
  //   //   console.error('Error adding admin:', error);
  //   // }
  //   catch (error: unknown) { // Use 'unknown' instead of 'AxiosError'
  //     if (axios.isAxiosError(error) && error.response) {
  //       // Check if email is already in use (e.g., 409 Conflict)
  //       if (error.response.status === 409 && error.response.data.message.includes('email')) {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Email Already In Use',
  //           text: 'The email address is already associated with another account.',
  //         });
  //       }
        
  //       // Check if phone number is already in use (e.g., 409 Conflict)
  //       else if (error.response.status === 409 && error.response.data.message.includes('phoneNumber')) {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Phone Number Already In Use',
  //           text: 'This phone number is already associated with another account.',
  //         });
  //       }
  //       else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error Adding Admin',
  //           text: 'Email or username already in use',
  //         });
  //       }
  //     }
  //   }
  // };

  const handleClose = () => {
    setOpen(false);
    setNewAdmin({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      colleges: { departmentID: '' },
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setSelectedCollege(event.target.value);
    setCurrentPage(1); // Reset to the first page on new filter
  };

  const handlePageChange = (_: unknown, value: number) => {
    setCurrentPage(value);
  };


  const filteredAdmins = admins.filter((admin) => {
    const firstName = admin.firstName?.toLowerCase() || '';
    const lastName = admin.lastName?.toLowerCase() || '';
    const departmentName = admin.colleges?.departmentName?.toLowerCase() || '';
  
    return (
      (firstName.includes(searchQuery.toLowerCase()) ||
        lastName.includes(searchQuery.toLowerCase()) ||
        departmentName.includes(searchQuery.toLowerCase())) &&
      (selectedCollege === '' || departmentName === selectedCollege)
    );
  });
  

  // Paginate filtered admins
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ mt: 1 }}>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Manage Admin
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{ mb: 2 }}
        >
          Add New Admin
        </Button>
      </Grid>

      <Box sx={{display: 'flex'}}>
      <TextField
        label="Search Admins"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ 
          mb: 2, 
          width: 500,
        '& .MuiInputBase-root': {
            height: 56,
            border: 'none',
          },
         }}
      />

      <FormControl 
      fullWidth
      sx={{
        '& .MuiInputBase-root': {
          height: 56,
          border: 'none',
        },
        ml: 1,
      }}>
        <InputLabel sx={{ bgcolor: 'white',}}>Filter by Department</InputLabel>
        <Select sx={{ bgcolor: 'white',}} value={selectedCollege} onChange={handleFilterChange}>
          <MenuItem value="">All Departments</MenuItem>
          {departments.map((dept) => (
            <MenuItem color={'black'} key={dept.departmentID} value={dept.departmentName}>
              {dept.departmentName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>

      {filteredAdmins.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>ID</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>College Department</strong></TableCell>
                <TableCell align="center"><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAdmins.map((admin, index) => (
                <TableRow key={admin.userID}>
                  <TableCell align="center">{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell>{`${admin.firstName} ${admin.lastName}`}</TableCell>
                  <TableCell>
                    {admin.colleges && admin.colleges?.departmentName
                      ? admin.colleges?.departmentName
                      : 'No department assigned'}
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      color={admin.status === 'Active' ? 'success.main' : 'error.main'}
                      sx={{ fontWeight: 400 }}
                    >
                      {admin.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={admin.status === 'Active'}
                      onChange={() => handleStatusToggle(admin.userID, admin.status)}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, bgcolor: 'white', borderRadius: 3}}>
        <Typography>No data available.</Typography>
      </Box>
      )}

      <Pagination
        count={Math.ceil(filteredAdmins.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="First Name"
              name="firstName"
              value={newAdmin.firstName}
              onChange={handleNewAdminChange}
              sx={{ 
                mb: 1, 
              '& .MuiInputBase-root': {
                  height: 56,
                  border: 'none',
                },
               }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={newAdmin.lastName}
              onChange={handleNewAdminChange}
              sx={{ 
                mb: 1, 
              '& .MuiInputBase-root': {
                  height: 56,
                  border: 'none',
                },
               }}
            />
          </Box>
          <TextField
            label="Username"
            name="username"
            value={newAdmin.username}
            onChange={handleNewAdminChange}
            fullWidth
            sx={{ 
              mb: 1, 
              width: 500,
            '& .MuiInputBase-root': {
                height: 56,
                border: 'none',
              },
             }}
          />
          <TextField
            label="Email Address"
            name="email"
            value={newAdmin.email}
            onChange={handleNewAdminChange}
            fullWidth
            sx={{ 
              mb: 1, 
              width: 500,
            '& .MuiInputBase-root': {
                height: 56,
                border: 'none',
              },
             }}
          />
          <TextField
            label="Contact Number"
            name="phoneNumber"
            value={newAdmin.phoneNumber}
            onChange={handleNewAdminChange}
            fullWidth
            sx={{ 
              mb: 1, 
              width: 500,
            '& .MuiInputBase-root': {
                height: 56,
                border: 'none',
              },
             }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newAdmin.password}
            onChange={handleNewAdminChange}
            fullWidth
            sx={{ 
              mb: 1, 
              width: 500,
            '& .MuiInputBase-root': {
                height: 56,
                border: 'none',
              },
             }}
          />
          <FormControl fullWidth 
          sx={{ 
          mb: 1, 
          width: 500,
        '& .MuiInputBase-root': {
            height: 56,
            border: 'none',
          },
         }}>
            <InputLabel>Department</InputLabel>
            <Select
              name="colleges.departmentID"
              value={newAdmin.colleges.departmentID}
              onChange={handleDepartmentChange}
            >
              {departments.map((dept) => (
                <MenuItem key={dept.departmentID} value={dept.departmentID}>
                  {dept.departmentName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddAdmin} color="primary">
            Add Admin
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Event;
