import React, { useState, useEffect } from 'react';
import styles from './UserLogin.module.css';
import dayjs from 'dayjs';
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Dialog, DialogContent, DialogActions, Button, TextField, CircularProgress } from '@mui/material';
import { useFetchUserLoginsByDate, useEditParticipationEntry, useDeleteParticipation } from '../../CustomHooks/CustomHooks';

interface UserLoginProps {
  selectedDate: string;
}

const UserLogin: React.FC<UserLoginProps> = ({ selectedDate }) => {
  const [open, setOpen] = useState(false);
  const [proofUrl, setProofUrl] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { userLogins } = useFetchUserLoginsByDate(selectedDate, localStorage.getItem("employeeId") || "");
  const { entry, updateEntry, loading: editLoading, error: editError } = useEditParticipationEntry(editId || 0);
  const { deleteParticipation, loading: deleteLoading, error: deleteError } = useDeleteParticipation();

  useEffect(() => {
    if (entry) {
      setDescription(entry.description);
      setDuration(entry.duration);
      setProofUrl(entry.proofUrl);
    }
  }, [entry]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
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

  const handleEditSave = async () => {
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
      const success = await updateEntry({ description, duration, proofUrl: updatedProofUrl });
      if (success) {
        setMessage('Entry updated successfully.');
        handleEditClose();
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

  const handleEditClick = (id: number, status: string) => {
    if (status === "pending") {
      setEditId(id);
      setEditOpen(true);
    } else {
      setMessage('Edit option is only available for pending status.');
      setMessageOpen(true);
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditId(null);
    setDescription('');
    setDuration(0);
    setProofUrl('');
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

  const filteredEntries = userLogins.filter(entry => dayjs(entry.participationDate).format('YYYY-MM-DD') === selectedDate);

  return (
    <>
      <h3 className={styles.Log}>User Log Entry</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Activity</th>
              <th>Description</th>
              <th>Duration (Min)</th>
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
                <td>{entry.duration}</td>
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
                  <button onClick={() => handleEditClick(entry.id, entry.status)}>
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
        <DialogContent>
          <h3>Edit Entry</h3>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Duration (Min)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            fullWidth
            margin="normal"
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
            style={{ marginTop: '20px', display: 'block' }}
          />
          {uploading && <CircularProgress size={24} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">Cancel</Button>
          <Button onClick={handleEditSave} color="primary" disabled={editLoading || uploading}>
            {editLoading || uploading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <p>Are you sure you want to delete this entry?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary" disabled={deleteLoading}>
            {deleteLoading ? "Deleting..." : "Delete"}
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
    </>
  );
};

export default UserLogin;
