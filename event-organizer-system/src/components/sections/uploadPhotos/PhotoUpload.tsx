// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Grid, Button, Alert, Modal, Typography, Paper, Stack } from '@mui/material';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import IconifyIcon from 'components/base/IconifyIcon';
// import Swal from 'sweetalert2';
// import { Trash2 } from 'lucide-react';

// interface Photo {
//   id: number;
//   fileName: string;
//   filePath: string;
//   uploadDate: string;
//   url: string;
// }

// interface Folder {
//   id: number;
//   name: string;
// }

// const PhotoUpload: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [photos, setPhotos] = useState<Photo[]>([]);
//   const [folders, setFolders] = useState<Folder[]>([]);
//   const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [currentImage, setCurrentImage] = useState<string | null>(null);

//   useEffect(() => {
//     fetchFolders();
//   }, []);

//   useEffect(() => {
//     if (selectedFolder) {
//       fetchPhotos(selectedFolder.id);
//     }
//   }, [selectedFolder]);

//   const fetchFolders = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/folders');
//       setFolders(response.data);
//     } catch (err) {
//       setError('Error fetching folders');
//     }
//   };

//   const fetchPhotos = async (folderId: number) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/photos/folder/${folderId}`);
//       setPhotos(response.data);
//     } catch (err) {
//       setError('Error fetching photos');
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
//       setSelectedFile(file);

//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile || !selectedFolder) {
//       alert('Please select a file and folder to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', selectedFile);
//     formData.append('folderId', String(selectedFolder.id));

//     try {
//       setIsLoading(true);
//       const response = await axios.post(`http://localhost:8080/api/photos/upload/${selectedFolder.id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setPhotos((prevPhotos) => [...prevPhotos, response.data]);
//       setSelectedFile(null);
//       setImagePreview(null);
      
//       Swal.fire('Success', 'Photo uploaded successfully!', 'success');
//     } catch (err) {
//       setError('Error uploading photo');
//     } finally {
//       setIsLoading(false);
//       setShowModal(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm('Are you sure you want to delete this photo?')) return;

//     try {
//       await axios.delete(`http://localhost:8080/api/photos/${id}`);
//       setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));

//       Swal.fire('Deleted!', 'Photo has been deleted.', 'success');
//     } catch (err) {
//       setError('Error deleting photo');
//     }
//   };

//   const handleCreateFolder = async () => {
//     const folderName = prompt('Enter folder name:');
//     if (folderName) {
//       try {
//         const response = await axios.post('http://localhost:8080/api/folders/create', null, {
//           params: { name: folderName },
//         });
//         setFolders((prevFolders) => [...prevFolders, response.data]);
//       } catch (err) {
//         alert('Error creating folder');
//       }
//     } else {
//       alert('Folder name is required.');
//     }
//   };

//   const handleFolderSelect = (folder: Folder) => {
//     setSelectedFolder(folder);
//   };

//   const handleGoBack = () => {
//     setSelectedFolder(null);
//   };

//   const handleImageClick = (imageUrl: string) => {
//     setCurrentImage(imageUrl);
//     setShowImageModal(true);
//   };

//   const handleCloseImageModal = () => {
//     setShowImageModal(false);
//     setCurrentImage(null);
//   };

