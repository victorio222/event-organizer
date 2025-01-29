import { Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import Header from 'components/sections/user copy/header/header';
import Footer from 'components/sections/user copy/footer/footer';
import { motion } from 'framer-motion';

const Main = () => {
  return (
    <Box sx={{ m: -3.5, mt: -4 }}>
      {/* Navbar */}
      <Header />

      {/* Greeting Section */}
      <Box
      id="home"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(http://uep.edu.ph/wp-content/uploads/2022/10/DJI_0375-scaled.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          padding: 4,
        }}
      >
        {/* Animated Typography for Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            mb={3}
            sx={{
              color: '#fff', // Vibrant yellow for contrast
              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)',
            }}
          >
            Welcome to the Event Organizer!
          </Typography>
        </motion.div>

        {/* Subtext Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Typography
            variant="h5"
            mb={4}
            sx={{
              color: '#F0F8FF',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)',
            }}
          >
            Plan, Manage, and Celebrate Effortlessly.
          </Typography>
          <Typography
            variant="body1"
            mb={4}
            sx={{
              color: '#FFFFFF', // White text for clarity
              opacity: 0.9, // Slight transparency for subtlety
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)',
            }}
          >
            The Event Organizer is your ultimate solution for simplifying event management. Whether you're planning a corporate meeting, a community gathering, or a private party, our platform ensures your event is a success.
          </Typography>
        </motion.div>

        {/* Animated Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button
            variant="contained"
            size="large"
            href="#events"
            sx={{
              fontSize: '18px',
              textTransform: 'capitalize',
              borderRadius: 3,
              color: '#fff',
              backgroundColor: '#1F75FE',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                backgroundColor: '#3B00DB',
              },
            }}
          >
            Start Exploring Events
          </Button>
        </motion.div>
      </Box>

      {/* Purpose Section */}
      <Box
        id="purpose"
        sx={{
          backgroundColor: '#F2F3F4',
          color: '#36454F',
          textAlign: 'center',
          py: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Why Choose Event Organizer?
        </Typography>
        <Grid container spacing={2} sx={{ width: '90%'}} justifyContent="center">
          {[
            {
              title: 'Streamlined Planning',
              description:
                'Effortlessly create and manage events, set schedules, and track progress with our intuitive tools.',
            },
            {
              title: 'Seamless Collaboration',
              description:
                'Collaborate with your team or stakeholders, and assign tasks to ensure smooth execution.',
            },
            {
              title: 'Real-Time Updates',
              description:
                'Receive instant notifications and updates, ensuring everyone stays informed and on track.',
            },
            {
              title: 'Powerful Insights',
              description:
                'Gain valuable insights with analytics and reports to measure the success of your events.',
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} >
              <Card
                sx={{
                  backgroundColor: '#1F75FE',
                  color: '#FEFEFA',
                  borderRadius: 5,
                  height: '100%', 
                  boxShadow: 3,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="#FFFFFF">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box id="about" sx={{height: 60, bgColor: "#F2F3F4"}}></Box>

      {/* About Section */}
       <Box
        sx={{
          backgroundColor: '#F2F3F4',
          color: '#111111',
          textAlign: 'center',
          py: 6,
          px: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={4}>
          About Us
        </Typography>
        <Typography variant="body1" mb={4}>
          Event Organizer was founded with a vision to simplify event planning and management.
          Our mission is to empower individuals and organizations with intuitive tools to create memorable events effortlessly.
        </Typography>
        <Typography variant="body1">
          From small gatherings to large-scale conferences, we provide all the features you need to
          ensure your events are organized, seamless, and impactful.
        </Typography>
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        sx={{
          backgroundColor: '#F8F9FA',
          textAlign: 'center',
          py: 6,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={4} color="#36454F">
          Contact Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 4, p: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Email Us
                </Typography>
                <Typography variant="body2">uepsupport@eventorganizer.com</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 4, p: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Call Us
                </Typography>
                <Typography variant="body2">+09630211352</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Main;