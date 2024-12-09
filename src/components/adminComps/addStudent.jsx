import React, { useState, useEffect } from 'react';
import { firestore } from '../../utils/firebaseConfig';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    dept: '',
    mobile: '',
    parentName: '',
    parentContact: '',
    dob: '',
    fees: '',
    role: 'student',
    password: '12345678',
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const usersCollectionRef = collection(firestore, 'users');
  const departments = ['BCA', 'BBA', 'BSC Biotech', 'BSC Microbiology', 'MCA', 'MBA', 'B.ED', 'M.ED', 'B.COM', 'B.COM HONORS'];

  const fetchStudents = async () => {
    const data = await getDocs(usersCollectionRef);
    setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    const { email, password } = student;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const studentRef = doc(firestore, 'users', userId);
      await setDoc(studentRef, {
        ...student,
        role: 'student',
      });

      setStudent({
        name: '',
        email: '',
        age: '',
        dept: '',
        mobile: '',
        parentName: '',
        parentContact: '',
        dob: '',
        fees: '',
        role: 'student',
        password: '12345678',
      });
      fetchStudents();

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Student added successfully!',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to add student!',
        text: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const studentDoc = doc(firestore, 'users', id);
      await deleteDoc(studentDoc);
      fetchStudents();

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Student deleted successfully!',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to delete student!',
        text: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">Add New Student</h2>
          <form onSubmit={handleSubmit}>
            {['name', 'email', 'age', 'mobile', 'fees'].map((field) => (
              <div className="mb-4" key={field}>
                <label htmlFor={field} className="block text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={field === 'email' ? 'email' : field === 'fees' || field === 'age' ? 'number' : 'text'}
                  id={field}
                  name={field}
                  value={student[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            ))}
            {/* Parent Details */}
            <div className="mb-4">
              <label htmlFor="parentName" className="block text-gray-700">Parent's Name</label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={student.parentName}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="parentContact" className="block text-gray-700">Parent's Contact</label>
              <input
                type="text"
                id="parentContact"
                name="parentContact"
                value={student.parentContact}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            {/* Department and DOB */}
            <div className="mb-4">
              <label htmlFor="dept" className="block text-gray-700">Department</label>
              <select
                id="dept"
                name="dept"
                value={student.dept}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={student.dob}
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
              {loading ? (
                <span className="spinner-border animate-spin w-5 h-5 border-4 border-t-4 border-white rounded-full"></span>
              ) : (
                'Add Student'
              )}
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
                  {['Name', 'Email', 'Age', 'Dept', 'Mobile', 'Parent Name', 'Parent Contact', 'DOB', 'Fees', 'Role', 'Actions'].map(
                    (header) => (
                      <th key={header} className="border px-4 py-2 text-left">
                        {header}
                      </th>
                    )
                  )}
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
                    <td className="border px-4 py-2">{s.parentName}</td>
                    <td className="border px-4 py-2">{s.parentContact}</td>
                    <td className="border px-4 py-2">{s.dob}</td>
                    <td className="border px-4 py-2">{s.fees}</td>
                    <td className="border px-4 py-2">{s.role}</td>
                    <td className="border px-4 py-2">
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
