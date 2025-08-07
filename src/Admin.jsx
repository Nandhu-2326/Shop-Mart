import React, { useState } from "react";
import { db } from "./Database";
import { collection, getDocs, query, where } from "firebase/firestore";
import NavigationBar from "./NavigationBar";
import toast from "react-hot-toast";
import { ThreeDot } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const nav = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [states, setStates] = useState(false);
  const login = async () => {
    if (!username) {
      return toast.error("Enter User-Name");
    }
    if (!password) {
      return toast.error("Enter Password");
    }
    try {
      setStates(true);
      const querys = query(
        collection(db, "Admin"),
        where("username", "==", username),
        where("password", "==", password)
      );
      const fetchData = await getDocs(querys);
      if (fetchData.empty) {
        toast.error("Invalid User-Name or Password");
      } else {
        toast.success("Login Success");
        nav("/AdminDetails")
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setStates(false);
    }
  };
  return (
    <>
      <NavigationBar />
      <div className=" " style={{ marginTop: "50px" }}>
        <h1
          className="text-uppercase text-white w-100 py-4 text-center"
          style={{ letterSpacing: "1px", background: "green" }}
        >
          Admin Login
        </h1>
      </div>
      <div className="container-fluid">
        <div
          className="row d-flex justify-content-center p-3  align-items-center py-5 "
          style={{ overflow: "hidden" }}
        >
          <div className="col-12 col-sm-8 col-md-4">
            <div className="card mt-5 w-100">
              <div className="card-body d-flex flex-column gap-3     ">
                <label htmlFor="username">User name</label>
                <input
                  type="text"
                  name="username"
                  placeholder="User Name"
                  className="form-control"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="form-control "
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  style={{ background: "green" }}
                  className="border-0 rounded-2 text-white py-2"
                  onClick={login}
                >
                  {states ? (
                    <ThreeDot
                      color="#ffffff"
                      size="medium"
                      text=""
                      textColor=""
                    />
                  ) : (
                    "LOGIN"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
