import { useState } from "react";
import UserModel from "../../models/UserModel";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<UserModel[]>([]);

  const submitHandler = async () => {
    if (!firstname || !lastname || !password || !email || !username) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/users");
      const data = await response.json();
      const users = data._embedded?.users || []; // get the users array inside _embedded

      const userExits = users.some(
        (user: UserModel) =>
          user.firstname.toLowerCase() === firstname.toLowerCase() &&
          user.lastname.toLowerCase() === lastname.toLowerCase()
      );

      if (userExits) {
        alert("User already exists!");
        return;
      }
      const saveResponse = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          password,
          email,
          username,
        }),
      });
      if (saveResponse.ok) {
        alert("User registered successfully!");
        setFirstname("");
        setLastname("");
        setPassword("");
        setEmail("");
        setUsername("");
      } else {
        alert("Failed to register user.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
    console.log("Sending user:", {
      firstname,
      lastname,
      password,
      email,
      username,
    });
  };

  const cancelHandler = () => {
    setFirstname("");
    setLastname("");
    setPassword("");
    setEmail("");
    setUsername("");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "auto",
      }}
    >
      <h2>Register</h2>
      <input
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="First name"
        style={{ marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        placeholder="Last name"
        style={{ marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={{ marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ marginBottom: "10px", padding: "8px" }}
      />
      <button onClick={submitHandler} style={{ padding: "10px" }}>
        Register
      </button>
    </div>
  );
};
export default Register;
