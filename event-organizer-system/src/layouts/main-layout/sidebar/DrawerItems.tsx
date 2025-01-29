import { useState, useEffect } from 'react';
import { fontFamily } from 'theme/typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ListItem from './list-items/ListItem';
import CollapseListItem from './list-items/CollapseListItem';
import Image from 'components/base/Image';
import IconifyIcon from 'components/base/IconifyIcon';
import LogoImg from 'assets/images/uep-logo.png';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';
import getSitemap from 'routes/sitemap'; // Import dynamic sitemap function
import { useUserContext } from 'contexts/UserContext';

type UserRole = 'MainAdmin' | 'Admin';

const DrawerItems = () => {
  const [role, setRole] = useState<UserRole>('Admin'); // Default role
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  useEffect(() => {
    const storedRole = localStorage.getItem('role') as UserRole | null; // Type assertion
    setRole(storedRole ?? 'Admin'); // Fallback to 'user' if no role is found

    console.log(storedRole); 
  }, []);

  const sitemap = getSitemap(role); // Get sitemap based on role

  const handleLogout = () => {
    localStorage.clear();
    setUser({ username: '', password: null, userID: '', token: null, role: null, email: null, firstName: null, lastName: null, phoneNumber: null});
    navigate(paths.signin); // Redirect to the login page
  };

  return (
    <>
      <Stack
        pt={5}
        pb={3.5}
        px={4.5}
        position="sticky"
        top={0}
        bgcolor="info.light"
        alignItems="center"
        justifyContent="flex-start"
        borderBottom={1}
        borderColor="info.main"
        zIndex={1000}
      >
        <ButtonBase component={Link} href="/" disableRipple>
          <Image src={LogoImg} alt="logo" height={70} width={70} sx={{ mr: 1 }} />
          <Box>
            <Typography
              mt={0.25}
              variant="h4"
              color="uepBlue.main"
              textTransform="uppercase"
              letterSpacing={1}
              fontFamily={fontFamily.poppins}
            >
              Event Organizer
            </Typography>
            <Typography
              mt={-0.35}
              variant="body2"
              color="uepBlue.main"
              textTransform="uppercase"
              fontWeight={500}
              fontFamily={fontFamily.poppins}
            >
              Admin Panel
            </Typography>
          </Box>
        </ButtonBase>
      </Stack>

      <List component="nav" sx={{ mt: 1, mb: 10, px: 4.5 }}>
        {sitemap.map((route) =>
          route.items ? (
            <CollapseListItem key={route.id} {...route} />
          ) : (
            <ListItem key={route.id} {...route} />
          ),
        )}
      </List>

      <Box mt="auto" px={3} pb={6}>
        <Button onClick={handleLogout} variant="text" startIcon={<IconifyIcon icon="ic:baseline-logout" />}>
          Log Out
        </Button>
      </Box>
    </>
  );
};

export default DrawerItems;
