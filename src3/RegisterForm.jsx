import { useState } from "react";
import Input from "./components/Input.jsx";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm({ onSwitchToLogin }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  }

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    }
    if (!form.password) {
      nextErrors.password = "Please choose a password.";
    }
    // Basic check: both password boxes must match
    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setMessage("Account created (demo only — no real server).");
    setForm(emptyForm);
  }

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <h2 className="card-title">Register</h2>

      <Input
        label="Name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="Your name"
        error={errors.name}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@example.com"
        error={errors.email}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Create a password"
        hint="Type the same password again below."
        error={errors.password}
      />

      <Input
        label="Confirm password"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Repeat password"
        error={errors.confirmPassword}
      />

      <button type="submit" className="btn btn-primary">
        Create account
      </button>

      {message ? (
        <p className="form-message form-message-success" role="status">
          {message}
        </p>
      ) : null}

      <p className="card-footer">
        Already registered?{" "}
        <button type="button" className="link-btn" onClick={onSwitchToLogin}>
          Log in
        </button>
      </p>
    </form>
  );
}
