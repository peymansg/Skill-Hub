import { useLocation } from "react-router-dom";
import SkillForm from "./SkillForm";
import ProjectList from "./ProjectList";
const Profile = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const { firstname, username, email } = userData || {};
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm p-4 mb-4 text-center bg-light">
            <h2 className="mb-3">Welcome, {firstname}!</h2>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Username:</strong> {username}
            </p>
          </div>

          <div className="card shadow-sm p-4 mb-4">
            <h3 className="mb-3">Skills</h3>
            <SkillForm />
          </div>

          <div className="card shadow-sm p-4">
            <h3 className="mb-3">Projects</h3>
            <ProjectList />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
