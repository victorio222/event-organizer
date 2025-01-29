import { Typography, Box, Button, Container, Grid, Paper, Divider } from '@mui/material';
import Footer from 'components/sections/user/footer/footer';
import Header from 'components/sections/user/header/header';

const AboutUs = () => {
    return (
        <Box sx={{ m: -3.5, mt: -4, backgroundColor: '#fff' }}>
            {/* Navbar */}
            <Header />

            {/* Main Content */}
            <Container sx={{ mt: 8, py: 8 }}>
                <Typography variant="h3" fontWeight="bold" color="#2A4D71" gutterBottom sx={{ fontSize: '2rem', letterSpacing: 1, textAlign: 'center' }}>
                    About Us
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '15px', lineHeight: 1.7, mx: 20, textAlign: 'center' }}>
                    The Event Organizer System is a comprehensive platform designed to simplify the process of planning and executing events. Aimed at teachers, administrators, and organizational staff, our system provides a user-friendly interface that streamlines event management tasks, allowing for efficient communication, collaboration, and overall event execution.
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '15px', lineHeight: 1.7, mx: 20, textAlign: 'center' }}>
                    Our platform addresses the unique needs of educational institutions and organizations by ensuring that event coordination is not only easier but also more organized. Whether it’s a simple meeting or a large workshop, Event Organizer helps you manage every aspect, from scheduling to resource sharing, with an intuitive and flexible approach.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Divider sx={{ mt: 3, width: '60%' }} />
                </Box>

                <Typography variant="h5" fontWeight="bold" color="#2A4D71" mt={4} gutterBottom sx={{ fontSize: '28px', letterSpacing: 0.5, textAlign: 'center' }}>
                    Our Vision
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '15px', lineHeight: 1.7, mx: 20, textAlign: 'center' }}>
                    At Event Organizer, we envision a future where schools, colleges, and organizations have an effective solution for managing their events seamlessly. We aim to provide a platform that not only enhances productivity but also improves communication and ensures that every event is planned to perfection. Our goal is to be the go-to tool for all event-related tasks, making it easier for users to focus on what matters most: the success of their events and the people involved.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Divider sx={{ mt: 3, width: '60%' }} />
                </Box>

                <Typography variant="h5" fontWeight="bold" color="#2A4D71" mt={4} gutterBottom sx={{ fontSize: '28px', letterSpacing: 0.5, textAlign: 'center' }}>
                    Why Choose Us?
                </Typography>
                <Grid container spacing={2} px={17} mt={1}>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={12} sx={{ p: 4, borderRadius: 0, backgroundColor: '#f1f8ff', boxShadow: 2 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '15px', color: '#0077b6' }}>
                                User-Friendly Interface
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '15px' }}>
                                We believe in simplicity without compromising functionality. Our platform offers an intuitive interface that makes event creation and management quick and easy, no matter the user's tech experience.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Paper elevation={12} sx={{ p: 4, borderRadius: 0, backgroundColor: '#fff1e6', boxShadow: 2 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '15px', color: '#e63946' }}>
                                Efficient Communication
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '15px' }}>
                                Effective communication is key to event success. Our system ensures that users can easily send notifications, share updates, and maintain continuous communication, making event coordination smooth and transparent.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Paper elevation={12} sx={{ p: 4, borderRadius: 0, backgroundColor: '#e2f9e1', boxShadow: 2, height: '100%' }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '15px', color: '#2a9d8f' }}>
                                Enhanced Security
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '15px' }}>
                                We take security seriously. Our platform includes robust security features to ensure that sensitive information is protected and that all user data remains confidential.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Paper elevation={12} sx={{ p: 4, borderRadius: 0, backgroundColor: '#fce4ec', boxShadow: 2 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '15px', color: '#9b4d96' }}>
                                Customizable Solutions
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '15px' }}>
                                Every event is unique, and we understand that. Our system offers customizable features that cater to the specific needs of each event, allowing users to tailor their event management experience to their preferences.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 6, mb: 6 }} />

                <Box sx={{ textAlign: 'center', backgroundColor: '#0070FF', p: 6, borderRadius: 2, mx: 8 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: '30px', color: '#ffffff' }}>
                        Join Us in Revolutionizing Event Management!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '17px', lineHeight: 1.7, color: '#ffffff' }}>
                        We invite you to be a part of our mission to make event planning smoother, more efficient, and more enjoyable. Whether you're a teacher, administrator, or event planner, Event Organizer is here to help you take your events to the next level.
                    </Typography>
                    <Button variant="contained" href="/event-organizer/contact" sx={{ mt: 3, fontSize: '1.1rem', padding: '12px 24px', backgroundColor: '#fff', color: 'black' }}>
                        Get in Touch
                    </Button>
                </Box>
            </Container>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default AboutUs;
