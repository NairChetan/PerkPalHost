import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './NewEntry.module.css';
import { LuSave } from "react-icons/lu";
import { colors } from '@mui/material';

interface NewEntryProps {
  addEntry: (entry: any) => void;
}

const NewEntry: React.FC<NewEntryProps> = ({ addEntry }) => {
  const [proof, setProof] = useState<File | null>(null);

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
      duration: Yup.string()
        .matches(/^\d+:\d{2}$/, 'Duration must be in HH:MM format')
        .required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const entry = {
        ...values,
        date: new Date().toISOString(),
        status: 'Pending',
        proof: proof ? proof.name : null,
      };

      try {
        const response = await axios.post('http://localhost:3000/entries', entry);
        addEntry(response.data);
        resetForm();
        setProof(null);
      } catch (error) {
        console.error('Error saving entry:', error);
      }
    },
  });

  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
       
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <select
          className={styles.input}
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
        >
          <option value="" label="Select category" />
          <option value="Training Programs" label="Training Programs" />
          <option value="Skill Matrix" label="Skill Matrix" />
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
          disabled={formik.values.category === ''}
        >
          <option value="" label="Select activity" />
          {formik.values.category === 'Training Programs' && (
            <>
              <option value="Facilitating Training Programs" label="Facilitating Training Programs" />
              <option value="Participation In Training Programs" label="Participation In Training Programs" />
            </>
          )}
          {formik.values.category === 'Skill Matrix' && (
            <option value="External Certification Updates" label="External Certification Updates" />
          )}
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
          type="text"
          placeholder="Hours Completed"
          onChange={formik.handleChange}
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

        <button type="submit" className={styles.submit}>
          <LuSave className={styles.icon} /> Submit
        </button>
      </form>
    </div>
  );
};

export default NewEntry;
