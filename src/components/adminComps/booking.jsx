import React, { useState } from 'react';

const RoomBooking = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    parentName: '',
    parentPhone: '',
    department: '',
    fees: '',
    roomType: '',
    checkInDate: '',
    checkOutDate: '',
    additionalNotes: '',
  });

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Room Booking Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Personal Details Section */}
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

        {/* Parent Details Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Parent Details</h2>
          <div className="mt-6">
            <label htmlFor="parentName" className="block text-sm font-medium">
              Parent's Name
            </label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
              required
            />
          </div>
          <div className="mt-6">
            <label htmlFor="parentPhone" className="block text-sm font-medium">
              Parent's Phone Number
            </label>
            <input
              type="text"
              id="parentPhone"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
              required
            />
          </div>
        </section>

        {/* Booking Details Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="department" className="block text-sm font-medium">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
                required
              >
                <option value="">Select Department</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="Bsc biotech">Bsc biotech</option>
                <option value="MBA">MBA</option>
                <option value="ZBC">ZBC</option>
                <option value="BBA">BBA</option>
                <option value="Bcom">Bcom</option>
                <option value="Bcom.hons">Bcom.hons</option>
                <option value="B.ed">B.ed</option>
                <option value="M.ed">M.ed</option>
                <option value="MSC">MSC</option>
            
              </select>
            </div>
            <div>
              <label htmlFor="fees" className="block text-sm font-medium">
                Fees
              </label>
              <input
                type="number"
                id="fees"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
                required
              />
            </div>
          </div>
          <div className="mt-6">
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
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="checkInDate" className="block text-sm font-medium">
                Check-in Date
              </label>
              <input
                type="date"
                id="checkInDate"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
                required
              />
            </div>
            <div>
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
          </div>
        </section>

        {/* Additional Notes Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Additional Notes</h2>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
            placeholder="Any additional information or requests..."
          ></textarea>
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
