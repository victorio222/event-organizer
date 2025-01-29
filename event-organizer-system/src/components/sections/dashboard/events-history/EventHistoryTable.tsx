import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { Typography, Box } from '@mui/material';
import axios from 'axios';
import { useUserContext } from 'contexts/UserContext';

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
}

interface TaskOverviewTableProps {
  searchText: string;
}

const EventHistoryTable = ({ searchText }: TaskOverviewTableProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/events/organizer/${user.userID}`);
        
        // Sort the events by createdAt in descending order (latest first)
        const sortedEvents = response.data.sort((a: Event, b: Event) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime(); // Descending order
        });

        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user.userID]);

  // Filter events based on the search text
  const filteredEvents = events.filter(event =>
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
        autoHeight={false} // Allow vertical scrolling if content overflows
        sx={{
          height: '100%',
          width: '100%',
          border: 'none',
          px: 4.5,
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 4 } },
        }}
        slots={{
          pagination: DataGridFooter,
        }}
        pageSizeOptions={[4]}
        loading={loading}
      />
    </Box>
  );
};

export default EventHistoryTable;
