import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { db } from "./Database"; // Your Firebase config
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const AdminDetails = () => {
  // style
  const btngreen = {
    background: "green",
    color: "white",
    padding: "10px 20px",
    border: "none",
  };
  const [image, setImage] = useState(null); // Store selected file
  const [preview, setPreview] = useState(""); // Store Base64 string
  const [imageList, setImageList] = useState([]); // Store all uploaded images

  // Convert selected file to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("Please select an image");

    setImage(file);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreview(reader.result);
      reader.onerror = () => toast.error("Failed to convert image.");
    } catch (err) {
      toast.error("Error reading file");
    }
  };

  // Upload Base64 image to Firestore
  const handleUpload = async () => {
    if (!preview) return toast.error("No image selected");
    try {
      await addDoc(collection(db, "Images"), { imageData: preview });
      toast.success("Image uploaded successfully");
      setPreview("");
      setImage(null);
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  // Real-time listener using onSnapshot
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Images"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImageList(data);
    });

    return () => unsub(); // Cleanup on unmount
  }, []);

  return (
    <>
      <NavigationBar />
      <Toaster />
      <div
        className="container-fluid py-2 text-center text-white h1 text-uppercase"
        style={{ background: "green", letterSpacing: "0.5px" }}
      >
        Admin Panel
      </div>

      <h4
        className="mb-3 display-5 fw-semibold text-center text-uppercase "
        style={{ color: "green" }}
      >
        Upload Vegtables Image
      </h4>
      <div
        className="container-fluid mt-4"
        style={{
          backgroundImage: `url("green-bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="row d-flex justify-content-center align-items-center py-5 mt-4">
          <div className="col-12 col-md-6 ">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control mb-3 "
              style={{
                border: "3px dotted #198754",
                backgroundColor: "#f8f9fa",
                padding: "50px 50px",
              }}
            />
            <div className="row">
              <div className="col-md-6 col-12">
                <label htmlFor="" className="fw-semibold ">
                  Vegtable Price
                </label>
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Price"
                />
              </div>
              <div className="col-md-6 col-12">
                <label htmlFor="" className="fw-semibold">
                  Vegtable Name
                </label>
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Veg Name"
                />
              </div>
            </div>
          </div>
          {preview && (
            <div className="col-12 col-md-6">
              <div className="mb-4 d-flex align-items-center justify-content-center flex-column">
                <img
                  src={preview}
                  alt="Preview"
                  height={250}
                  className="mb-2"
                />
                <br />
                <button
                  onClick={handleUpload}
                  className="rounded"
                  style={btngreen}
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container-fluid mt-4">
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center d-flex flex-column justify-content-center align-items-center">
            <thead className="table-success">
              <tr>
                <th>S.No</th>
                <th>Image</th>
                <th>Image Name</th>
                <th>
                  Price <br />
                  1Kg
                </th>
                <th>Action</th>
                <th>Out of Stack</th>
              </tr>
            </thead>
            <tbody>
              {imageList.map((img, index) => (
                <tr key={img.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={img.imageData}
                      alt={img.name}
                      height={100}
                      style={{ borderRadius: "5px" }}
                    />
                  </td>
                  <td>{img.name}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control w-100"
                      value={img.inputValue}
                      onChange={(e) =>
                        handleInputChange(img.id, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleButtonClick(img.id)}
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDetails;
