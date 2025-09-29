import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/complaints", { title, description });
      navigate("/");
    } catch (error) {
      alert("Failed to submit complaint");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Complaint</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ComplaintForm;
