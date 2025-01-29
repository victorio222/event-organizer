// import { useState, useEffect } from 'react';
// import { Typography, Button, Box, TextField, Grid, Card, CardContent, CardActions, Chip, Pagination, Stack } from '@mui/material';
// import axios from 'axios';
// import { useUserContext } from 'contexts/UserContext';
// import Header from 'components/sections/user/header/header';
// import Footer from 'components/sections/user/footer/footer';

// interface Event {
//   eventID: number;
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   status: string;
// }

// const Homepage = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
//   const [searchText, setSearchText] = useState<string>('');
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [eventsPerPage] = useState<number>(4); // Events per page
//   const { user } = useUserContext();

//   useEffect(() => {
//     // Fetch events for the logged-in user
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/events');
//         // Filter for only approved events
//         const approvedEvents = response.data.filter((event: Event) => event.status === 'Approved');
//         setEvents(approvedEvents);
//         setFilteredEvents(approvedEvents);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, [user.userID]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.toLowerCase();
//     setSearchText(value);
//     setFilteredEvents(
//       events.filter(
//         (event) =>
//           event.title.toLowerCase().includes(value) ||
//           event.description.toLowerCase().includes(value) ||
//           event.location.toLowerCase().includes(value)
//       )
//     );
//   };

//   const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
//     setCurrentPage(value);
//   };

//   // Calculate index of first and last event on the current page
//   const indexOfLastEvent = currentPage * eventsPerPage;
//   const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//   const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

//   // Get the current date for comparison
//   const currentDate = new Date();

//   // Function to determine if an event is upcoming or done
//   const getEventStatusLabel = (startDate: string, endDate: string) => {
//     const eventStart = new Date(startDate);
//     const eventEnd = new Date(endDate);

//     if (eventStart > currentDate) {
//       return 'Upcoming';
//     } else if (eventEnd < currentDate) {
//       return 'Done';
//     }
//     return '';
//   };

//   return (
//     <Box sx={{ m: -3.5, mt: -4 }}>
//       {/* Navbar */}
//       <Header />

//       {/* Greeting Section */}
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//           background: 'linear-gradient(135deg, #FFB6C1, #FFD700)',
//           textAlign: 'center',
//           padding: 4,
//         }}
//       >
//         <Typography variant="h2" fontWeight="bold" color="primary" mb={3}>
//           Welcome to the Event Organizer!
//         </Typography>
//         <Typography variant="h5" color="text.primary" mb={4}>
//           Your one-stop platform for managing all events with ease and efficiency.
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           href="#events"
//           sx={{
//             fontSize: '18px',
//             textTransform: 'capitalize',
//             borderRadius: 3,
//           }}
//         >
//           Start Exploring Events
//         </Button>
//       </Box>

//       {/* Main Content - Events Section */}
//       <Box sx={{ padding: 4, mt: 9, background: 'linear-gradient(135deg, #FFB6C1, #FFD700)', borderRadius: 2 }}>
//         <Stack
//           sx={{
//             width: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: 3,
//             mb: 4,
//           }}
//         >
//           <Typography variant="h3" fontWeight="bold" color="primary" mb={2}>
//             Welcome, {user.firstName}!
//           </Typography>
//           <TextField
//             label="Search events..."
//             variant="outlined"
//             fullWidth
//             value={searchText}
//             onChange={handleSearch}
//             sx={{
//               '& .MuiInputBase-root': {
//                 height: 60,
//                 borderRadius: 3,
//                 fontSize: '16px',
//               },
//               '& .MuiInputLabel-root': {
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//               },
//               width: '40%',
//               backgroundColor: '#FFF5E1',
//             }}
//           />
//         </Stack>
//         <Typography variant="h5" color="text.secondary" mb={4}>
//           Here's a list of events available for you. Use the search bar to filter through the events.
//         </Typography>

