package com.moabmo.School_MIS.service;

import com.moabmo.School_MIS.model.Student;

import java.util.List;

public interface IStudentService {
    List<Student> getStudents();

    Student addStudent(Student student);

    Student updateStudent(Student student, Long id);

    Student getStudentById(Long id);

    void deleteStudent(Long id);
}
