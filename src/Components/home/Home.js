import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
// import "./modal.css";
// import "../Users/modal.css";
import { useNavigate } from "react-router-dom";
import Birthday from "./Birthday";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3002/users");
      setData(result.data);
    };
    fetchData();
    loadUser();
  }, []);

  function handleSumbt() {
    navigate("/adduser");
  }
  function EditButton(id) {
    navigate(`/editUser/${id}`);
  }

  // const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  // const day = currentDate.getDate().toString().padStart(2, "0");
  // const formattedDate = `${year}-${month}-${day}`;
  // const userBday = data.filter((x, z) => {
  //   return x.date === formattedDate;
  // });
  // console.log(userBday);

  // setTimeout(() => {
  //   if (userBday.length > 0) {
  //     userBday.map((item) => {
  //       swal({
  //         title: `Happy Birthday, ${item.name}! 🎉🎂`,
  //         text: "Wishing you all the best on your special day!",
  //         icon: "success",
  //         button: "Thank you!",
  //       });
  //     });
  //   }
  // }, 3000);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:3002/users");
    setData(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3002/users/${id}`);
    loadUser();
  };

  function handleView(id) {
    const filteredData = data.filter((x, z) => {
      return x.id === id;
    });
    setModalData(filteredData);
    setOpenModal(true);
  }
  function logoutBtn() {
    navigate("/");
  }

  return (
    <>
      <nav class="navbar navbar-expand-sm fixed-top navbar-light bg-dark nav_bar">
        <div class="container-fluid ">
          <a class="navbar-brand " href="#">
            <img
              src="Images/1677325632047.jpeg"
              alt="image-fluid"
              className="logoImages"
            />
          </a>

          <div class="collapse navbar-collapse " id="navbarScroll">
            <ul
              class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ "--bs-scroll-height": "100px" }}
            >
              <li class="nav-item ">
                <a class="nav-link active  text-dark" aria-current="page">
                  <img
                    src="Images/home.png"
                    alt="images-fluid"
                    className="homeImages"
                  />
                </a>
              </li>
            </ul>
            <form class="d-flex Button ">
              <button
                class="btn  btn-sm btn-outline-success text-white bg-success"
                type="submit"
                onClick={handleSumbt}
              >
                Add Users
                <img
                  src="Images/icons8-join-48.png"
                  alt="image-fluid"
                  className="AddLogo"
                />
              </button>
            </form>
            <form class="d-flex Button ">
              <button
                class="btn btn-outline-primary  btn-sm text-danger "
                type="submit"
                onClick={logoutBtn}
              >
                Logout
                <img
                  src="Images/shutdown.png"
                  alt="image-fluid"
                  className="AddLogo"
                />
              </button>
            </form>
          </div>
        </div>
      </nav>
      {/* user Information START  */}
      <div className="Tabless table-responsive-sm-md-lg-xl">
        <div className="container p-3 shadow table-responsive">
          <div className="row col-lg-12  rounded">
            <div className="col-lg-12">
              <table className="table">
                <thead className="TableHeader">
                  <tr>
                    <th>SI.No</th>
                    <th>FullName</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th className="action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="table-row">
                      {" "}
                      <>
                        <td>{index + 1}</td>
                        <td className="OverLap ">{row.name}</td>
                        <td>{row.phone}</td>
                        <td>{row.email}</td>
                        <td>{row.date}</td>
                        <td className="row-gap">
                          <button
                            onClick={() => handleView(row.id)}
                            className=" btn btn-sm btn-outline-primary p-0 m-0 "
                          >
                            View
                            <img
                              src="Images/view.png"
                              alt=".."
                              className="Edit_logo"
                            />
                          </button>

                          <button
                            onClick={() => EditButton(row.id)}
                            className="p-0 btn btn-outline-success m-0 "
                          >
                            Edit
                            <img
                              src="Images/edit.png"
                              alt=".."
                              className="Edit_logo"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteUser(row.id)}
                            className=" btn btn-sm btn-outline-danger p-0 m-0"
                          >
                            Delete
                            <img
                              src="Images/delete.png"
                              alt=".."
                              className="Edit_logo"
                            />
                          </button>
                        </td>
                      </>
                    </tr>
                  ))}
                  <ul></ul>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {openModal && (
          <div className="modal-wrapper">
            <div
              className="modalBackdrop"
              onClick={() => setOpenModal(!openModal)}
            />
            <div className="modal-box">
              <div className="moadl-content">
                <h3> User Information</h3>
                <h4>
                  User Name:<span>{modalData[0]?.name}</span>
                </h4>
                <p>
                  Phone Number:<span>{modalData[0]?.phone}</span>
                </p>
                <p>
                  Address :<span>{modalData[0]?.email}</span>
                </p>
                <p>
                  birthday:<span>{modalData[0]?.date}</span>
                </p>
              </div>
              <button
                onClick={() => setOpenModal(!openModal)}
                className="closeBtn"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="Birthday">
        <Birthday data={data} />
      </div>
    </>
  );
};

export default Home;
