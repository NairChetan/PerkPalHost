import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFetchCategories, useFetchActivities, useSubmitParticipation } from '../../../CustomHooks/CustomHooks';
import styles from './NewEntry.module.css';
import { LuSave } from "react-icons/lu";
import { Modal } from '@mui/material';

const NewEntry = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [proof, setProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openLoadingPopup, setOpenLoadingPopup] = useState(false); // New state for loading popup
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false); // New state for success popup

  const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories('/api/v1/category/category-name-only');
  const { activities, loading: activitiesLoading, error: activitiesError } = useFetchActivities(selectedCategory);
  const { submitParticipation } = useSubmitParticipation();

  useEffect(() => {
    if (categoriesError) setError(categoriesError);
    if (activitiesError) setError(activitiesError);
  }, [categoriesError, activitiesError]);

  const formik = useFormik({
    initialValues: {
      category: '',
      activity: '',
      description: '',
      duration: '',
      proof: '',
    },
    validationSchema: Yup.object({
      category: Yup.string().required('Category is required'),
      activity: Yup.string().required('Activity is required'),
      description: Yup.string().required('Description is required'),
      duration: Yup.number()
        .typeError('Duration must be a number')
        .positive('Duration must be greater than zero')
        .integer('Duration must be an integer')
        .required('Duration is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setError(null);
      setOpenLoadingPopup(true); // Show loading popup
      const employeelocal = localStorage.getItem("employeeId");

      try {
        // Cloudinary upload
        const formData = new FormData();
        formData.append('file', proof!);
        formData.append('upload_preset', 'Proof_preset');  // Replace with your Cloudinary upload preset

        const response = await fetch(`https://api.cloudinary.com/v1_1/drflngubf/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          const entry = {
            categoryName: values.category,
            activityName: values.activity,
            description: values.description,
            duration: values.duration,
            proofUrl: result.secure_url,
            createdBy: employeelocal,
            employeeEmpId: employeelocal,
          };

          await submitParticipation(entry);
          resetForm();
          setOpenLoadingPopup(false); // Close loading popup
          setOpenSuccessPopup(true); // Show success popup
        } else {
          setError('Error uploading proof: ' + result.error.message);
          setOpenLoadingPopup(false); // Close loading popup
        }
      } catch (err) {
        console.log(err);
        setError('Error submitting your entry');
        setOpenLoadingPopup(false); // Close loading popup
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProof(event.target.files[0]);
    }
  };

  const handleCloseSuccessPopup = () => {
    setOpenSuccessPopup(false);
    
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div>
          <h3 className={styles.heading}>Clock in your points!</h3>
          <p className={styles.paraghraph}>Log in your activity here to avail points</p>
        </div>
        <img
          src="../../../src/assets/images/cheer 1.png"
          alt="Celebration Icon"
          className={styles.headingImage}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <select
          className={styles.input}
          name="category"
          onChange={(e) => {
            formik.handleChange(e);
            setSelectedCategory(e.target.value);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.category}
          disabled={categoriesLoading}
        >
          <option value="" label="Select category" />
          {(categories || []).map((category) => (
            <option key={category.categoryName} value={category.categoryName}>{category.categoryName}</option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div className={styles.error}>{formik.errors.category}</div>
        ) : null}

        <select
          className={styles.input}
          name="activity"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.activity}
          disabled={formik.values.category === '' || activitiesLoading}
        >
          <option value="" label="Select activity" />
          {(activities || []).map((activity) => (
            <option key={activity.activityName} value={activity.activityName}>{activity.activityName}</option>
          ))}
        </select>
        {formik.touched.activity && formik.errors.activity ? (
          <div className={styles.error}>{formik.errors.activity}</div>
        ) : null}

        <input
          className={styles.input}
          name="description"
          type="text"
          placeholder="Description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className={styles.error}>{formik.errors.description}</div>
        ) : null}

        <input
          className={styles.input}
          name="duration"
          type="number"
          placeholder="Duration in minutes"
          onChange={(e) => {
            const value = e.target.value;
            formik.setFieldValue('duration', value ? parseInt(value, 10) : '');
          }}
          onBlur={formik.handleBlur}
          value={formik.values.duration}
        />
        {formik.touched.duration && formik.errors.duration ? (
          <div className={styles.error}>{formik.errors.duration}</div>
        ) : null}
        <h5>Upload Proof</h5>
        <input
          accept="image/*"
          type="file"
          onChange={handleFileChange}
        />

        <button type="submit" className={styles.submit} disabled={loading}>
          <LuSave className={styles.icon} /> Submit
        </button>
      </form>

      {/* Loading Popup */}
      <Modal
        open={openLoadingPopup}
        className={styles.popup}
      >
        <div className={styles.popupContent}>
          <div className={styles.loader}></div>
          <p>Submitting...</p>
        </div>
      </Modal>

      {/* Success Popup */}
      <Modal
        open={openSuccessPopup}
        onClose={handleCloseSuccessPopup}
        className={styles.popup}
      >
        <div className={styles.popupContent}>
          <h3>Success!</h3>
          <p>Submitted Successfully</p>
          <button onClick={handleCloseSuccessPopup}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default NewEntry;
