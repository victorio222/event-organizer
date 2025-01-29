import { Box, Typography, Grid, Paper, Button, Container, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from 'components/sections/user/footer/footer';
import Header from 'components/sections/user/header/header';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleContact = () =>{
    navigate('/contact');
  }
  return (
    <Box sx={{ m: -3.5, mt: -4 }}>
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <Container sx={{ mt: 8, py: 6, textAlign: 'justify' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: '2rem', color: '#123456', textAlign: 'center' }}>
            Contact Us
          </Typography>

        <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '15px', textAlign: 'center', mx: 7 }}>
          We at Event Organizer value communication and transparency. Our dedicated support team is here to assist you with any questions or concerns you may have. Whether you're interested in learning more about our platform, need assistance with an ongoing event, or would like to discuss how we can support your organization, we're just a message or call away.
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '15px', textAlign: 'center', mx: 7 }}>
          Our goal is to provide a seamless experience for educators, administrators, and all staff members involved in event planning. We understand how important it is to stay organized and connected throughout the planning and execution stages of events. With our platform, we aim to eliminate the common challenges that come with event management, making it easy and efficient for you to focus on what matters: creating a positive impact through your events.
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '15px', textAlign: 'center', mx: 7 }}>
          Whether you need help navigating the platform, have feature requests, or are seeking advice on how to best utilize our system, we are happy to help you in any way we can. Reach out to us, and let us assist you in making your event a success!
        </Typography>

        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Divider sx={{mt: 3, width: '60%'}}/>
        </Box>

        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mt: 4, mb: 3, color: '#123456', textAlign: 'center' }}>
            Get in Touch
          </Typography>

        {/* Contact Info Cards */}
        <Grid container spacing={4} sx={{px: 10}}>
          <Grid item xs={12} md={4}>
            <Paper elevation={8} sx={{ p: 2.4, borderRadius: 0, backgroundColor: '#e6f2ff', boxShadow: 3, height: '100%' }}>
              <Box sx={{display: 'flex', justifyContent: 'start'}}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '15px', color: '#0056b3' }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '25px', color: '#1976d2', marginRight: '8px' }} />
                  Email Us
              </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '15px' }}>
                For general inquiries, feedback, or any questions you might have, feel free to email us directly at <a href="mailto:info@eventorganizer.com" style={{ textDecoration: 'underline', color: '#1976d2' }}>info@eventorganizer.com</a>.
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={2} sx={{ fontSize: '15px' }}>
                Our team strives to respond to all inquiries within 24 hours during business days. Whether it's about event setup, platform features, or a technical question, we are happy to assist you!
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={8} sx={{ p: 2.4, borderRadius: 0, backgroundColor: '#ffe6e6', boxShadow: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '15px', color: '#c62828' }}>
                <FontAwesomeIcon icon={faPhoneAlt} style={{ fontSize: '2rem', color: '#1976d2', marginRight: '8px' }} />
                Call Us
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '15px' }}>
                We are available for phone support at <a href="tel:09639211352" style={{ textDecoration: 'underline', color: '#1976d2' }}>
                09639211352
                </a>.
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={2} sx={{ fontSize: '15px' }}>
                Our phone lines are open Monday through Friday from 9:00 AM to 6:00 PM (UTC). Feel free to reach out for urgent inquiries, platform troubleshooting, or personalized assistance.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={8} sx={{ p: 2.4, borderRadius: 0, backgroundColor: '#d6f5d6', boxShadow: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '15px', color: '#388e3c' }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '2rem', color: '#1976d2', marginRight: '8px' }} />
                Visit Us
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '15px' }}>
                We are located at:
                <br />
                Event Organizer HQ, University of Eastern Philippines, Main Campus.
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={2} sx={{ fontSize: '15px' }}>
                If you're in the area and would like to visit, feel free to stop by our office. We welcome walk-ins and can arrange meetings by appointment.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: '27px', color: '#123456' }}>
            We're Here to Help!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '15px', px: 30 }}>
            At Event Organizer, we are committed to providing exceptional service and support. No matter what stage of event planning you're in, we're ready to assist you in making your experience smooth and successful.
          </Typography>
          <Button onClick={handleContact} variant="contained" color="primary" sx={{ mt: 3, fontSize: '1.1rem', padding: '12px 24px' }}>
            Contact Us Now
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Contact;
