import React, { useState, useEffect } from 'react';
import styles from './UserLog.module.css';
import dayjs from 'dayjs';
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Dialog, DialogContent, DialogActions, Button, TextField, CircularProgress, Typography } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useFetchUserLoginsByDate, useEditParticipationEntry, useDeleteParticipation } from '../../CustomHooks/CustomHooks';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  durationHours: Yup.number().min(0, 'Hours cannot be negative').required('Hours are required'),
  durationMinutes: Yup.number().min(0, 'Minutes cannot be negative').max(59, 'Minutes must be less than 60').required('Minutes are required'),
});

interface UserLoginProps {
  selectedDate: string;
}

const UserLogin: React.FC<UserLoginProps> = ({ selectedDate }) => {
  const [open, setOpen] = useState(false);
  const [proofUrl, setProofUrl] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-render

  const { userLogins } = useFetchUserLoginsByDate(selectedDate, localStorage.getItem("employeeId") || "",refreshKey);
  const { entry, updateEntry, loading: editLoading, error: editError } = useEditParticipationEntry(editId || 0);
  const { deleteParticipation, loading: deleteLoading, error: deleteError } = useDeleteParticipation();
  useEffect(() => {
    if (entry) {
      setProofUrl(entry.proofUrl);
    }
  }, [entry]);


  // Utility function to convert minutes to HH:MM format
const convertMinutesToHHMM = (minutes: number | null): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFieldValue('file', event.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Proof_preset'); // Replace with your Cloudinary upload preset

    try {
      setUploading(true);
      const response = await fetch('https://api.cloudinary.com/v1_1/drflngubf/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      setMessage('Failed to upload the image.');
      setMessageOpen(true);
      return '';
    } finally {
      setUploading(false);
    }
  };

  // edit
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [selectedProof, setSelectedproof] = useState<File | null>(null);


  useEffect(() => {
  
  }, [refreshKey]);
  const handleEditSave = async (values: any) => {
    const { description, durationHours, durationMinutes } = values;
    const durationInMinutes = durationHours * 60 + durationMinutes;
    let updatedProofUrl = proofUrl;

    if (file) {
      const uploadedUrl = await uploadToCloudinary(file);
      if (uploadedUrl) {
        updatedProofUrl = uploadedUrl;
        setProofUrl(uploadedUrl);
      } else {
        return;
      }
    }

    if (editId) {
      const success = await updateEntry({ description, duration: durationInMinutes, proofUrl: updatedProofUrl });
      if (success) {
        setMessage('Entry updated successfully.');
        handleEditClose();
        setRefreshKey(prevKey => prevKey + 1); // Trigger component re-render
      } else {
        setMessage('Failed to update the entry.');
      }
      setMessageOpen(true);
    }
  };

  const handleOpenProof = (url: string) => {
    if (url) {
      setProofUrl(url);
      setOpen(true);
    }
  };

  const handleCloseProof = () => {
    setOpen(false);
    setProofUrl('');
  };

  const handleEditClick = (id: number, status: string,description: string,duration:number) => {
    console.log('ra',file);
    if (status === "pending") {
      setEditId(id);
      setSelectedDescription(description);
      setSelectedDuration(duration);
      setSelectedproof(file);
      setEditOpen(true);

    } else {
      setMessage('Edit option is only available for pending status.');
      setMessageOpen(true);
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditId(null);
    setFile(null);
  };

  const handleDeleteClick = (id: number, status: string) => {
    if (status === "pending") {
      setDeleteId(id);
      setConfirmOpen(true);
    } else {
      setMessage('Delete option is only available for pending status.');
      setMessageOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      const success = await deleteParticipation(deleteId);
      if (success) {
        setMessage('Entry deleted successfully.');
        // Optionally, refetch or update the state to remove the deleted entry
        setRefreshKey(prevKey => prevKey + 1); // Trigger component re-render
      } else {
        setMessage('Failed to delete the entry.');
      }
      setMessageOpen(true);
      setConfirmOpen(false);
     
    }
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleMessageClose = () => {
    setMessageOpen(false);
    setMessage('');
  };

  const filteredEntries = userLogins.filter(entry => dayjs(entry.participationDate).format('YYYY-MM-DD') === selectedDate).reverse();
 
  
  return (
    <>
      <div className={styles.container}>
       <div className={styles.Log}><h3 >User Log Entry</h3></div>
       <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Activity</th>
              <th>Description</th>
              <th>Duration (Hrs)</th>
              <th>Remarks</th>
              <th>Status</th>
              <th>Proof</th>
              <th>Save/Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.activityIdCategoryName}</td>
                <td>{entry.activityName}</td>
                <td>{entry.description}</td>
                <td>{convertMinutesToHHMM(entry.duration)}</td>
                <td>{entry.remarks}</td>
                <td>{entry.status}</td>
                <td>
                  {entry.proof ? (
                    <button onClick={() => handleOpenProof(entry.proof)}>
                      <FaEye />
                    </button>
                  ) : (
                    <FaEyeSlash />
                  )}
                </td>
                <td>
                  <button onClick={() => handleEditClick(entry.id, entry.status,entry.description,entry.duration)}>
                    <AiOutlineEdit />
                  
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDeleteClick(entry.id, entry.status)}>
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Proof Dialog */}
      <Dialog open={open} onClose={handleCloseProof} maxWidth="sm" fullWidth>
        <DialogContent style={{ textAlign: 'center' }}>
          <img src={proofUrl} alt="Proof" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProof} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
  <Formik
    initialValues={{
      description: selectedDescription || '',  // Set initial description from selectedEntry
      duration: convertMinutesToHHMM(selectedDuration),  // Set initial duration in HH:MM format
      proof: selectedProof || 'saraaa.jpg', // Set initial proof (if applicable)
    }}
    validationSchema={Yup.object().shape({
      description: Yup.string().required('Description is required'),
      duration: Yup.string()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format. Use HH:MM')
        .required('Duration is required'),
    })}
    onSubmit={(values) => {
      const [hours, minutes] = values.duration.split(':').map(Number);
      const durationInMinutes = hours * 60 + minutes;
      handleEditSave({ 
        ...values, 
        durationHours: hours, 
        durationMinutes: minutes, 
        durationInMinutes 
      });
    }}
  >
    {({ setFieldValue }) => (
      <Form>
        <DialogContent>
          <h3>Edit Entry</h3>

          {/* Description Field */}
          <Field
            name="description"
            as={TextField}
            label="Description"
            fullWidth
            margin="normal"
            helperText={<ErrorMessage name="description" />}
            error={Boolean(<ErrorMessage name="description" />)}
          />

          {/* Duration Field */}
          <Field
            name="duration"
            as={TextField}
            label="Duration (HH:MM)"
            fullWidth
            margin="normal"
            helperText={<ErrorMessage name="duration" />}
            error={Boolean(<ErrorMessage name="duration" />)}
            placeholder="00:00"
          />

          {/* Proof File Input */}
          <input
            accept="image/*"
            type="file"
            onChange={(event) => handleFileChange(event, setFieldValue)}
            style={{ marginTop: '20px', display: 'block' }}
          />
          {uploading && <CircularProgress size={24} />}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">Cancel</Button>
          <Button type="submit" color="primary" disabled={editLoading || uploading}>
            {editLoading || uploading ? (
              <>
                <CircularProgress size={24} style={{ marginRight: '10px' }} />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </Form>
    )}
  </Formik>
</Dialog>


      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <p>Are you sure you want to delete this entry?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary" disabled={deleteLoading}>
            {deleteLoading ? (
              <>
                <CircularProgress size={24} style={{ marginRight: '10px' }} />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={messageOpen} onClose={handleMessageClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMessageClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      </div>
    </>
  );
};

export default UserLogin;
