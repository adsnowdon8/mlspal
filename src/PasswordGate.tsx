import React, { useState } from "react";

const SESSION_KEY = "mls_auth";

function getSessionAuth(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function setSessionAuth(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, "true");
  } catch {
    // sessionStorage unavailable; auth persists only in component state
  }
}

export const PasswordGate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authenticated, setAuthenticated] = useState(getSessionAuth);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (authenticated) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase() === "diameter") {
      setSessionAuth();
      setAuthenticated(true);
    } else {
      setError(true);
      setInput("");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">MLS PAL</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Enter the password to continue
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            autoFocus
            className="border rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && (
            <p className="text-red-500 text-sm">
              Incorrect password. Try again.
            </p>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};
