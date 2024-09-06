import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFetchActivitiesForAdmin, useUpdateActivityForAdmin } from '../../CustomHooks/CustomHooks';
import styles from './UpdateActivity.module.css';
import { LuSave } from "react-icons/lu";
import { Modal } from '@mui/material';

const UpdateActivity = ({ activityId }: { activityId: number }) => {
  const [openLoadingPopup, setOpenLoadingPopup] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { activities, loading: activitiesLoading, error: activitiesError } = useFetchActivitiesForAdmin();
  const { updateActivity } = useUpdateActivityForAdmin();

  const [initialValues, setInitialValues] = useState({
    activityName: '',
    description: '',
    weightagePerHour: ''
  });

  useEffect(() => {
    if (activities && activityId) {
      const activity = activities.find((act: any) => act.id === activityId);
     
      if (activity) {
        setInitialValues({
          activityName: activity.activityName || '',
          description: activity.description || '',
          weightagePerHour: activity.weightagePerHour || ''
        });
      }
    }
  }, [activities, activityId]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      activityName: Yup.string().required('Activity Name is required'),
      description: Yup.string().required('Description is required'),
      weightagePerHour: Yup.number()
        .typeError('Points per hour must be a number')
        .positive('Points per hour must be greater than zero')
        .required('Points per hour is required'),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError(null);
      setOpenLoadingPopup(true);

      const success = await updateActivity(activityId, {
        activityName: values.activityName,
        description: values.description,
        updatedBy: parseInt(localStorage.getItem("employeeId") || '0', 10),
        weightagePerHour: parseInt(values.weightagePerHour, 10),
      });

      if (success) {
        setOpenSuccessPopup(true);
      } else {
        setError('Failed to update activity');
      }

      setOpenLoadingPopup(false);
    },
  });

  const handleCloseSuccessPopup = () => {
    setOpenSuccessPopup(false);
    window.location.reload(); // Refresh to reflect changes
  };

  if (activitiesLoading) return <p>Loading...</p>;
  if (activitiesError) return <p>Error fetching activities: {activitiesError}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div>
          <h3 className={styles.heading}>Update Activity!</h3>
          <p className={styles.paragraph}>Edit the details to update the activity</p>
        </div>
        <img
          src="../../../src/assets/images/cheer 1.png"
          alt="Celebration Icon"
          className={styles.headingImage}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <input
          className={styles.input}
          name="activityName"
          type="text"
          placeholder="Activity Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.activityName}
        />
        {formik.touched.activityName && formik.errors.activityName ? (
          <div className={styles.error}>{formik.errors.activityName}</div>
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
          name="weightagePerHour"
          type="number"
          placeholder="Weightage Per Hour"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.weightagePerHour}
        />
        {formik.touched.weightagePerHour && formik.errors.weightagePerHour ? (
          <div className={styles.error}>{formik.errors.weightagePerHour}</div>
        ) : null}

        <button type="submit" className={styles.submit} disabled={formik.isSubmitting}>
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
          <p>Updated Successfully</p>
          <button onClick={handleCloseSuccessPopup}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateActivity;
