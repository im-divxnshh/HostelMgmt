import React, { useState, useEffect } from 'react';
import { firestore } from '../../utils/firebaseConfig';
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AddStudent = () => {
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState(initialStudentState());
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const usersCollectionRef = collection(firestore, 'users');
  const departments = ['BCA', 'BBA', 'BSC Biotech', 'BSC Microbiology', 'MCA', 'MBA', 'B.ED', 'M.ED', 'B.COM', 'B.COM HONORS'];

  function initialStudentState() {
    return {
      name: '',
      email: '',
      age: '',
      dept: '',
      mobile: '',
      parentName: '',
      parentContact: '',
      dob: '',
      fees: '',
      password: '12345678',
      role: 'student'
    };
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const studentsList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setStudents(studentsList);
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    try {
      const { email, password } = studentData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const studentRef = doc(firestore, 'users', userId);
      await setDoc(studentRef, studentData);

      Swal.fire('Success!', 'Student added successfully.', 'success');
      setStudentData(initialStudentState());
      fetchStudents();
    } catch (error) {
      console.error('Add student error:', error.message);
      Swal.fire('Error!', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const studentRef = doc(firestore, 'users', currentId);
      await setDoc(studentRef, studentData);

      Swal.fire('Updated!', 'Student record updated.', 'success');
      setEditMode(false);
      setStudentData(initialStudentState());
      setCurrentId('');
      fetchStudents();
    } catch (error) {
      console.error('Update error:', error.message);
      Swal.fire('Error!', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setEditMode(true);
    setStudentData(student);
    setCurrentId(student.id);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete a student record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const studentDoc = doc(firestore, 'users', id);
        await deleteDoc(studentDoc);
        Swal.fire('Deleted!', 'Student has been deleted.', 'success');
        fetchStudents();
      } catch (error) {
        console.error('Delete error:', error.message);
        Swal.fire('Error!', error.message, 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
            {editMode ? 'Update Student' : 'Add New Student'}
          </h2>
          <form onSubmit={editMode ? handleUpdateStudent : handleAddStudent}>
            {['name', 'email', 'age', 'mobile', 'fees', 'parentName', 'parentContact'].map((field) => (
              <div className="mb-4" key={field}>
                <label htmlFor={field} className="block text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={field === 'email' ? 'email' : field === 'fees' || field === 'age' ? 'number' : 'text'}
                  id={field}
                  name={field}
                  value={studentData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            ))}
            <div className="mb-4">
              <label htmlFor="dept" className="block text-gray-700">Department</label>
              <select
                id="dept"
                name="dept"
                value={studentData.dept}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={studentData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full flex items-center justify-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Processing...' : editMode ? 'Update Student' : 'Add Student'}
            </button>
          </form>
        </div>

        {/* Student List Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">Students List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-blue-50 text-blue-600">
                  {['Name', 'Email', 'Age', 'Dept', 'Mobile', 'DOB', 'Fees', 'Actions'].map((header) => (
                    <th key={header} className="border px-4 py-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{s.name}</td>
                    <td className="border px-4 py-2">{s.email}</td>
                    <td className="border px-4 py-2">{s.age}</td>
                    <td className="border px-4 py-2">{s.dept}</td>
                    <td className="border px-4 py-2">{s.mobile}</td>
                    <td className="border px-4 py-2">{s.dob}</td>
                    <td className="border px-4 py-2">{s.fees}</td>
                    <td className="border px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddStudent;
