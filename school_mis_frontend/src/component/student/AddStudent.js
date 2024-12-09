import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddStudent = () => {

    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    });
    const { firstName, lastName, email, department } = student;

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const saveStudent = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/students', student);
            alert('Student saved successfully!');
            navigate('/view-students');
        } catch (error) {
            console.error('Error saving student:', error);
            alert('Failed to save student. Please try again.');
        }
        
        //Go back to home screen
        navigate("/view-students")
    };


    return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
            <h2 className="text-center mb-4">Add New Student</h2>
            <form onSubmit={saveStudent}>
                <div className="input-group mb-4">
                    <label className="input-group-text" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={firstName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-4">
                    <label className="input-group-text" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        value={lastName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-4">
                    <label className="input-group-text" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-4">
                    <label className="input-group-text" htmlFor="department">
                        Department
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        name="department"
                        id="department"
                        required
                        value={department}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button
                        type="submit"
                        className="btn btn-outline-success btn-lg px-4"
                    >
                        Save
                    </button>
                    <Link
                        to="/view-students"
                        className="btn btn-outline-warning btn-lg px-4"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;
