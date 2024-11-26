// src/fees.js

import React, { useState } from 'react';

// Mock payment gateway and tracking data
const feesStructure = {
  room: 5000,
  mess: 3000,
  extra: 1000,
};

// Rename `paymentStatus` to `statusLabels` to avoid name conflict
const statusLabels = {
  pending: "Pending",
  paid: "Paid",
};

const FeesManagement = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(statusLabels.pending);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentDate, setPaymentDate] = useState('');

  const handleAddFees = (feeType) => {
    setTotalAmount(prevAmount => prevAmount + feesStructure[feeType]);
  };

  const handlePayment = () => {
    setPaymentStatus(statusLabels.paid);  // Update to use `statusLabels.paid`
    setPaymentDate(new Date().toLocaleDateString());
    setShowReceipt(true);
  };

  const generateInvoice = () => {
    return `
      Fees Invoice:
      - Room: $${feesStructure.room}
      - Mess: $${feesStructure.mess}
      - Extra: $${feesStructure.extra}
      - Total Amount: $${totalAmount}
      - Payment Status: ${paymentStatus}
      - Date: ${paymentDate}
    `;
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Hostel Fees Management</h2>

        {/* Fees Structure */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Fees Structure</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Room Fee</span><span className="text-gray-600">${feesStructure.room}</span>
            </div>
            <div className="flex justify-between">
              <span>Mess Fee</span><span className="text-gray-600">${feesStructure.mess}</span>
            </div>
            <div className="flex justify-between">
              <span>Extra Charges</span><span className="text-gray-600">${feesStructure.extra}</span>
            </div>
          </div>
        </div>

        {/* Fee Calculation */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Total Fees</h3>
          <p className="text-lg">Total Amount: <span className="font-bold">${totalAmount}</span></p>
          <div className="space-x-4 mt-4">
            <button
              onClick={() => handleAddFees('room')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Add Room Fee
            </button>
            <button
              onClick={() => handleAddFees('mess')}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Add Mess Fee
            </button>
            <button
              onClick={() => handleAddFees('extra')}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Add Extra Charges
            </button>
          </div>
        </div>

        {/* Payment Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Payment Status</h3>
          <p className={`text-lg ${paymentStatus === statusLabels.paid ? 'text-green-600' : 'text-red-600'}`}>
            {paymentStatus === statusLabels.paid ? 'Paid' : 'Pending'}
          </p>
          {paymentStatus === statusLabels.pending && (
            <button
              onClick={handlePayment}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 mt-4">
              Make Payment
            </button>
          )}
        </div>

        {/* Receipt and Invoice */}
        {showReceipt && (
          <div className="mt-6 p-6 bg-gray-200 rounded-xl">
            <h3 className="text-xl font-semibold">Receipt</h3>
            <pre className="text-sm text-gray-700 mt-4">{generateInvoice()}</pre>
            <button
              onClick={() => alert("Invoice Downloaded!")}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Download Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeesManagement;
