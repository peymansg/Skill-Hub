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
    <div className="container justify-content-center align-items-center">
      <h1> Register New User</h1>

      <div className="row m-5 d-flex m-3 justify-content-center align-items-center">
        <div className="justify-content-center align-items-center">
          <div className="col-xs-6 col-md-6 col-lg-6 justify-content-center align-items-center">
            <label className="lable-control ">First Name:</label>
            <input
              className="form-control"
              value={firstname}
              onChange={(data) => setFirstname(data.target.value)}
            ></input>
          </div>
          <div className="col-xs-6 col-md-6 col-lg-6 m-3">
            <label className="lable-control ">LastName:</label>
            <input
              className="form-control"
              value={lastname}
              onChange={(data) => setLastname(data.target.value)}
            ></input>
          </div>
          <div className="col-xs-6 col-md-6 col-lg-6 m-3">
            <label className="lable-control ">Password:</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(data) => setPassword(data.target.value)}
            ></input>
          </div>
          <div className="col-xs-6 col-md-6 col-lg-6 justify-content-center align-items-center">
            <label className="lable-control ">Email:</label>
            <input
              className="form-control"
              value={email}
              onChange={(data) => setEmail(data.target.value)}
            ></input>
          </div>
          <div className="col-xs-6 col-md-6 col-lg-6 justify-content-center align-items-center">
            <label className="lable-control ">UserName:</label>
            <input
              className="form-control"
              value={username}
              type="text"
              onChange={(data) => setUsername(data.target.value)}
            ></input>
          </div>

          <div className="col-md-6 mt-4">
            <button className="btn btn-secondary me-2" onClick={cancelHandler}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={submitHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
