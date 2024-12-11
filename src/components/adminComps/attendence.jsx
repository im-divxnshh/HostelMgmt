import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../utils/firebaseConfig";

const AttendancePage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [deptFilter, setDeptFilter] = useState("All");

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "users"));
        const records = querySnapshot.docs.map((doc ) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAttendanceRecords(records);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAttendance();
  }, []);

  // Handle edit button click
  const handleEditClick = (record) => {
    setIsEditing(record.id);
    setEditData(record);
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      const recordRef = doc(firestore, "users", isEditing);
      await updateDoc(recordRef, editData);
      setAttendanceRecords((prevRecords) =>
        prevRecords.map((rec) => (rec.id === isEditing ? { ...rec, ...editData } : rec))
      );
      setIsEditing(null);
      alert("Record updated successfully");
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "users", id));
      setAttendanceRecords((prevRecords) => prevRecords.filter((rec) => rec.id !== id));
      alert("Record deleted successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Filter attendance records based on the selected department
  const filteredRecords =
    deptFilter === "All"
      ? attendanceRecords
      : attendanceRecords.filter((record) => record.dept === deptFilter);

  // Extract unique departments for the selector
  const departments = ["All", ...new Set(attendanceRecords.map((record) => record.dept))];

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Hostel Attendance Information</h1>
        {/* Department Selector */}
        <div className="pt-6">
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="p-2 border rounded-md bg-white text-gray-800"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white text-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <th className="py-3 px-6 text-left">Student Name</th>
              <th className="py-3 px-6 text-left">Department</th>
              <th className="py-3 px-6 text-left">Attendance Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className="border-b hover:bg-gray-100">
                {isEditing === record.id ? (
                  <>
                    <td className="py-4 px-6">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="p-2 w-full border rounded-md"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        type="text"
                        value={editData.dept}
                        onChange={(e) =>
                          setEditData({ ...editData, dept: e.target.value })
                        }
                        className="p-2 w-full border rounded-md"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={editData.status || "Present"}
                        onChange={(e) =>
                          setEditData({ ...editData, status: e.target.value })
                        }
                        className="p-2 w-full border rounded-md"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(null)}
                        className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-4 px-6 font-medium">{record.name}</td>
                    <td className="py-4 px-6">{record.dept}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          record.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {record.status || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleEditClick(record)}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;
