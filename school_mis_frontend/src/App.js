// App.js
import './App.css';
import NavBar from './component/common/NavBar';
import AddStudent from './component/student/AddStudent';
import EditStudent from './component/student/EditStudent';
import StudentProfile from './component/student/StudentProfile';
import StudentsView from './component/student/StudentsView';
import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <main className="container mt-5">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-students" element={<StudentsView />} />
          <Route path="/add-students" element={<AddStudent />} />
          <Route path="/edit-students/:id" element={<EditStudent />} />
          <Route path="/student-profile/:id" element={<StudentProfile />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
