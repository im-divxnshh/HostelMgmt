import React, { useState, useEffect } from "react";
import { FaPlus, FaRegClock, FaCheckCircle, FaTrashAlt, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../../utils/firebaseConfig";

// 🔐 Replace with auth logic
const userId = "user-123"; // from auth context in real app

export default function UserComplaints() {
  const [activeTab, setActiveTab] = useState("all");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchUserComplaints = async () => {
      const snap = await getDocs(collection(firestore, "users", userId, "complaints"));
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComplaints(list);
    };
    fetchUserComplaints();
  }, []);

  const addOrEditComplaint = async (existing = null) => {
    const { value: formValues } = await Swal.fire({
      title: existing ? "Edit Complaint" : "Add Complaint",
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${existing?.title || ''}" />
        <textarea id="desc" class="swal2-textarea" placeholder="Description">${existing?.description || ''}</textarea>
      `,
      preConfirm: () => {
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("desc").value.trim();
        if (!title || !description) {
          Swal.showValidationMessage("Both fields are required.");
          return false;
        }
        return { title, description };
      },
    });

    if (formValues) {
      try {
        const id = existing?.id || `complaint-${Date.now()}`;
        const data = {
          ...formValues,
          status: existing?.status || "new",
          createdAt: existing?.createdAt || new Date().toISOString(),
        };
        await setDoc(doc(firestore, "users", userId, "complaints", id), data);
        setComplaints((prev) =>
          existing
            ? prev.map((c) => (c.id === id ? { ...data, id } : c))
            : [...prev, { ...data, id }]
        );
        Swal.fire("Success", `Complaint ${existing ? "updated" : "added"}!`, "success");
      } catch (err) {
        Swal.fire("Error", "Failed to save complaint", "error");
      }
    }
  };

  const deleteComplaint = async (c) => {
    if (
      await Swal.fire({
        title: "Delete this complaint?",
        icon: "warning",
        showCancelButton: true,
      }).then((res) => res.isConfirmed)
    ) {
      await deleteDoc(doc(firestore, "users", userId, "complaints", c.id));
      setComplaints((prev) => prev.filter((x) => x.id !== c.id));
    }
  };

  const filterList = (status) =>
    complaints.filter((c) => (status === "all" ? true : c.status === status));

  const renderList = (list) =>
    list.map((c) => (
      <li key={c.id} className="p-4 mb-3 bg-white rounded shadow flex justify-between">
        <div>
          {c.status === "resolved" ? (
            <FaCheckCircle className="inline text-green-500 mr-2" />
          ) : (
            <FaRegClock className="inline text-yellow-500 mr-2" />
          )}
          <strong>{c.title}</strong>
          <p className="text-sm text-gray-600">{c.description}</p>
          <p className="text-xs text-gray-500">
            {new Date(c.createdAt).toLocaleDateString()}
          </p>
        </div>
        {c.status === "new" && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => addOrEditComplaint(c)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteComplaint(c)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              <FaTrashAlt />
            </button>
          </div>
        )}
      </li>
    ));

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100">
      <h1 className="text-3xl text-center font-bold mb-6">My Complaints</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {["all", "new", "pending", "resolved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab ? "bg-blue-600 text-white" : "bg-white border"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
          onClick={() => addOrEditComplaint()}
        >
          <FaPlus className="mr-2" /> Add Complaint
        </button>
      </div>

      <ul>{renderList(filterList(activeTab))}</ul>
    </div>
  );
}
