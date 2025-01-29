import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconifyIcon from 'components/base/IconifyIcon';
import Department from './Department';
import { useUserContext } from 'contexts/UserContext';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Swal from 'sweetalert2';

interface DepartmentType {
  departmentID: number;
  departmentName: string;
}

const Departments = () => {
  const [departments, setDepartments] = useState<DepartmentType[]>([]); // Departments state
  const [searchText, setSearchText] = useState('');
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartment] = useState('');

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/colleges');
        setDepartments(response.data); // Fetch departments and set state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchColleges();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleNewCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  const handleAddDepartment = async () => {
    const departmentData = { departmentName };
    try {
      const response = await axios.post('http://localhost:8080/api/colleges/add', departmentData);
      setDepartments((prevDepartments) => [...prevDepartments, response.data]); // Update departments

      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'You successfully added a new department.',
      });

      handleClose();
    } catch (error) {
      console.error('Error adding data:', error);
      console.error('Payload sent:', departmentName);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDepartment('');
  };

  return (
    <>
      <Paper sx={{ px: 0, height: '100%' }}>
        <Stack
          px={3.5}
          spacing={{ xs: 2, sm: 0 }}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" minWidth={200}>
            Department
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TextField
              variant="filled"
              size="small"
              placeholder="Search Colleges..."
              value={searchText}
              onChange={handleInputChange}
              sx={{ width: 1, maxWidth: 250 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconifyIcon icon="eva:search-fill" />
                  </InputAdornment>
                ),
              }}
            />
            <Grid>
              {user.role === 'MainAdmin' && (
                <Button variant="contained" sx={{ ml: 2, fontSize: 12, padding: 1, width: 130 }} type="submit" onClick={() => setOpen(true)}>
                  New Department
                </Button>
              )}
            </Grid>
          </Box>
        </Stack>

        <Box mt={1.5} sx={{ height: 630, flexGrow: 1 }}>
          <Department searchText={searchText} departments={departments} /> {/* Pass departments to Department component */}
        </Box>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Department</DialogTitle>
        <DialogContent>
          <TextField
            label="Department Name"
            name="departmentName"
            value={departmentName}
            onChange={handleNewCollegeChange}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                height: 56,
                border: 'none',
              },
              marginRight: 1,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDepartment} color="primary">
            Add
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Departments;
