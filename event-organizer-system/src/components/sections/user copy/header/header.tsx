import { AppBar, Divider, Stack, Toolbar, Typography, Button } from '@mui/material';
import Image from 'components/base/Image';
import Logo from 'assets/images/uep-logo.png';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';

const Header = () => {
  const navigate = useNavigate();
  // const isActive = (hash: string) => window.location.hash === hash;
  const isActive = (hash: string) => {
    if (!window.location.hash && hash === '#home') {
      return true; // Default to 'Home' if no hash is present
    }
    return window.location.hash === hash;
  };

  return (
    <AppBar position="fixed" sx={{ p: 0, borderRadius: 0, backgroundColor: '#fff' }}>
      <Toolbar sx={{ mx: 10 }}>
        {/* Logo and Title */}
        <Image src={Logo} alt="logo" height={50} width={50} sx={{ ml: 2, mr: 1.5 }} />
        <Stack sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" color={'#1b2559'} sx={{ fontSize: '15px' }}>
            University of Eastern Philippines
          </Typography>
          <br />
          <Typography variant="h3" color={'#1b2559'} sx={{ mt: -4, fontSize: '30px' }}>
            Event Organizer
          </Typography>
        </Stack>

        {/* Navigation Links */}
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <a
            href="#home"
            style={{
              color: isActive('#home') ? '#0070FF' : 'black',
              fontWeight: 'normal',
              textDecoration: isActive('#home') ? 'underline' : 'none',
            }}
          >
            Home
          </a>
          <a
            href="#contact"
            style={{
              color: isActive('#contact') ? '#0070FF' : 'black',
              fontWeight: 'normal',
              textDecoration: isActive('#contact') ? 'underline' : 'none',
            }}
          >
            Contact
          </a>
          <a
            href="#about"
            style={{
              color: isActive('#about') ? '#0070FF' : 'black',
              fontWeight: 'normal',
              textDecoration: isActive('#about') ? 'underline' : 'none',
            }}
          >
            About Us
          </a>
        </Stack>

        {/* Login and Signup Buttons */}
        <Stack direction="row" spacing={1} sx={{ ml: 3 }}>
          <Button
            variant="outlined"
            sx={{
              width: 120,
              textTransform: 'none',
              borderColor: '#0070FF',
              color: '#0070FF',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#f0f4ff', },
            }}
            onClick={() => {
              navigate(paths.signin)
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              width: 120,
              textTransform: 'none',
              backgroundColor: '#0070FF',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#005FCC' },
            }}
            onClick={() => {
              // Logic for signup button action
              navigate(paths.signup)
            }}
          >
            Signup
          </Button>
        </Stack>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default Header;
