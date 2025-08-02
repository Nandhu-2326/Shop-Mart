import React, { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import "./style/NavigationBar.css";
const NavigationBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="container-fluid shadow py-3 ">
        <div className="row">
          <div className="col-4 d-flex  justify-content-md-start">
            <h1 className="h1 logo-h1 text-center">Fresh Vegtables</h1>
          </div>
          <div className="col-8 d-flex align-items-center justify-content-end">
            <ul className="list-unstyled d-none d-md-flex justify-content-around w-100 align-items-center">
              <li className="Main-link">Home</li>
              <li className="Main-link"> Admin</li>
              <li className="Main-link">Products</li>
              <li className="Main-link">Catagori</li>
              <li className="Main-link">Contact Us</li>
              <input
                type="text"
                placeholder="Search Product "
                className="form-control w-25"
              />
            </ul>

            <img
              src="dots.png"
              alt=""
              width={30}
              className="img-fluid d-md-none"
              onClick={handleShow}
            />

            <Offcanvas show={show} onHide={handleClose} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul className="list-unstyled gap-4 d-flex flex-column">
                  <li>Home</li>
                  <li>Products</li>
                  <li>Catagori</li>
                  <li>Contact Us</li>
                  <li>Admin</li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
