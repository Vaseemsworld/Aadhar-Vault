import React, { useEffect, useState } from "react";
import styles from "../styles/AssignOrders.module.css";
import { FaEdit } from "react-icons/fa";
import { BsFingerprint } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMainContext } from "../context/MainContext";

const dummyOrders = [
  // {
  //   id: 1,
  //   type: "Mobile Update",
  //   name: "RUPNARAYAN KUMAR",
  //   mobile: "8438336517",
  //   aadhaar: "239233303791",
  // },
  // {
  //   id: 2,
  //   type: "Mobile Update",
  //   name: "NADIYA PARVIN",
  //   mobile: "6294564051",
  //   aadhaar: "289119950969",
  // },
  // {
  //   id: 3,
  //   type: "Mobile Update",
  //   name: "BHIKTER KUMAR",
  //   mobile: "9334975619",
  //   aadhaar: "815494605035",
  // },
  // Add more items as needed...
];

const AssignOrders = () => {
  const { currentPath } = useMainContext();
  const [orders, setOrders] = useState(dummyOrders);
  const [searchParams] = useSearchParams();
  const orderType = searchParams.get("type");
  const [tableHeading, setTableHeading] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    {
      console.log("current path", currentPath);
    }
    {
      currentPath === "Entry-complaint" &&
        console.log(" i am in entry complaint");
    }
  }, [currentPath, orderType]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get("type")) {
      navigate("/dashboard", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    setOrders(dummyOrders);

    if (orderType) {
      if (orderType === "mobile") {
        setTableHeading("Mobile Update");
      } else if (orderType === "demographics") {
        setTableHeading("Demographics");
      } else if (orderType === "child") {
        setTableHeading("Child Enrollment");
      } else if (orderType === "aadharno") {
        setTableHeading("Aadhar Number");
      } else if (orderType === "aadharpdf") {
        setTableHeading("Aadhar PDF");
      }
    }
  }, [orderType]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{tableHeading}</h2>
      <div className={styles.tableWrapper}>
        {currentPath === "Assign" && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Name</th>
                <th>Mobile No.</th>
                <th>Aadhaar No.</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, idx) => (
                  <tr key={order.id}>
                    <td>{idx + 1}</td>
                    <td>{order.type}</td>
                    <td>{order.name}</td>
                    <td>{order.mobile}</td>
                    <td>{order.aadhaar}</td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Edit">
                          <FaEdit />
                        </button>
                        <button
                          className={styles.actionBtn}
                          title="Fingerprint"
                        >
                          <BsFingerprint />
                        </button>
                        <button className={styles.actionBtn} title="View">
                          <FaEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.noData}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {currentPath === "Entry-complaint" && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>EntryDate</th>
                <th>Name</th>
                <th>AadhaarNo</th>
                <th>Mobile</th>
                <th>Complaint</th>
                <th>Update</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, idx) => (
                  <tr key={order.id}>
                    <td>{idx + 1}</td>
                    <td>{order.date}</td>
                    <td>{order.entrydate}</td>
                    <td>{order.name}</td>
                    <td>{order.aadhaar}</td>
                    <td>{order.mobile}</td>
                    <td>{order.complaint}</td>
                    <td>{order.update}</td>
                    <td>{order.action}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className={styles.noData}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AssignOrders;
