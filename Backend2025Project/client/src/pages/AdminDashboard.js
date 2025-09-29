import React, { useEffect, useState } from "react";
import API from "../utils/api";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/admin/complaints").then((res) => setComplaints(res.data));
    API.get("/admin/stats").then((res) => setStats(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/complaints/${id}`, { status });
    setComplaints((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status } : c))
    );
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h4>Stats</h4>
      <p>Pending: {stats.pending} | Under Review: {stats.review} | Resolved: {stats.resolved}</p>

      <h4>All Complaints</h4>
      <ul>
        {complaints.map((c) => (
          <li key={c._id}>
            <strong>{c.title}</strong> - {c.status} by {c.createdBy?.name} (
            {c.createdBy?.role})
            <select value={c.status} onChange={(e) => updateStatus(c._id, e.target.value)}>
              <option value="pending">Pending</option>
              <option value="under review">Under Review</option>
              <option value="resolved">Resolved</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
