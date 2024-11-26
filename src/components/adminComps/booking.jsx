import React, { useState } from 'react';

const RoomBooking = () => {
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

  const [currentPage, setCurrentPage] = useState('booking'); // State to manage current page (Booking, History, Cancellation)

  const [bookingHistory, setBookingHistory] = useState([
    {
      firstName: 'John',
      lastName: 'Doe',
      roomType: 'Single',
      checkInDate: '2024-10-01',
      checkOutDate: '2024-10-10',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      roomType: 'Double',
      checkInDate: '2024-09-15',
      checkOutDate: '2024-09-20',
    },
  ]);

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
    alert('Form submitted successfully!');
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const handleCancelBooking = () => {
    alert('Booking Cancelled');
  };

  const handleModifyBooking = () => {
    alert('Booking Modified');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Room Booking</h1>

      <div className="mb-4">
        <button
          onClick={() => navigateToPage('booking')}
          className="mr-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Book Room
        </button>
        <button
          onClick={() => navigateToPage('history')}
          className="mr-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Booking History
        </button>
        <button
          onClick={() => navigateToPage('cancel')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Cancel/Modify Booking
        </button>
      </div>

      {currentPage === 'booking' && (
        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      )}

      {currentPage === 'history' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Room Type</th>
                <th className="py-2 px-4">Check-in Date</th>
                <th className="py-2 px-4">Check-out Date</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{`${booking.firstName} ${booking.lastName}`}</td>
                  <td className="py-2 px-4">{booking.roomType}</td>
                  <td className="py-2 px-4">{booking.checkInDate}</td>
                  <td className="py-2 px-4">{booking.checkOutDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {currentPage === 'cancel' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Cancellation and Modification</h2>
          <p className="mb-4">Select your booking and choose to cancel or modify it.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bookingId" className="block text-sm font-medium">
                Booking ID
              </label>
              <input
                type="text"
                id="bookingId"
                name="bookingId"
                className="mt-1 p-3 w-full border border-gray-300 rounded-md text-gray-900"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleCancelBooking}
              className="px-4 py-2 bg-red-600 text-white rounded-md mr-4"
            >
              Cancel Booking
            </button>
            <button
              onClick={handleModifyBooking}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md"
            >
              Modify Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomBooking;
