import React, { useState } from 'react';

const FeeManagement = () => {
  // State to store fee details
  const [fees, setFees] = useState([]);
  const [formData, setFormData] = useState({
    studentName: '',
    department: '',
    amount: '',
    status: 'Unpaid',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to add a new fee entry
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.department || !formData.amount) {
      alert('Please fill out all fields!');
      return;
    }
    setFees([...fees, formData]);
    setFormData({
      studentName: '',
      department: '',
      amount: '',
      status: 'Unpaid',
    });
  };

  // Update fee payment status
  const togglePaymentStatus = (index) => {
    const updatedFees = fees.map((fee, i) =>
      i === index ? { ...fee, status: fee.status === 'Paid' ? 'Unpaid' : 'Paid' } : fee
    );
    setFees(updatedFees);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Fee Management System</h1>

      {/* Form to Add Fee */}
      <form onSubmit={handleSubmit} className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Fee Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-600">
              Student Name
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-600">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-600">
              Payment Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Fee
        </button>
      </form>

      {/* Fee List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Fee Records</h2>
        {fees.length === 0 ? (
          <p className="text-gray-500">No fee records found. Add some!</p>
        ) : (
          <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{fee.studentName}</td>
                  <td className="p-3">{fee.department}</td>
                  <td className="p-3">${fee.amount}</td>
                  <td className={`p-3 ${fee.status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                    {fee.status}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => togglePaymentStatus(index)}
                      className={`px-4 py-2 rounded-md ${
                        fee.status === 'Paid' ? 'bg-red-500' : 'bg-green-500'
                      } text-white hover:opacity-90 transition`}
                    >
                      {fee.status === 'Paid' ? 'Mark Unpaid' : 'Mark Paid'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FeeManagement;
