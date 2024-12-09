// component/student/StudentProfile.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

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

  if (loading) {
    return <p className="text-center">Loading student data...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="col-sm-8 py-4 px-5 offset-2 shadow-lg bg-light rounded">
      <div className="text-center">
        <FaUserCircle size={100} className="text-secondary mb-4" />
        <h2 className="mb-4">{student.firstName} {student.lastName}</h2>
      </div>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5>Student Details</h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>ID:</strong> {student.id}
            </li>
            <li className="list-group-item">
              <strong>First Name:</strong> {student.firstName}
            </li>
            <li className="list-group-item">
              <strong>Last Name:</strong> {student.lastName}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {student.email}
            </li>
            <li className="list-group-item">
              <strong>Department:</strong> {student.department}
            </li>
          </ul>
        </div>
        <div className="card-footer text-center">
          <Link to="/view-students" className="btn btn-primary m-2">
            Back to Students List
          </Link>
          <Link to={`/edit-students/${student.id}`} className="btn btn-warning m-2">
            Edit Student
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