//         {currentEvents.length > 0 ? (
//           <Grid container spacing={3}>
//             {currentEvents.map((event) => (
//               <Grid item xs={12} sm={6} md={4} key={event.eventID}>
//                 <Card
//                   sx={{
//                     backgroundColor: '#fff3e0',
//                     borderRadius: 3,
//                     boxShadow: 8,
//                     transition: 'transform 0.3s ease',
//                     '&:hover': {
//                       transform: 'scale(1.05)',
//                     },
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
//                       {event.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" mb={1}>
//                       {event.description}
//                     </Typography>
//                     <Typography variant="body2" color="text.primary">
//                       <strong>Location:</strong> {event.location}
//                     </Typography>
//                     <Typography variant="body2" color="text.primary">
//                       <strong>Start:</strong> {new Date(event.startDate).toLocaleDateString()}
//                     </Typography>
//                     <Typography variant="body2" color="text.primary">
//                       <strong>End:</strong> {new Date(event.endDate).toLocaleDateString()}
//                     </Typography>

//                     {/* Event Status Label */}
//                     <Chip
//                       label={getEventStatusLabel(event.startDate, event.endDate)}
//                       color={
//                         getEventStatusLabel(event.startDate, event.endDate) === 'Upcoming'
//                           ? 'primary'
//                           : getEventStatusLabel(event.startDate, event.endDate) === 'Done'
//                           ? 'default'
//                           : 'warning'
//                       }
//                       sx={{
//                         mt: 2,
//                         backgroundColor:
//                           getEventStatusLabel(event.startDate, event.endDate) === 'Upcoming'
//                             ? '#2196F3'
//                             : getEventStatusLabel(event.startDate, event.endDate) === 'Done'
//                             ? '#8B8B8B'
//                             : '#FFC107',
//                         color: 'white',
//                       }}
//                     />
//                   </CardContent>
//                   <CardActions sx={{ justifyContent: 'center', padding: 2 }}>
//                     <Button
//                       size="small"
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => console.log('View Event', event.eventID)}
//                       sx={{ textTransform: 'capitalize', borderRadius: 3 }}
//                     >
//                       View Details
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography variant="body1" color="text.secondary">
//             No events found.
//           </Typography>
//         )}

//         {/* Pagination */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <Pagination
//             count={Math.ceil(filteredEvents.length / eventsPerPage)}
//             page={currentPage}
//             onChange={handleChangePage}
//             color="primary"
//             sx={{
//               '& .MuiPaginationItem-root': {
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//               },
//               '& .Mui-selected': {
//                 backgroundColor: 'primary.main !important',
//                 color: 'white',
//               },
//             }}
//           />
//         </Box>
//       </Box>

//       {/* Footer */}
//       <Footer />
//     </Box>
//   );
// };

// export default Homepage;










// import { useState, useEffect } from 'react';
// import { Typography, Button, Box, TextField, Grid, Card, CardContent, CardActions, Chip, Pagination, Stack } from '@mui/material';
// import axios from 'axios';
// import { useUserContext } from 'contexts/UserContext';
// import Header from 'components/sections/user/header/header';
// import Footer from 'components/sections/user/footer/footer';
// import Image from 'components/base/Image';
// import calendarImg from 'assets/images/calendar.png';

// interface Event {
//   eventID: number;
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   location: string;
//   status: string;
// }

// const Homepage = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
//   const [searchText, setSearchText] = useState<string>('');
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [eventsPerPage] = useState<number>(4); // Events per page
//   const { user } = useUserContext();

//   useEffect(() => {
//     // Fetch events for the logged-in user
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/events');
//         // Filter for only approved events
//         const approvedEvents = response.data.filter((event: Event) => event.status === 'Approved');
//         setEvents(approvedEvents);
//         setFilteredEvents(approvedEvents);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, [user.userID]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.toLowerCase();
//     setSearchText(value);
//     setFilteredEvents(
//       events.filter(
//         (event) =>
//           event.title.toLowerCase().includes(value) ||
//           event.description.toLowerCase().includes(value) ||
//           event.location.toLowerCase().includes(value)
//       )
//     );
//   };

