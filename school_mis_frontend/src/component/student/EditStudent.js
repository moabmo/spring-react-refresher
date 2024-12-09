// component/student/EditStudent.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadStudent();
  }, [id]);

  const loadStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/students/${id}`);
      if (response.status === 200) {
        setStudent(response.data);
        setError(null);
      } else {
        setError('Failed to fetch student data.');
      }
    } catch (err) {
      console.error('Error fetching student:', err);
      setError('Error loading student data.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/students/${id}`, student);
      alert('Student updated successfully!');
      navigate('/view-students');
    } catch (err) {
      console.error('Error updating student:', err);
      alert('Failed to update student. Please try again.');
    }
  };

  if (loading) {
    return <p className="text-center">Loading student data...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="text-center mb-4">Edit Student</h2>
      <form onSubmit={updateStudent}>
        <div className="input-group mb-4">
          <label className="input-group-text" htmlFor="firstName">First Name</label>
          <input
            className="form-control"
            type="text"
            name="firstName"
            id="firstName"
            required
            value={student.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group mb-4">
          <label className="input-group-text" htmlFor="lastName">Last Name</label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            id="lastName"
            required
            value={student.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group mb-4">
          <label className="input-group-text" htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            required
            value={student.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group mb-4">
          <label className="input-group-text" htmlFor="department">Department</label>
          <input
            className="form-control"
            type="text"
            name="department"
            id="department"
            required
            value={student.department}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-outline-success btn-lg px-4">Update</button>
          <Link to="/view-students" className="btn btn-outline-warning btn-lg px-4">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
