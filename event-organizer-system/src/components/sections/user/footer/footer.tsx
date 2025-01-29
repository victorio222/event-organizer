// import { Box } from '@mui/material';
// import Typography from '@mui/material/Typography';
// const Footer = () => {
//   return (
//     <Box
//         sx={{
//           backgroundColor: '#123456',
//           color: '#fff',
//           textAlign: 'center',
//           p: 2,
//           mt: 4,
//           mb: -5,
//         }}
//         component="footer"
//       >
//         <Typography variant="body2">
//           &copy; {new Date().getFullYear()} Event Organizer. All rights reserved.
//         </Typography>
//         <Typography variant="body2">
//           <a href="#privacy-policy" style={{ color: '#ffffff', textDecoration: 'underline', margin: '0 8px' }}>
//             Privacy Policy
//           </a>
//           |
//           <a href="#terms-of-service" style={{ color: '#ffffff', textDecoration: 'underline', margin: '0 8px' }}>
//             Terms of Service
//           </a>
//         </Typography>
//       </Box>
//   );
// };

// export default Footer;



import { Box, Typography, Link, Stack, Paper, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Paper>
      <Divider />
      <Box
      sx={{
        backgroundColor: '#fff',
        color: '#000',
        textAlign: 'center',
        py: 2, // Padding vertically for better spacing
        width: '100%',
        height: 30,
        mb: 1
      }}
      component="footer"
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Event Organizer. All rights reserved.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Link href="#privacy-policy" sx={{ color: '#000', textDecoration: 'underline', fontSize: '14px' }}>
          Privacy Policy
        </Link>
        <span style={{ color: '#000' }}>|</span>
        <Link href="#terms-of-service" sx={{ color: '#000', textDecoration: 'underline', fontSize: '14px' }}>
          Terms of Service
        </Link>
      </Stack>
    </Box>
    </Paper>
  );
};

export default Footer;
