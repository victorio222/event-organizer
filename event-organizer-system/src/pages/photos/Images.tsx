import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Grid, Button, Typography, Paper, Modal, Stack } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      {/* Folders Section */}
      {!selectedFolder ? (
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            Folders
          </Typography>
          <Grid container spacing={2}>
            {folders.length > 0 ? (
              folders.map((folder) => (
                <Grid item key={folder.id} xs={6} sm={4} md={3}>
                  <Paper
                    sx={{
                      padding: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 2,
                      boxShadow: 3,
                      cursor: 'pointer',
                      backgroundColor: '#f9f9f9',
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
                        boxShadow: 5,
                      },
                    }}
                    onClick={() => handleFolderSelect(folder)}
                  >
                    <IconifyIcon icon="material-symbols:folder" sx={{ fontSize: 40, color: 'gray' }} />
                    <Typography variant="h6" sx={{ marginTop: 1 }}>
                      {folder.name}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
                  <IconifyIcon icon={'ic:round-folder-off'} sx={{ fontSize: 230, color: 'gray', stroke: 1 }} />
                  <Typography>No folders available</Typography>
                </Stack>
              </Grid>
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" sx={{ paddingBottom: 2 }}>
            <Button onClick={handleGoBack} sx={{ marginRight: 2 }}>
              <IconifyIcon icon={'ic:sharp-arrow-back-ios-new'} sx={{ fontSize: 25 }} />
            </Button>
            <Typography variant="h4">Photos in {selectedFolder.name}</Typography>
          </Stack>
          <Grid container spacing={2}>
            {photos.length > 0 ? (
              photos.map((photo) => (
                <Grid item key={photo.id} xs={6} sm={4} md={3}>
                  <Paper elevation={3} sx={{ padding: 0, borderRadius: 2, backgroundColor: '#e0e0e0', position: 'relative' }}>
                    <img
                      src={`http://localhost:8080${photo.url}`}
                      alt={photo.fileName}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                      onClick={() => handleImageClick(`http://localhost:8080${photo.url}`)}
                    />
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
                  <IconifyIcon icon={'ic:outline-image-not-supported'} sx={{ fontSize: 230, color: 'gray', stroke: 1 }} />
                  <Typography>No photos available</Typography>
                </Stack>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}

      {/* Upload Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Paper sx={{ padding: 3, margin: '60px auto', width: 500 }}>
          <Typography variant="h6" pb={2}>Upload Photo</Typography>
          <input type="file" onChange={handleFileChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 300, margin: '10px 0' }} />
          )}
          <Stack direction="row" justifyContent="flex-end">
            <Button onClick={handleUpload} disabled={isLoading} variant="contained" sx={{ marginTop: 2 }}>
              {isLoading ? 'Uploading...' : 'Upload'}
            </Button>
          </Stack>
        </Paper>
      </Modal>

      {/* Image Modal */}
      <Modal open={showImageModal} onClose={handleCloseImageModal}>
        <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 2, backgroundColor: 'gray', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
          <Button onClick={handleCloseImageModal} sx={{ position: 'absolute', top: 10, right: 10, color: 'white' }}>
            Close
          </Button>
          {currentImage && <img src={currentImage} alt="Selected" style={{ width: '100%', borderRadius: '8px' }} />}
        </Paper>
      </Modal>
    </Grid>
  );
};

export default PhotoUpload;
