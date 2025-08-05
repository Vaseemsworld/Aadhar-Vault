import React, { useEffect, useMemo, useState } from "react";
import styles from "../styles/AssignOrders.module.css";
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { BsFingerprint } from "react-icons/bs";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMainContext } from "../context/MainContext";

const dummyOrders = [
  {
    id: 1,
    type: "Mobile Update",
    name: "RUPNARAYAN KUMAR",
    mobile: "8438336517",
    aadhaar: "239233303791",
  },
  {
    id: 2,
    type: "Mobile Update",
    name: "NADIYA PARVIN",
    mobile: "6294564051",
    aadhaar: "289119950969",
  },
  {
    id: 3,
    type: "Demographics",
    name: "BHIKTER KUMAR",
    mobile: "9334975619",
    change: "",
  },
  {
    id: 4,
    type: "Child Enrollment",
    name: "BHUKO SINGH",
    fathername: "DHAPO SINGH",
    mobile: "9067812380",
  },
  {
    id: 5,
    type: "Aadhaar Number",
    date: "12/6/25",
    appliedby: "SRK",
    enrollment: "90673989812385",
  },
];

const dummyComplaints = [];

const columnConfig = {
  "Mobile Update": [
    { key: "type", label: "Type" },
    { key: "name", label: "Name" },
    { key: "mobile", label: "Mobile No." },
    { key: "aadhaar", label: "Aadhaar No." },
  ],
  Demographics: [
    { key: "type", label: "Type" },
    { key: "name", label: "Name" },
    { key: "mobile", label: "Mobile No." },
    { key: "change", label: "Change" },
  ],
  "Child Enrollment": [
    { key: "type", label: "Type" },
    { key: "name", label: "Child Name" },
    { key: "fathername", label: "Father Name" },
    { key: "mobile", label: "Mobile No." },
  ],
  "Aadhaar Number": [
    { key: "date", label: "Date" },
    { key: "appliedby", label: "Applied By" },
    { key: "enrollment", label: "Enrollment" },
  ],
  "Aadhaar PDF": [
    { key: "type", label: "Type" },
    { key: "date", label: "Date" },
    { key: "enrollment", label: "Enroll/Aadhaar" },
    { key: "status", label: "Status" },
  ],
};

const highlightMatch = (text, query) => {
  if (!query || typeof text !== "string") return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    )
  );
};

const DynamicTable = ({
  data,
  columns,
  searchQuery,
  sortKey,
  sortOrder,
  onSort,
}) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th>#</th>
        {columns.map((col) => (
          <th
            key={col.key}
            onClick={() => onSort(col.key)}
            style={{ cursor: "pointer" }}
          >
            {col.label}{" "}
            {sortKey === col.key ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </th>
        ))}
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            {columns.map((col) => (
              <td key={col.key}>
                {highlightMatch(row[col.key] || "-", searchQuery)}
              </td>
            ))}
            <td>
              <div className={styles.actions}>
                <button
                  className={`${styles.actionBtn} ${styles.FaEdit}`}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className={`${styles.actionBtn} ${styles.BsFingerprint}`}
                  title="Fingerprint"
                >
                  <BsFingerprint />
                </button>
                <button
                  className={`${styles.actionBtn} ${styles.FaEye}`}
                  title="View"
                >
                  <FaEye />
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length + 2} className={styles.noData}>
            No orders found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

const AssignOrders = () => {
  const { currentPath } = useMainContext();
  const [searchParams] = useSearchParams();
  const orderType = searchParams.get("type");
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [tableHeading, setTableHeading] = useState("");

  const typeLabelMap = {
    mobile: "Mobile Update",
    demographics: "Demographics",
    child: "Child Enrollment",
    aadhaarno: "Aadhaar Number",
    aadhaarpdf: "Aadhaar PDF",
  };

  useEffect(() => {
    const label = typeLabelMap[orderType?.toLowerCase()];
    if (label) {
      const filtered = dummyOrders.filter((order) =>
        order.type?.toLowerCase().includes(label.toLowerCase())
      );
      setOrders(filtered);
    }
    if (currentPath === "Assign") setTableHeading("Assign Orders");
    else if (currentPath === "Entry-complaint")
      setTableHeading("Entry Complaint");
  }, [orderType, currentPath]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get("type")) navigate("/dashboard", { replace: true });
  }, [location, navigate]);

  const addOrder = (orderType) => {
    navigate(`/create-order?type=${orderType}`, { replace: true });
  };
  const filteredOrders = useMemo(() => {
    let result = [...orders];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((row) =>
        ["name", "mobile", "aadhaar"]
          .filter((key) => key in row)
          .some((key) => row[key]?.toLowerCase().includes(q))
      );
    }
    if (sortKey) {
      result.sort((a, b) => {
        const valA = (a[sortKey] || "").toLowerCase();
        const valB = (b[sortKey] || "").toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    }
    return result;
  }, [orders, searchQuery, sortKey, sortOrder]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{tableHeading}</h2>

      <div className={styles.createBtn}>
        {tableHeading === "Assign Orders" && (
          <button className={styles.btn} onClick={() => addOrder(orderType)}>
            <FaPlus className={styles.plusIcon} />
            Create New
          </button>
        )}
      </div>
      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder="Search by name, mobile, Aadhaar..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.tableWrapper}>
        {currentPath === "Assign" && (
          <DynamicTable
            data={filteredOrders}
            columns={columnConfig[typeLabelMap[orderType?.toLowerCase()]] || []}
            searchQuery={searchQuery}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
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
              {dummyComplaints.length > 0 ? (
                dummyComplaints.map((order, idx) => (
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
                    No complaints found.
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