//   return (
//     <Grid container spacing={3}>
//       {!selectedFolder ? (
//         <Grid item xs={12}>
//           <Grid sx={{ display: "flex", alignItems: "center", pb: 1, width: "100%", justifyContent: "space-between" }}>
//             <Typography variant="h5">Folders</Typography>
//             <Button variant="contained" onClick={handleCreateFolder}>
//               New Folder
//             </Button>
//           </Grid>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginBottom: '20px', borderTop: '1px gainsboro solid' }}>
//             {folders.length > 0 ? (
//               folders.map((folder) => (
//                 <Paper
//                   key={folder.id}
//                   sx={{
//                     padding: '10px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'start',
//                     justifyContent: 'start',
//                     borderRadius: '0px',
//                     borderBottom: '1px gainsboro solid',
//                     textTransform: 'capitalize',
//                     cursor: 'pointer',
//                     backgroundColor: '#f9f9f9',
//                     transition: 'background-color 0.2s ease',
//                     '&:hover': {
//                       backgroundColor: '#e0e0e0',
//                     },
//                   }}
//                   onClick={() => handleFolderSelect(folder)}
//                 >
//                   <Typography variant="body2">{folder.name}</Typography>
//                 </Paper>
//               ))
//             ) : (
//               <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '70vh' }}>
//                 <IconifyIcon icon={'ic:round-folder-off'} sx={{ fontSize: 230, color: 'gray', stroke: 1 }} /> <br />
//                 <Typography>No folders available</Typography>
//               </Stack>
//             )}
//           </div>
//         </Grid>
//       ) : (
//         <Grid item xs={12}>
//           <Grid sx={{ display: "flex", alignItems: "center", pb: 1, width: "100%", justifyContent: "space-between" }}>
//             <Stack sx={{ display: "flex", alignItems: "center", ml: -4 }}>
//               <Button onClick={handleGoBack} sx={{ marginRight: 0 }}>
//                 <IconifyIcon icon={'ic:sharp-arrow-back-ios-new'} sx={{ fontSize: 25 }} />
//               </Button>
//               <Typography variant="h4">Photos in {selectedFolder.name}</Typography>
//             </Stack>
//             <Button
//               onClick={() => setShowModal(true)}
//               variant="contained"
//               sx={{ marginBottom: '20px' }}
//             >
//               Add Photo
//             </Button>
//           </Grid>
//           <Grid container spacing={2}>
//             {photos.length > 0 ? (
//               photos.map((photo) => (
//                 <Grid item key={photo.id} xs={6} sm={4} md={3} >
//                   <Paper elevation={3} sx={{ padding: 0, position: 'relative', backgroundColor: '#e0e0e0', borderRadius: 0 }}>
//                     <img
//                       src={`http://localhost:8080${photo.url}`}
//                       alt={photo.fileName}
//                       style={{ width: '100%', height: '200px', objectFit: 'cover', cursor: 'pointer' }}
//                       onClick={() => handleImageClick(`http://localhost:8080${photo.url}`)}
//                     />
//                     <Button
//                       onClick={() => handleDelete(photo.id)}
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'end',
//                         color: 'red',
//                         width: '100%',
//                       }}
//                     >
//                       <Trash2 />
//                     </Button>
//                   </Paper>
//                 </Grid>
//               ))
//             ) : (
//               <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '70vh' }}>
//                 <IconifyIcon icon={'ic:outline-image-not-supported'} sx={{ fontSize: 230, color: 'gray', stroke: 1 }} /> <br />
//                 <Typography>No photos available</Typography>
//               </Stack>
//             )}
//           </Grid>
//         </Grid>
//       )}

//       {error && (
//         <Grid item xs={12}>
//           <Alert severity="error">{error}</Alert>
//         </Grid>
//       )}

//       <Modal open={showModal} onClose={() => setShowModal(false)}>
//         <Paper sx={{ padding: '20px', margin: '60px auto', width: '500px' }}>
//           <Typography variant="h6" pb={2}>Upload Photo</Typography>
//           <input type="file" onChange={handleFileChange} />
//           {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 300, margin: '10px 0' }} />}
//           <Stack sx={{display: 'flex', justifyContent: 'end'}}>
//           <Button sx={{mt: 3}} onClick={handleUpload} disabled={isLoading} variant="contained">
//             {isLoading ? 'Uploading...' : 'Upload'}
//           </Button>
//           </Stack>
//         </Paper>
//       </Modal>

//       <Modal open={showImageModal} onClose={handleCloseImageModal}>
//         <Paper
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '90%',
//             maxWidth: '800px',
//             maxHeight: '90vh',
//             overflowY: 'auto',
//             padding: '20px',
//             backgroundColor: 'gray'
//           }}
//         >
//           <Button onClick={handleCloseImageModal} sx={{ position: 'absolute', top: '10px', right: '10px' }}>
//             Close
//           </Button>
//           {currentImage && <img src={currentImage} alt="Selected" style={{ width: '100%' }} />}
//         </Paper>
//       </Modal>
//     </Grid>
//   );
// };

// export default PhotoUpload;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Grid, Button, Typography, Paper, Modal, Stack } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash2 } from 'lucide-react';
import IconifyIcon from 'components/base/IconifyIcon';


interface Photo {
  id: number;
  fileName: string;
  filePath: string;
  uploadDate: string;
  url: string;
}

interface Folder {
  id: number;
  name: string;
}

const PhotoUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    if (selectedFolder) {
      fetchPhotos(selectedFolder.id);
    }
  }, [selectedFolder]);

  const fetchFolders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/folders');
      setFolders(response.data);
    } catch {
      Swal.fire('Error', 'Failed to fetch folders', 'error');
    }
  };

  const fetchPhotos = async (folderId: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/photos/folder/${folderId}`);
      setPhotos(response.data);
    } catch {
      Swal.fire('Error', 'Failed to fetch photos', 'error');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedFolder) {
      Swal.fire('Warning', 'Please select a file and folder to upload.', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('folderId', String(selectedFolder.id));

    try {
      setIsLoading(true);
      const response = await axios.post(`http://localhost:8080/api/photos/upload/${selectedFolder.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPhotos((prevPhotos) => [...prevPhotos, response.data]);
      setSelectedFile(null);
      setImagePreview(null);
      setShowModal(false);
      Swal.fire('Success', 'Photo uploaded successfully!', 'success');
    } catch {
      Swal.fire('Error', 'Failed to upload photo', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (photo: Photo) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete the photo "${photo.fileName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/photos/${photo.id}`);
        setPhotos((prevPhotos) => prevPhotos.filter((p) => p.id !== photo.id));
        Swal.fire('Deleted!', 'Your photo has been deleted.', 'success');
      } catch {
        Swal.fire('Error', 'Failed to delete photo', 'error');
      }
    }
  };

  const handleCreateFolder = async () => {
    const { value: folderName } = await Swal.fire({
      title: 'Enter folder name',
      input: 'text',
      inputPlaceholder: 'Folder name',
      showCancelButton: true,
    });

    if (folderName) {
      try {
        const response = await axios.post('http://localhost:8080/api/folders/create', null, {
          params: { name: folderName },
        });
        setFolders((prevFolders) => [...prevFolders, response.data]);
        Swal.fire('Success', 'Folder created successfully!', 'success');
      } catch {
        Swal.fire('Error', 'Failed to create folder', 'error');
      }
    }
  };

  const handleFolderSelect = (folder: Folder) => {
    setSelectedFolder(folder);
  };

  const handleGoBack = () => {
    setSelectedFolder(null);
  };

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setCurrentImage(null);
  };

  return (
    <Grid container spacing={3}>
      {!selectedFolder ? (
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ pb: 1 }}>
            <Typography variant="h5">Folders</Typography>
            <Button variant="contained" onClick={handleCreateFolder}>
              New Folder
            </Button>
          </Grid>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginBottom: '20px', borderTop: '1px gainsboro solid' }}>
            {folders.length > 0 ? (
              folders.map((folder) => (
                <Paper
                  key={folder.id}
                  sx={{
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'start',
                    borderRadius: '0px',
                    borderBottom: '1px gainsboro solid',
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                    },
                  }}
                  onClick={() => handleFolderSelect(folder)}
                >
                  <Typography variant="body2">{folder.name}</Typography>
                </Paper>
              ))
            ) : (
              <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '70vh' }}>
                <IconifyIcon icon={'ic:round-folder-off'} sx={{ fontSize: 230, color: 'gray', stroke: 1 }} /> <br />
                <Typography>No folders available</Typography>
              </Stack>
            )}
          </div>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Grid sx={{ display: "flex", alignItems: "center", pb: 1, width: "100%", justifyContent: "space-between" }}>
            <Stack sx={{ display: "flex", alignItems: "center", ml: -4 }}>
              <Button onClick={handleGoBack} sx={{ marginRight: 0 }}>
                <IconifyIcon icon={'ic:sharp-arrow-back-ios-new'} sx={{ fontSize: 25 }} />
              </Button>
              <Typography variant="h4">Photos in {selectedFolder.name}</Typography>
            </Stack>
            <Button
              onClick={() => setShowModal(true)}
              variant="contained"
              sx={{ marginBottom: '20px' }}
            >
              Add Photo
            </Button>
          </Grid>
          <Grid container spacing={2}>
            {photos.length > 0 ? (
              photos.map((photo) => (
                <Grid item key={photo.id} xs={6} sm={4} md={3} >
                  <Paper elevation={3} sx={{ padding: 0, position: 'relative', backgroundColor: '#e0e0e0', borderRadius: 0 }}>
                    <img
                      src={`http://localhost:8080${photo.url}`}
                      alt={photo.fileName}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => handleImageClick(`http://localhost:8080${photo.url}`)}
                    />
                    <Button
                      onClick={() => handleDelete(photo)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        color: 'red',
                        width: '100%',
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '70vh' }}>
                <IconifyIcon icon={'ic:outline-image-not-supported'} sx={{ fontSize: 230, color: 'gray', stroke: 1 }} /> <br />
                <Typography>No photos available</Typography>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}

<Modal open={showModal} onClose={() => setShowModal(false)}>
        <Paper sx={{ padding: '20px', margin: '60px auto', width: '500px' }}>
          <Typography variant="h6" pb={2}>Upload Photo</Typography>
          <input type="file" onChange={handleFileChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 300, margin: '10px 0' }} />}
          <Stack sx={{display: 'flex', justifyContent: 'end'}}>
          <Button sx={{mt: 3}} onClick={handleUpload} disabled={isLoading} variant="contained">
            {isLoading ? 'Uploading...' : 'Upload'}
          </Button>
          </Stack>
        </Paper>
      </Modal>

      <Modal open={showImageModal} onClose={handleCloseImageModal}>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: 'gray'
          }}
        >
          <Button onClick={handleCloseImageModal} sx={{ position: 'absolute', top: '10px', right: '10px' }}>
            Close
          </Button>
          {currentImage && <img src={currentImage} alt="Selected" style={{ width: '100%' }} />}
        </Paper>
      </Modal>
    </Grid>
  );
};

export default PhotoUpload;
