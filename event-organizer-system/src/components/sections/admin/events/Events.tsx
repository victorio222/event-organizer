import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { Typography, Box } from '@mui/material';
import ActionMenu from './ActionMenu';
import axios from 'axios';

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Event Name',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 200,
  },
  {
    field: 'description',
    headerName: 'Description',
    editable: false,
    align: 'left',
    flex: 3,
    minWidth: 250,
  },
  {
    field: 'location',
    headerName: 'Location',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 150,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 120,
    renderCell: (params) => {
      const date = new Date(params.value);
      const dateString = date.toLocaleDateString();
      return (
        <Typography variant="body2" mt={2}>
          {dateString}
        </Typography>
      );
    },
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 80,
    renderCell: (params) => {
      const date = new Date(params.value);
      const dateString = date.toLocaleDateString();
      return (
        <Typography variant="body2" mt={2}>
          {dateString}
        </Typography>
      );
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center',
    editable: false,
    flex: 1,
    minWidth: 100,
    renderCell: (params) => {
      const color =
        params.value === 'Pending'
          ? 'warning'
          : params.value === 'Approved'
            ? 'success'
            : params.value === 'Declined'
              ? 'error'
              : 'info';
      return (
        <Stack direction="column" alignItems="center" justifyContent="center" height={1}>
          <Chip label={params.value} size="small" color={color} />
        </Stack>
      );
    },
  },
  {
    field: 'action',
    headerName: 'Action',
    headerAlign: 'center',
    align: 'center',
    editable: false,
    sortable: false,
    flex: 1,
    minWidth: 100,
    renderCell: (params) => <ActionMenu eventId={params.row.eventID} title={params.row.title} organizerID={params.row.organizer.userID} email={params.row.organizer.email} location={params.row.location} startDate={params.row.startDate} description={params.row.description} status={params.row.status}  />,
  },
];

interface Event {
  eventID: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  status: string;
  createdAt: string;  // Assuming this field exists
  organizer: {
    userID: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface TaskOverviewTableProps {
  searchText: string;
}

const Events = ({ searchText }: TaskOverviewTableProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        
        // Sort the events by createdAt in descending order (latest first)
        const sortedEvents = response.data.sort((a: Event, b: Event) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime(); // Descending order
        });

        setEvents(sortedEvents);
        console.log(sortedEvents); // Optionally log the sorted events
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on the search text
  const filteredEvents = events.filter(event =>
    (event.status === "Approved" || event.status === "Pending") &&
    event.title && event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <DataGrid
        density="standard"
        columns={columns}
        rows={filteredEvents}
        getRowId={(row) => row.eventID}
        rowHeight={52}
        disableColumnResize
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight={false}
        sx={{
          height: '100%',
          width: '100%',
          border: 'none',
          pl: 4,
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        slots={{
          pagination: DataGridFooter,
        }}
        pageSizeOptions={[10]}
        loading={loading}
      />
    </Box>
  );
};

export default Events;