//   const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
//     setCurrentPage(value);
//   };

//   // Calculate index of first and last event on the current page
//   const indexOfLastEvent = currentPage * eventsPerPage;
//   const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//   const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

//   // Get the current date for comparison
//   const currentDate = new Date();

//   // Function to determine if an event is upcoming or done
//   const getEventStatusLabel = (startDate: string, endDate: string) => {
//     const eventStart = new Date(startDate);
//     const eventEnd = new Date(endDate);

//     if (eventStart > currentDate) {
//       return 'Upcoming';
//     } else if (eventEnd < currentDate) {
//       return 'Done';
//     }
//     return '';
//   };

//   return (
//     <Box sx={{ m: -3.5, mt: -4 }}>
//       {/* Navbar */}
//       <Header />

//       {/* Main Content */}
//       <Box sx={{ padding: 4, mt: 9, borderRadius: 2, px: 18 }}>
//         <Stack
//           sx={{
//             width: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: 3,
//             mb: 1,
//           }}
//         >
//           <Typography variant="h4" fontWeight="bold" color="#0070FF" mb={-5}>
//             Welcome back, {user.firstName}!
//           </Typography>

//         </Stack>


//           <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
//             <Typography variant="h2" color="text.secondary" sx={{fontWeight: 600}}>
//               We're thrilled to have you with us. Explore and stay updated on all the exciting events happening around you. Dive in and discover what's in store. Let's get started and make the most of your experience!
//             </Typography>
//             <Image
//               src={calendarImg}
//               alt="Calendar icon"
//               width={300}
//               sx={{ ml: 10 }}
//             />
//           </Box>

//         <Typography variant="body1" color="text.secondary" mt={5} mb={3}>
//           {/* Here's a list of events available for you. Use the search bar to filter through the events. */}
//           We're happy to have you here! Here’s what's happening around you.
//         </Typography>

//         <Typography variant="h3" color="text.secondary">
//           UPCOMING EVENTS
//         </Typography>
//           <TextField
//               label="Search events..."
//               variant="outlined"
//               fullWidth
//               value={searchText}
//               onChange={handleSearch}
//               sx={{
//                 '& .MuiInputBase-root': {
//                   height: 50,
//                   border: 'none',
//                   fontSize: '13px', // Font size for the label
//                 },
//                 '& .MuiInputLabel-root': {
//                   fontSize: '13px', // Font size for the label
//                 },
//                 marginRight: 1,
//                 width: '30%',
//               }}
//             />
//         {currentEvents.length > 0 ? (
//           <Grid container spacing={3}>
//             {currentEvents.map((event) => (
//               <Grid item xs={12} sm={6} md={4} key={event.eventID}>
//                 <Card
//                   sx={{
//                     backgroundColor: '#fff3e0',
//                     borderRadius: 3,
//                     boxShadow: 8,
//                     transition: 'transform 0.3s ease',
//                     '&:hover': {
//                       transform: 'scale(1.05)',
//                     },
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
//                       {event.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" mb={1}>
//                       {event.description}
//                     </Typography>
//                     <Typography variant="body2" color="text.primary">
//                       <strong>Location:</strong> {event.location}
//                     </Typography>
//                     <Typography variant="body2" color="text.primary">
//                       <strong>Start:</strong> {new Date(event.startDate).toLocaleDateString()}
//                     </Typography>
//                     <Typography variant="body2" color="text.primary">
//                       <strong>End:</strong> {new Date(event.endDate).toLocaleDateString()}
//                     </Typography>

