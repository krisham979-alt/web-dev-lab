import { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

export default function App() {
  // "login" or "register" — which form to show
  const [mode, setMode] = useState("login");

  return (
    <div className="app">
      <main className="app-main">
        <h1 className="app-title">Forms</h1>
        <p className="app-subtitle">Login and register</p>

        <div className="card">
          {mode === "login" ? (
            <LoginForm onSwitchToRegister={() => setMode("register")} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setMode("login")} />
          )}
        </div>
      </main>
    </div>
  );
}
