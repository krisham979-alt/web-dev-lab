import { useState } from "react";
import Input from "./components/Input.jsx";

// Starting values for the login fields
const emptyForm = { email: "", password: "" };

export default function LoginForm({ onSwitchToRegister }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // One handler for every input: read name + value from the event
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  }

  function validate() {
    const nextErrors = {};
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    }
    if (!form.password.trim()) {
      nextErrors.password = "Please enter your password.";
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setMessage("Login looks good (demo only — no real server).");
  }

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <h2 className="card-title">Log in</h2>

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
        placeholder="Your password"
        error={errors.password}
      />

      <button type="submit" className="btn btn-primary">
        Sign in
      </button>

      {message ? (
        <p className="form-message form-message-success" role="status">
          {message}
        </p>
      ) : null}

      <p className="card-footer">
        Need an account?{" "}
        <button type="button" className="link-btn" onClick={onSwitchToRegister}>
          Register
        </button>
      </p>
    </form>
  );
}
