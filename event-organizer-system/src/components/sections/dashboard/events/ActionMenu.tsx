// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import IconifyIcon from 'components/base/IconifyIcon';

// interface Action {
//   id: number;
//   icon: string;
//   title: string;
// }

// const actions: Action[] = [
//   {
//     id: 1,
//     icon: 'ic:baseline-edit',
//     title: 'Edit',
//   },
//   {
//     id: 2,
//     icon: 'ic:baseline-delete-outline',
//     title: 'Remove',
//   },
// ];

// const ActionMenu = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleActionButtonClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleActionMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleActionItemClick = () => {
//     handleActionMenuClose();
//   };

//   return (
//     <Box pr={2}>
//       <IconButton
//         onClick={handleActionButtonClick}
//         sx={{ p: 0.75, border: 'none', bgcolor: 'transparent !important' }}
//         size="medium"
//       >
//         <IconifyIcon icon="solar:menu-dots-bold" color="text.primary" />
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={handleActionMenuClose}
//         onClick={handleActionMenuClose}
//         sx={{
//           mt: 0.5,
//           '& .MuiList-root': {
//             width: 140,
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         {actions.map((actionItem) => {
//           return (
//             <MenuItem key={actionItem.id} onClick={handleActionItemClick}>
//               <ListItemIcon sx={{ mr: 1, fontSize: 'h5.fontSize' }}>
//                 <IconifyIcon
//                   icon={actionItem.icon}
//                   color={actionItem.id === 2 ? 'error.main' : 'text.primary'}
//                 />
//               </ListItemIcon>
//               <ListItemText>
//                 <Typography color={actionItem.id === 2 ? 'error.main' : 'text.primary'}>
//                   {actionItem.title}
//                 </Typography>
//               </ListItemText>
//             </MenuItem>
//           );
//         })}
//       </Menu>
//     </Box>
//   );
// };

// export default ActionMenu;








import { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconifyIcon from 'components/base/IconifyIcon';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Organizer {
  userID: number;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  colleges: {
    departmentID: number;
    departmentName: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface EventData {
  eventID: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: Organizer;
  createdAt: string;
  updatedAt: string;
  status: string;
}

interface Action {
  id: number;
  icon: string;
  title: string;
}

const actions: Action[] = [
  {
    id: 1,
    icon: 'ic:baseline-edit',
    title: 'Edit',
  },
  // {
  //   id: 2,
  //   icon: 'ic:baseline-delete-outline',
  //   title: 'Remove',
  // },
];

const ActionMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [formData, setFormData] = useState<EventData | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const eventID = 1; // Example event ID, adjust as needed

  const handleActionButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionItemClick = () => {
    handleActionMenuClose();
    fetchEventData();
    setOpen(true);
  };

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/events/${eventID}`);
      setEventData(response.data);
      setFormData(response.data); // Populate form with event data
    } catch (error) {
      enqueueSnackbar('Failed to fetch event data', { variant: 'error' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        await axios.put(`http://localhost:8080/api/events/${eventID}`, formData);
        enqueueSnackbar('Event updated successfully', { variant: 'success' });
        setOpen(false);

        Swal.fire({
                  title: 'Done',
                  text: "Event updated successfully!",
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
      } catch (error) {
        enqueueSnackbar('Failed to update event', { variant: 'error' });
      }
    }
  };

  return (
    <Box pr={2}>
      <IconButton
        onClick={handleActionButtonClick}
        sx={{ p: 0.75, border: 'none', bgcolor: 'transparent !important' }}
        size="medium"
      >
        <IconifyIcon icon="solar:menu-dots-bold" color="text.primary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleActionMenuClose}
        sx={{
          mt: 0.5,
          '& .MuiList-root': {
            width: 140,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {actions.map((actionItem) => (
          <MenuItem key={actionItem.id} onClick={handleActionItemClick}>
            <ListItemIcon sx={{ mr: 1, fontSize: 'h5.fontSize' }}>
              <IconifyIcon
                icon={actionItem.icon}
                color={actionItem.id === 2 ? 'error.main' : 'text.primary'}
              />
            </ListItemIcon>
            <ListItemText>
              <Typography color={actionItem.id === 2 ? 'error.main' : 'text.primary'}>
                {actionItem.title}
              </Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {/* Modal Form for Editing Event */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="edit-event-modal"
        aria-describedby="edit-event-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Event
          </Typography>
          {eventData && (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                name="title"
                value={formData?.title || ''}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                name="description"
                value={formData?.description || ''}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Location"
                name="location"
                value={formData?.location || ''}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Start Date"
                type="datetime-local"
                name="startDate"
                value={formData?.startDate || ''}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="End Date"
                type="datetime-local"
                name="endDate"
                value={formData?.endDate || ''}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Changes
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ActionMenu;
