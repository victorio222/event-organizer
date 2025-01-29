import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { Typography, Box } from '@mui/material';
// import axios from 'axios';

const columns: GridColDef[] = [
  {
    field: 'departmentID',
    headerName: 'No.',
    editable: false,
    align: 'left',
    minWidth: 10,
    renderHeader: () => (
      <Typography variant="body2" fontWeight={600} ml={3.4}>
        No.
      </Typography>
    ),
    renderCell: (params) => (
      <Stack ml={4} height={1} direction="column" alignSelf="center" justifyContent="center">
        <Typography variant="body2" fontWeight={500}>
          {params.value}
        </Typography>
      </Stack>
    ),
  },
  {
    field: 'departmentName',
    headerName: 'Colleges',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 200,
  },
];

interface Department {
  departmentID: number;
  departmentName: string;
}

interface DepartmentProps {
  searchText: string;
  departments: Department[]; // Accept departments as prop
}

const Department = ({ searchText, departments }: DepartmentProps) => {
  const [colleges, setColleges] = useState<Department[]>(departments);

  useEffect(() => {
    setColleges(departments); // Set departments from the prop
  }, [departments]);

  const filteredColleges = colleges.filter((college) =>
    college.departmentName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <DataGrid
        density="standard"
        columns={columns}
        rows={filteredColleges}
        getRowId={(row) => row.departmentID}
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
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        slots={{
          pagination: DataGridFooter,
        }}
        pageSizeOptions={[10]}
      />
    </Box>
  );
};

export default Department;
