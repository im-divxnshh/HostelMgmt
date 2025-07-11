import React, { useState, useEffect } from "react";
import {
  FaRegClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTrashAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import {
  collectionGroup,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../utils/firebaseConfig";

const AdminComplaints = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const snapshot = await getDocs(collectionGroup(firestore, "complaints"));
    const list = snapshot.docs.map((docSnap) => {
      const pathParts = docSnap.ref.path.split("/");
      return {
        id: docSnap.id,
        userId: pathParts[1],
        ...docSnap.data(),
      };
    });
    setComplaints(list);
  };

  const handleStatusChange = async (complaint, newStatus) => {
    const ref = doc(firestore, "users", complaint.userId, "complaints", complaint.id);
    await updateDoc(ref, { status: newStatus });
    fetchComplaints();
    Swal.fire("Updated", `Complaint marked as ${newStatus}`, "success");
  };

  const handleDelete = async (complaint) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the complaint.",
      icon: "warning",
      showCancelButton: true,
    });
    if (confirm.isConfirmed) {
      const ref = doc(firestore, "users", complaint.userId, "complaints", complaint.id);
      await deleteDoc(ref);
      fetchComplaints();
      Swal.fire("Deleted", "Complaint has been removed.", "success");
    }
  };

  const filtered = complaints.filter((c) =>
    activeTab === "all" ? true : c.status === activeTab
  );

  const getStatusIcon = (status) => {
    if (status === "resolved") return <FaCheckCircle className="text-green-500 mr-2" />;
    if (status === "pending") return <FaRegClock className="text-yellow-500 mr-2" />;
    return <FaExclamationTriangle className="text-red-500 mr-2" />;
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded shadow">
      <h1 className="text-3xl font-bold text-center mb-8">📋 Admin Complaints Box</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {["all", "new", "pending", "resolved"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-5 py-2 font-medium rounded ${
              activeTab === status
                ? "bg-blue-600 text-white"
                : "bg-white border hover:bg-blue-100"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Complaints List */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No complaints found.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((c) => (
            <li
              key={c.id}
              className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg flex items-center">
                  {getStatusIcon(c.status)} {c.title}
                </h3>
                <p className="text-gray-600">{c.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Submitted by: <span className="font-medium">{c.userId}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Date: {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {c.status === "new" && (
                  <button
                    onClick={() => handleStatusChange(c, "pending")}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                  >
                    Mark Pending
                  </button>
                )}
                {c.status === "pending" && (
                  <button
                    onClick={() => handleStatusChange(c, "resolved")}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                  >
                    Resolve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(c)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminComplaints;
