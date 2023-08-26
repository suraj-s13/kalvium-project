import React, { useState } from 'react';
import StudentRow from './StudentRow';
import AddStudentForm from './AddStudentForm';
import './AttendanceTable.css';

function AttendanceTable() {
  const initialWeeks = 5;
  const [numWeeks, setNumWeeks] = useState(initialWeeks);
  const [attendance, setAttendance] = useState({});

  const updateAttendance = (studentName, newAttendance) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentName]: newAttendance,
    }));
  };

  const addStudent = (studentName) => {
    if (!attendance[studentName]) {
      setAttendance((prevAttendance) => ({
        ...prevAttendance,
        [studentName]: Array(numWeeks).fill(false),
      }));
    }
  };

  const increaseWeeks = () => {
    setNumWeeks(numWeeks + 1);
    Object.keys(attendance).forEach((studentName) => {
      setAttendance((prevAttendance) => ({
        ...prevAttendance,
        [studentName]: [...prevAttendance[studentName], false],
      }));
    });
  };

  const decreaseWeeks = () => {
    if (numWeeks > 1) {
      setNumWeeks(numWeeks - 1);
      Object.keys(attendance).forEach((studentName) => {
        const updatedAttendance = [...attendance[studentName]];
        updatedAttendance.pop();
        setAttendance((prevAttendance) => ({
          ...prevAttendance,
          [studentName]: updatedAttendance,
        }));
      });
    }
  };

  return (
    <div className="table-container">
      <AddStudentForm addStudent={addStudent} />
      <div className="buttons-container">
      <button className='add-week-btn' onClick={increaseWeeks}>Add Days</button>
      <button className='remove-week-btn' onClick={decreaseWeeks}>Remove Days</button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="name-col">Student Name</th>
            {Array.from({ length: numWeeks }).map((_, index) => (
              <th key={index}>Day {index + 1}</th>
            ))}
            <th className="missed-col">Missed Days</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(attendance).map((studentName) => (
            <StudentRow
              key={studentName}
              studentName={studentName}
              attendance={attendance[studentName]}
              updateAttendance={updateAttendance}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
