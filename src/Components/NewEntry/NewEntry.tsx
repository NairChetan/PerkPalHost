import React,{ useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './NewEntry.module.css';
import { LuSave } from "react-icons/lu";

interface NewEntryProps {
  addEntry: (entry: any) => void;
}

const NewEntry: React.FC<NewEntryProps> = ({ addEntry }) => {
  const [proof, setProof] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      activity: '',
      category: '',
      description: '',
      duration: '',
      proof: null,
    },
    validationSchema: Yup.object({
      activity: Yup.string().required(''),
      category: Yup.string().required(''),
      description: Yup.string().required(''),
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
    <div>
      <h3 className={styles.new}>New Entry</h3>
      <form className={styles.newEntry} onSubmit={formik.handleSubmit}>
        <select
          name="activity"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.activity}
        >
          <option value="" label="Select activity" />
          <option value="Training Programs" label="Training Programs" />
          <option value="Skill Matrix" label="Skill Matrix" />
        </select>
        {formik.touched.activity && formik.errors.activity ? <div>{formik.errors.activity}</div> : null}

        <select
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
          disabled={formik.values.activity === ''}
        >
          <option value="" label="Select category" />
          {formik.values.activity === 'Training Programs' && (
            <>
              <option value="Facilitating Training Programs" label="Facilitating Training Programs" />
              <option value="Participation In Training Programs" label="Participation In Training Programs" />
            </>
          )}
          {formik.values.activity === 'Skill Matrix' && (
            <option value="External Certification Updates" label="External Certification Updates" />
          )}
        </select>
        {formik.touched.category && formik.errors.category ? <div>{formik.errors.category}</div> : null}

        <input
          name="description"
          type="text"
          placeholder="Description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}

        <input
          name="duration"
          type="text"
          placeholder="Duration (HH:MM)"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.duration}
        />
        {formik.touched.duration && formik.errors.duration ? <div>{formik.errors.duration}</div> : null}

        <input
          name="proof"
          type="file"
          accept=".jpg,.pdf"
          onChange={handleProofChange}
        />
        
        <button type="submit"><LuSave /></button>
      </form>
    </div>
  );
};

export default NewEntry;
