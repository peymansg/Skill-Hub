import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { assert } from "console";

interface Project {
  id: number;
  title: string;
  description: string;
  skillsRequirements: string;
}

const ProjectList = () => {
  const { userData } = useContext(UserContext)!;
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillsRequirements, setSkillsRequirements] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const addProject = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          skillsRequirements,
          postedBy: userData.firstname,
          userId: userData.id,
        }),
      });
      console.log("response.body" + response.body);
      if (response.ok) {
        const savedProject = await response.json();
        alert("project added successfully");

        setProjects((prev) => [...prev, savedProject]);
        setTitle("");
        setDescription("");
        setSkillsRequirements("");
      }
    } catch (error) {
      console.error("Error occurred while adding project:", error);
      alert("Failed to add Project");
    }
  };

  const deleteProject = async (id: number) => {
    console.log("Deleting project with ID:", id); // ✅ Add this
    try {
      const res = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: "DELETE",
      });
      console.log("id", id);
      if (res.ok) {
        setProjects((prev) => prev.filter((project) => project.id !== id));
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to delete project.");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Error deleting project");
    }
  };

  const cancleHandler = () => {
    setTitle("");
    setDescription("");
    setSkillsRequirements("");
  };

  return (
    <div className="container my-3">
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            value={skillsRequirements}
            onChange={(e) => setSkillsRequirements(e.target.value)}
            placeholder="Skills Required"
          />
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-primary" onClick={addProject}>
          Submit
        </button>
        <button className="btn btn-secondary" onClick={cancleHandler}>
          Cancel
        </button>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="card my-3 p-3 shadow-sm">
          <h5>{project.title}</h5>
          <p>
            <strong>Description:</strong> {project.description}
          </p>
          <p>
            <strong>Skills:</strong> {project.skillsRequirements}
          </p>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteProject(project.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
