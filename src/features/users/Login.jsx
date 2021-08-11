import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1> Login </h1>
      <form>
        <label>
          Email
          <input
            name="email"
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(() => e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            id="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(() => e.target.value)}
          />
        </label>
      </form>
    </div>
  );
}
