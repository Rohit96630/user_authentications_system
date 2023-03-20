import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Modal.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    id: "",
  });
  const [data, setData] = useState("");
  const { name, phone, email, date } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3002/users/${id}`);
      setData(result.data);
      setUser({
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        date: result.data.date,
        id: result.data.id,
      });
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3002/users/${id}`,
        user
      );
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="p-4  " onSubmit={handleSubmit}>
      <div className="shadow-lg rounded">
        <div className="row  d-flex justify-content-center">
          <h3 className="text-center">
            <b>Edit User</b>
          </h3>
          <div className="col-md-5 mb-3">
            <label>FullName</label>
            <input
              type="text"
              className="form-control is-valid"
              id="name"
              placeholder="full name"
              value={name}
              name="name"
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-md-5 mb-3">
            <label>Phone Number</label>
            <input
              type="number"
              className="form-control is-valid"
              id="validationServer02"
              name="phone"
              placeholder="Last name"
              value={phone}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
        <div className="row  d-flex justify-content-center ">
          <div className="col-md-5 mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control is-valid"
              id="validationServer04"
              placeholder="email..."
              value={email}
              name="email"
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-md-5 mb-3">
            <label>Date Of Birth</label>
            <input
              type="date"
              className="form-control is-valid"
              id="validationServer05"
              placeholder="date..."
              required
              value={date}
              name="date"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
        <div className="row  d-flex justify-content-center ">
          <div className="col-md-2 mb-3">
            <button className="btn btn-primary  sm " type="submit">
              Submit form
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditUser;
