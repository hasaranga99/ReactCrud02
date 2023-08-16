import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
// import CreateStudent from './CreateStudent';

function Student() {
  const [student, setStudent] = useState([]);
  //console.log("student", student);
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8081/student/' + id); // Corrected URL
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <NavLink to="/create" className="btn btn-success">
          Add +
        </NavLink>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                  <Link to={`update/${data.id}`} className="btn btn-primary">
                    Update
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={ e => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
