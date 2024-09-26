/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFetchCategories, useAddNewActivityForAdmin } from '../../CustomHooks/CustomHooks';
import styles from './NewActivity.module.css';
import { LuSave } from "react-icons/lu";
import { Modal } from '@mui/material';

const NewActivity = () => {
  const [openLoadingPopup, setOpenLoadingPopup] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { categories, loading: categoriesLoading } = useFetchCategories('/api/v1/category/category-name-only');
  const { addNewActivity } = useAddNewActivityForAdmin();

  const formik = useFormik({
    initialValues: {
      activityName: '',
      categoryName: '',
      description: '',
      createdBy: '',
      weightagePerHour: '',
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required('Category is required'),
      activityName: Yup.string().required('Activity is required'),
      description: Yup.string().required('Description is required'),
      weightagePerHour: Yup.number()
        .typeError('Weightage per hour must be a number')
        .positive('Weightage per hour must be greater than zero')
        .required('Weightage per hour is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setError(null);
      setOpenLoadingPopup(true);

      const category = categories.find(cat => cat.categoryName === values.categoryName);

      if (!category) {
        setError('Selected category is not valid');
        setOpenLoadingPopup(false);
        return;
      }

      const entry = {
        activityName: values.activityName,
        categoryId: category.id,
        description: values.description,
        weightagePerHour: parseInt(values.weightagePerHour, 10),
        createdBy: parseInt(localStorage.getItem("employeeId") || '0', 10),
      };

      const success = await addNewActivity(entry);

      if (success) {
        resetForm();
        setOpenSuccessPopup(true);
      } else {
        setError('Failed to add new activity');
      }

      setOpenLoadingPopup(false);
    },
  });

  const handleCloseSuccessPopup = () => {
    setOpenSuccessPopup(false);
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div>
          <h3 className={styles.heading}>Add New Activity!</h3>
          <p className={styles.paraghraph}>Enter the details to add new Activity</p>
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
          name="categoryName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.categoryName}
          disabled={categoriesLoading}
        >
          <option value="" label="Select category" />
          {(categories || []).map((category) => (
            <option key={category.id} value={category.categoryName}>{category.categoryName}</option>
          ))}
        </select>
        {formik.touched.categoryName && formik.errors.categoryName ? (
          <div className={styles.error}>{formik.errors.categoryName}</div>
        ) : null}

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
          <p>Submitted Successfully</p>
          <button onClick={handleCloseSuccessPopup}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default NewActivity;
