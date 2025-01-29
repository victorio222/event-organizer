import { AppBar, Divider, Stack, Toolbar, Typography } from '@mui/material';
import Image from 'components/base/Image';
import Logo from 'assets/images/uep-logo.png';
import { NavLink } from 'react-router-dom'; // Use NavLink for active links
import ProfileMenu from './ProfileMenu';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ p: 0, borderRadius: 0, backgroundColor: '#fff' }}>
      <Toolbar sx={{ mx: 10 }}>
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
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <NavLink
            to="/home"
            style={({ isActive }) => ({
              color: isActive ? '#0070FF' : 'black', // Active link color
              fontWeight: isActive ? 'bold' : 'normal', // Make active link bold
              textDecoration: 'none',
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/photos"
            style={({ isActive }) => ({
              color: isActive ? '#0070FF' : 'black',
              fontWeight: isActive ? 'bold' : 'normal',
              textDecoration: 'none',
            })}
          >
            Photos
          </NavLink>
          <NavLink
            to="/contact"
            style={({ isActive }) => ({
              color: isActive ? '#0070FF' : 'black',
              fontWeight: isActive ? 'bold' : 'normal',
              textDecoration: 'none',
            })}
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => ({
              color: isActive ? '#0070FF' : 'black',
              fontWeight: isActive ? 'bold' : 'normal',
              textDecoration: 'none',
            })}
          >
            About Us
          </NavLink>
          <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center">
          <ProfileMenu />
        </Stack>
        </Stack>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default Header;
