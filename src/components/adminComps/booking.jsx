import React, { useState } from "react";

const RoomBooking = () => {
  const students = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      parentName: "Michael Doe",
      parentPhone: "9876543210",
      department: "BBA",
      fees: "5000",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "0987654321",
      parentName: "Laura Smith",
      parentPhone: "8765432190",
      department: "BCA",
      fees: "6000",
    },
    // Add more students as needed
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    parentName: "",
    parentPhone: "",
    department: "",
    fees: "",
    roomType: "",
    checkInDate: "",
    checkOutDate: "",
    additionalNotes: "",
  });

  const [selectedStudentId, setSelectedStudentId] = useState("");

  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);

    if (studentId) {
      const selectedStudent = students.find((student) => student.id === parseInt(studentId, 10));
      if (selectedStudent) {
        setFormData({
          ...formData,
          ...selectedStudent, // Merge selected student details with the form data
        });
      }
    }
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
        {/* Student Selector */}
        <div className="mb-8">
          <label htmlFor="studentSelector" className="block text-sm font-medium mb-2">
            Select Student
          </label>
          <select
            id="studentSelector"
            value={selectedStudentId}
            onChange={handleStudentSelect}
            className="p-3 w-full border border-gray-300 rounded-md text-gray-900"
          >
            <option value="">Select a student...</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {`${student.firstName} ${student.lastName}`}
              </option>
            ))}
          </select>
        </div>

        {/* Personal Details */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
                required
              />
            </div>
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
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
              required
            />
          </div>
        </section>  

        {/* Other Sections (Parent Details, Booking Details, etc.) */}
        {/* ... Add other sections here like in the original form ... */}

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