//                     {/* Event Status Label */}
//                     <Chip
//                       label={getEventStatusLabel(event.startDate, event.endDate)}
//                       color={
//                         getEventStatusLabel(event.startDate, event.endDate) === 'Upcoming'
//                           ? 'primary'
//                           : getEventStatusLabel(event.startDate, event.endDate) === 'Done'
//                           ? 'default'
//                           : 'warning'
//                       }
//                       sx={{
//                         mt: 2,
//                         backgroundColor:
//                           getEventStatusLabel(event.startDate, event.endDate) === 'Upcoming'
//                             ? '#2196F3'
//                             : getEventStatusLabel(event.startDate, event.endDate) === 'Done'
//                             ? '#8B8B8B'
//                             : '#FFC107',
//                         color: 'white',
//                       }}
//                     />
//                   </CardContent>
//                   <CardActions sx={{ justifyContent: 'center', padding: 2 }}>
//                     <Button
//                       size="small"
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => console.log('View Event', event.eventID)}
//                       sx={{ textTransform: 'capitalize', borderRadius: 3 }}
//                     >
//                       View Details
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography variant="body1" color="text.secondary">
//             No events found.
//           </Typography>
//         )}

//         {/* Pagination */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <Pagination
//             count={Math.ceil(filteredEvents.length / eventsPerPage)}
//             page={currentPage}
//             onChange={handleChangePage}
//             color="primary"
//             sx={{
//               '& .MuiPaginationItem-root': {
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//               },
//               '& .Mui-selected': {
//                 backgroundColor: 'primary.main !important',
//                 color: 'white',
//               },
//             }}
//           />
//         </Box>

//         <Typography variant="h3" color="text.secondary">
//           ALL EVENTS
//         </Typography>
//       </Box>

//       {/* Footer */}
//       <Footer />
//     </Box>
//   );
// };

// export default Homepage;




































import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  TextField,
  Grid,
  Paper,
  Pagination,
  Stack,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { useUserContext } from 'contexts/UserContext';
import Header from 'components/sections/user/header/header';
import Footer from 'components/sections/user/footer/footer';
import Image from 'components/base/Image';
import calendarImg from 'assets/images/calendar.png';
import IconifyIcon from 'components/base/IconifyIcon';

interface Event {
  eventID: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  status: string;
}

interface Photo {
  id: number;
  fileName: string;
  filePath: string;
  uploadDate: string;
  url: string;
}

const ITEMS_PER_PAGE = 6; // Number of events/photos per page

