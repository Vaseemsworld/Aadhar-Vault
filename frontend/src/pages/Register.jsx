import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import api from "../../api";

export default function Register() {
  const [form, set] = useState({ username: "", password: "" });
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    await api.post("auth/register/", form);
    nav("/login");
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submit} className={styles.box}>
        <h2 className={styles.title}>Register</h2>
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
        <button className={styles.button}>Create Account</button>
        <p className={styles.switch}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
