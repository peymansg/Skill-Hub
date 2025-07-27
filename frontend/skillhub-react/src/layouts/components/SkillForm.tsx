import React, { useEffect, useState } from "react";
import SkillModel from "../../models/SkillModel";
import axios from "axios";

type Skill = {
  id: number;
  title: string;
  level: string;
  description: string;
  user_id: number;
};

const SkillForm = () => {
  const [skills, setSkills] = useState<SkillModel[]>([]);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/skills?user_id=1"
        );
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        } else {
          console.error("Failed to fetch skills");
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  const addSkill = async () => {
    if (!title || !level || !description) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          level,
          description,
          user_id: 1,
        }),
      });

      if (response.ok) {
        const savedSkill = await response.json();
        alert("Skill added!");

        setSkills((prev) => [...prev, savedSkill]);
        setTitle("");
        setLevel("");
        setDescription("");
      }
    } catch {
      alert("Failed to add skill");
    }
  };

  const deleteSkill = async (id: number) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/skills/${id}`);

      if (res.status === 200) {
        setSkills((prev) => prev.filter((skills) => skills.id !== id));
      } else {
        alert("Failed to delete skill");
      }
    } catch (err) {
      console.error("Error deleting skill:", err);
      alert("Error deleting skill");
    }
  };

  return (
    <div className="container my-3">
      <div className="row g-2">
        <div className="col-md-4">
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Skill title"
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            placeholder="Skill level"
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Skill description"
          />
        </div>
      </div>

      <div className="text-center mt-3">
        <button className="btn btn-success" onClick={addSkill}>
          Add Skill
        </button>
      </div>

      <hr />

      {skills.map((skill) => (
        <div key={skill.id} className="card my-2 p-3 shadow-sm">
          <p>
            <strong>Title:</strong> {skill.title}
          </p>
          <p>
            <strong>Level:</strong> {skill.level}
          </p>
          <p>
            <strong>Description:</strong> {skill.description}
          </p>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteSkill(skill.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default SkillForm;
