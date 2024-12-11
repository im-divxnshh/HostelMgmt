import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../utils/firebaseConfig";

const RoomBooking = () => {
  const [students, setStudents] = useState([]); // List of students
  const [filteredStudents, setFilteredStudents] = useState([]); // Filtered list based on search
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dept: "",
    dob: "",
    email: "",
    mobile: "",
    parentName: "",
    parentContact: "",
    fees: "",
    roomType: "",
    checkInDate: "",
    checkOutDate: "",
    additionalNotes: "",
  });
  const [selectedStudentId, setSelectedStudentId] = useState("");

  // Fetch list of students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "users"));
        const studentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name, // Using "name" for dropdown
        }));
        setStudents(studentsData);
        setFilteredStudents(studentsData); // Initialize the filtered list
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
    };

    fetchStudents();
  }, []);

  // Update filtered list based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [searchQuery, students]);

  // Fetch details of the selected student
  const handleStudentSelect = async (studentId) => {
    setSelectedStudentId(studentId);

    if (studentId) {
      try {
        const studentDoc = await getDoc(doc(firestore, "users", studentId));
        if (studentDoc.exists()) {
          const studentData = studentDoc.data();
          setFormData({
            ...formData,
            name: studentData.name || "", // Explicitly setting name to ensure it shows up in the form
            age: studentData.age || "", // Adding fallback in case data is missing
            dept: studentData.dept || "",
            dob: studentData.dob || "",
            email: studentData.email || "",
            mobile: studentData.mobile || "",
            parentName: studentData.parentName || "",
            parentContact: studentData.parentContact || "",
            fees: studentData.fees || "",
            roomType: "", // Clear roomType on student select
            checkInDate: "",
            checkOutDate: "",
            additionalNotes: studentData.additionalNotes || "",
          });
        } else {
          console.error("No such student found!");
        }
      } catch (error) {
        console.error("Error fetching student details: ", error);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Room Booking</h1>

      <form onSubmit={handleSubmit}>
        {/* Search Bar and Student Selector */}
        <div className="mb-8">
          <label htmlFor="searchBar" className="block text-sm font-medium mb-2">
            Search and Select Student
          </label>
          <div className="relative">
            <input
              type="text"
              id="searchBar"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name..."
              className="p-3 w-full border border-gray-300 rounded-md text-gray-900"
            />
            {/* Display dropdown of filtered students */}
            {searchQuery && filteredStudents.length > 0 && (
              <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => handleStudentSelect(student.id)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {student.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Personal Details */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium">
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="dept" className="block text-sm font-medium">
              Department
            </label>
            <input
              type="text"
              id="dept"
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
              required
            />
          </div>
          <div className="mt-6">
            <label htmlFor="dob" className="block text-sm font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
              required
            />
          </div>
          <div className="mt-6">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
              required
            />
          </div>
          <div className="mt-6">
            <label htmlFor="mobile" className="block text-sm font-medium">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
              required
            />
          </div>
        </section>

        {/* Additional Details */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="roomType" className="block text-sm font-medium">
                Room Type
              </label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
                required
              >
                <option value="">Select Room Type</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            <div>
              <label htmlFor="checkInDate" className="block text-sm font-medium">
                Room Number
              </label>
              <select

                id="roomNumber"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
                required
              >
                <option value="">Select room number </option>
                <option value=""></option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="checkOutDate" className="block text-sm font-medium">
              Check-out Date
            </label>
            <input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
              required
            />
          </div>
          <div className="mt-6">
            <label htmlFor="additionalNotes" className="block text-sm font-medium">
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
            ></textarea>
          </div>
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RoomBooking;
