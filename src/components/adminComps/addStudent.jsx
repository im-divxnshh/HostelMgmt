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
    role: 'student',
    password: '12345678',
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const usersCollectionRef = collection(firestore, 'users');
  const departments = ['BCA','BBA','BSC Biotech','BSC Microbiology','MCA','MBA','B.ED','M.ED','B.COM','B.COM HONORS'];

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
        name: student.name,
        email: student.email,
        age: student.age,
        dept: student.dept,
        role: 'student',
      });

      setStudent({ name: '', email: '', age: '', dept: '', role: 'student', password: '12345678' });
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
    <div className="min-h-screen flex flex-row bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mr-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={student.age}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
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
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Students List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Dept</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="border px-4 py-2">{s.name}</td>
                <td className="border px-4 py-2">{s.email}</td>
                <td className="border px-4 py-2">{s.age}</td>
                <td className="border px-4 py-2">{s.dept}</td>
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
  );
};

export default AddStudent;
