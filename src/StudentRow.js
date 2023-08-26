import React, { useEffect, useState } from 'react';
import './StudentRow.css';

function StudentRow({ studentName, attendance, updateAttendance }) {
  const [missedDays, setMissedDays] = useState(0);

  const handleCheckboxClick = (index) => {
    const newAttendance = [...attendance];
    newAttendance[index] = !newAttendance[index];
    updateAttendance(studentName, newAttendance);
  };

  useEffect(() => {
    const newMissedDays = attendance.filter((day) => !day).length;
    setMissedDays(newMissedDays);
  }, [attendance]);

  return (
    <tr className="student">
      <td className="name-col">{studentName}</td>
      {attendance.map((isChecked, index) => (
        <td key={index} className="attend-col">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheckboxClick(index)}
          />
        </td>
      ))}
      <td className="missed-col">{missedDays}</td>
    </tr>
  );
}

export default StudentRow;
