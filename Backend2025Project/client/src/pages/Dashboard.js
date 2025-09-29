import React, { useEffect, useState } from "react";
import API from "../utils/api";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    API.get("/complaints/my").then((res) => setComplaints(res.data));
  }, []);

  return (
    <div>
      <h2>My Complaints</h2>
      <ul>
        {complaints.map((c) => (
          <li key={c._id}>
            <strong>{c.title}</strong> - {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
