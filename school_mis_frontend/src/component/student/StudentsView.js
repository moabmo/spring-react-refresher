// component/student/StudentsView.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StudentsView = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students');
      if (response.status === 200) {
        setStudents(response.data);
      } else {
        console.error(`Error: Received status code ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/students/${id}`);
        alert('Student deleted successfully.');
        loadStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student. Please try again.');
      }
    }
  };

  return (
    <section className="container mt-5">
      <h2 className="text-center mb-4">Students List</h2>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center table-primary">
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>
                <div className="d-flex justify-content-around">
                  <Link to={`/student-profile/${student.id}`} className="btn btn-info btn-sm">
                    <FaEye />
                  </Link>
                  <Link to={`/edit-students/${student.id}`} className="btn btn-warning btn-sm">
                    <FaEdit />
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(student.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default StudentsView;
