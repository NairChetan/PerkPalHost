import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFetchCategories, useFetchActivities, useSubmitParticipation } from '../../../CustomHooks/CustomHooks'; // Assuming these hooks are in a hooks.js file
import styles from './NewEntry.module.css';
import { LuSave } from "react-icons/lu";
import NewCategoryRequest from '../../Button/NewCategoryRequest';

const NewEntry = ({ addEntry }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  console.log(selectedCategory);

  const [proof, setProof] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { categories, loading: categoriesLoading, error: categoriesError } = useFetchCategories('/api/v1/category/category-name-only');
  const { activities, loading: activitiesLoading, error: activitiesError } = useFetchActivities(selectedCategory);
  const { submitParticipation } = useSubmitParticipation();
    console.log(activities);

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
      proof: null,
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
      setLoading(true);
      setError(null);
      const employeelocal = localStorage.getItem("employeeId");
      try {
        const entry = {
          categoryName: values.category,
          activityName: values.activity,
          description: values.description,
          duration: values.duration,
          proofUrl: proof ? proof.name : null,
          createdBy: employeelocal,  
          employeeEmpId: employeelocal, 
        };

        await submitParticipation(entry);
        addEntry(entry);
        resetForm();
        setProof(null);
      } catch (err) {
        setError('Failed to submit participation. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleProofChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProof(e.target.files[0]);
      formik.setFieldValue('proof', e.target.files[0]);
    }
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

      {loading && <p className={styles.loading}>Submitting your entry...</p>}
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
          placeholder="Remarks if any"
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
        formik.setFieldValue('duration', value ? parseInt(value, 10) : ''); // Convert value to number
    }}
    onBlur={formik.handleBlur}
    value={formik.values.duration}
    />
        {formik.touched.duration && formik.errors.duration ? (
          <div className={styles.error}>{formik.errors.duration}</div>
        ) : null}

        <label className={styles.fileLabel}>
          <input
            className={styles.fileInput}
            name="proof"
            type="file"
            accept=".jpg,.pdf"
            onChange={handleProofChange}
          />
          Attach supporting documents here
        </label>
        {/* <NewCategoryRequest/> */}

        <button type="submit" className={styles.submit} disabled={loading}>
          <LuSave className={styles.icon} /> Submit
        </button>
      </form>
    </div>
  );
};

export default NewEntry;
