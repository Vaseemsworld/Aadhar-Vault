import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import styles from "../styles/Login.module.css";

export default function Login() {
  const [form, set] = useState({ username: "", password: "" });
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const res = await api.post("auth/login/", form);
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    nav("/dashboard");
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submit} className={styles.box}>
        <h2 className={styles.title}>Login</h2>
        <input
          className={styles.input}
          placeholder="Username"
          onChange={(e) => set({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          onChange={(e) => set({ ...form, password: e.target.value })}
        />
        <button className={styles.button}>Login</button>
        <p className={styles.switch}>
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