const Homepage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(''); // State to hold selected image for modal
  const [openModal, setOpenModal] = useState<boolean>(false); // Modal open state
  const { user } = useUserContext();

  useEffect(() => {
    // Fetch events for the logged-in user
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        const approvedEvents = response.data.filter(
          (event: Event) => event.status === 'Approved'
        );
        setEvents(approvedEvents);
        setFilteredEvents(approvedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Fetch gallery photos
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/photos');
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchEvents();
    fetchPhotos();
  }, [user.userID]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setFilteredEvents(
      events.filter(
        (event) =>
          event.title.toLowerCase().includes(value) ||
          event.description.toLowerCase().includes(value) ||
          event.location.toLowerCase().includes(value)
      )
    );
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl); // Set the selected image URL
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  // Get the current date for comparison
  const currentDate = new Date();

  // Separate events into upcoming and past
  const upcomingEvents = filteredEvents.filter(
    (event) => new Date(event.startDate) > currentDate
  );
  const pastEvents = filteredEvents.filter(
    (event) => new Date(event.endDate) < currentDate
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUpcomingEvents = upcomingEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const paginatedPastEvents = pastEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const paginatedPhotos = photos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Box sx={{ m: -3.5, mt: -4 }}>
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <Box sx={{ padding: 4, mt: 9, borderRadius: 2, px: 18 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="#0070FF">
            Welcome back, {user.firstName}!
          </Typography>
        </Box>

        <Divider sx={{mt: -1, mb: 5}} />

        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography
            variant="h2"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            We're thrilled to have you with us. Explore and stay updated on all
            the exciting events happening around you. Dive in and discover
            what's in store. Let's get started and make the most of your
            experience!
          </Typography>
          <Image
            src={calendarImg}
            alt="Calendar icon"
            width={300}
            sx={{ ml: 10 }}
          />
        </Box>

        <Divider sx={{mt: 10, mb: 5}} />

        <TextField
          label="Search events..."
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={handleSearch}
          sx={{
            '& .MuiInputBase-root': {
              height: 50,
              fontSize: '13px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '13px',
            },
            my: 3,
            display: 'none'
          }}
        />

        {/* Upcoming Events */}
        <Typography variant="h3" color="text.secondary" mb={3}>
          Upcoming Events
        </Typography>
        {paginatedUpcomingEvents.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {paginatedUpcomingEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.eventID}>
                  <Paper sx={{ borderRadius: 0, boxShadow: 3 }}>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="blue"
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Location:</strong> {event.location}
                      </Typography>
                      <Box>
                        <Typography variant="body2" mt={4}>
                          <strong>Start:</strong>{' '}
                          {new Date(event.startDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Typography>
                        <Typography variant="body2">
                          <strong>End:</strong>{' '}
                          {new Date(event.endDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Typography>

                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={Math.ceil(upcomingEvents.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{ mt: 3 }}
              color="primary"
            />
          </>
        ) : (
          <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, bgcolor: '#F5F5F5', boxShadow: 1}}>
            <IconifyIcon icon={'tabler:calendar-cancel'} sx={{ fontSize: 110, color: 'gainsboro', stroke: 1 }} /> <br />
            <Typography>No upcoming events available</Typography>
          </Stack>
        )}

        {/* Past Events */}
        <Typography variant="h3" color="text.secondary" mt={5} mb={3}>
          Past Events
        </Typography>
        {paginatedPastEvents.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {paginatedPastEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.eventID}>
                  <Paper sx={{ borderRadius: 0, boxShadow: 3 }}>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="primary"
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Location:</strong> {event.location}
                      </Typography>
                      <Typography variant="body2" mt={4}>
                        <strong>Start:</strong>{' '}
                        {new Date(event.startDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Typography>
                      <Typography variant="body2">
                        <strong>End:</strong>{' '}
                        {new Date(event.endDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Typography>

                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={Math.ceil(pastEvents.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{ mt: 3 }}
              color="primary"
            />
          </>
        ) : (
          <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, bgcolor: '#F5F5F5', boxShadow: 1}}>
            <IconifyIcon icon={'tabler:calendar-cancel'} sx={{ fontSize: 110, color: 'gainsboro', stroke: 1 }} /> <br />
            <Typography>No events available</Typography>
          </Stack>
        )}

        {/* Gallery Section */}
        <Typography variant="h3" color="text.secondary" mt={5} mb={3} style={{ display: 'flex', justifyContent: 'center' }}>
          Gallery
        </Typography>
        {paginatedPhotos.length > 0 ? (
          <>
            <Grid container spacing={2}>
              {paginatedPhotos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                  <Stack sx={{ borderRadius: 10, boxShadow: 5, overflow: 'hidden' }}>
                    <Image
                      src={`http://localhost:8080${photo.url}`}
                      alt={photo.fileName}
                      width="100%"
                      height="200px"
                      sx={{ objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => handleImageClick(`http://localhost:8080${photo.url}`)}
                    />
                  </Stack>
                </Grid>
              ))}
            </Grid>

            <Pagination
              count={Math.ceil(photos.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{ mt: 3 }}
              color="primary"
            />
          </>
        ) : (
          <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, bgcolor: '#F5F5F5', boxShadow: 1}}>
            <IconifyIcon icon={'tabler:photo-filled'} sx={{ fontSize: 110, color: 'gainsboro', stroke: 1 }} /> <br />
            <Typography>No photos available</Typography>
          </Stack>
        )}
      </Box>

      {/* Image Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>View Image</DialogTitle>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: '100%', maxHeight: '80vh' }}
            />
          </Box>
        </Box>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Homepage;
