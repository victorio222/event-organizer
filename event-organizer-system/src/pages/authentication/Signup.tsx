import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';
import { Box } from '@mui/material';

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const Signup = () => {
  const [user, setUser] = useState<User>({ firstName: '', lastName: '', username: '', email: '', password: '', phoneNumber: ''});
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/register', user);
      console.log('User registered successfully:', response.data);

      // Trigger SweetAlert2 success message
      Swal.fire({
        title: 'Registration Successful!',
        text: 'Your account has been created successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });

      // Optionally reset the form
      setUser({ firstName: '', lastName: '', username: '', email: '', password: '', phoneNumber: ''});

      // Redirect or additional logic if needed
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <Typography align="center" variant="h4">
        Sign Up
      </Typography>
      <Typography mt={1} align="center" variant="body2">
        Join us! Create an account with,
      </Typography>

      <Stack component="form" mt={3} onSubmit={handleSubmit} direction="column" gap={2}>
        {errorMessage && (
          <Typography
            width={'100%'}
            bgcolor={'#f8d7da'}
            borderRadius={2}
            py={1.5}
            color="#721c24"
            variant="body2"
            mt={-1.5}
            align="center"
          >
            {errorMessage}
          </Typography>
        )}

        <Box sx={{display: 'flex', alignItems: 'center'}}>
        <TextField
          id="firstName"
          name="firstName"
          type="text"
          value={user.firstName}
          onChange={handleInputChange}
          variant="filled"
          placeholder="First Name"
          autoComplete="firstName"
          fullWidth
          autoFocus
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="ic:baseline-person" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
              border: '1px solid gainsboro',
            },
            '& .MuiFilledInput-root.Mui-focused': {
              borderColor: '#007FFF',
            },
            mr: 1
          }}
        />
        <TextField
          id="lastName"
          name="lastName"
          type="text"
          value={user.lastName}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Last Name"
          autoComplete="lastName"
          fullWidth
          autoFocus
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="ic:baseline-person" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
              border: '1px solid gainsboro',
            },
            '& .MuiFilledInput-root.Mui-focused': {
              borderColor: '#007FFF',
            },
          }}
        />
        </Box>
        <TextField
          id="username"
          name="username"
          type="text"
          value={user.username}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Username"
          autoComplete="username"
          fullWidth
          autoFocus
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="ic:baseline-person" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
              border: '1px solid gainsboro',
            },
            '& .MuiFilledInput-root.Mui-focused': {
              borderColor: '#007FFF',
            },
            mt: -1
          }}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Email"
          autoComplete="email"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="ic:round-email" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
              border: '1px solid gainsboro',
            },
            '& .MuiFilledInput-root.Mui-focused': {
              borderColor: '#007FFF',
            },
            mt: -1
          }}
        />
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          type="number"
          value={user.phoneNumber}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Contact Number"
          autoComplete="phoneNumber"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="ic:baseline-local-phone" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
              border: '1px solid gainsboro',
            },
            '& .MuiFilledInput-root.Mui-focused': {
              borderColor: '#007FFF',
            },
            mt: -1
          }}
        />
        <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Password"
          autoComplete="current-password"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="ic:sharp-key" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: user.password ? 1 : 0,
                  pointerEvents: user.password ? 'auto' : 'none',
                }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ border: 'none', bgcolor: 'transparent !important' }}
                  edge="end"
                >
                  <IconifyIcon
                    icon={showPassword ? 'ic:outline-visibility' : 'ic:outline-visibility-off'}
                    color="neutral.light"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
              border: '1px solid gainsboro',
            },
            '& .MuiFilledInput-root.Mui-focused': {
              borderColor: '#007FFF',
            },
            mt: -1
          }}
        />

        <Button type="submit" variant="contained" size="medium" fullWidth sx={{ mt: -0.5 }}>
          Sign Up
        </Button>
      </Stack>

      <Typography mt={5} variant="body2" color="text.secondary" align="center" letterSpacing={0.25}>
        Already have an account? <Link href={paths.signin}>Signin</Link>
      </Typography>
    </>
  );
};

export default Signup;
