import { useMemo, useState } from "react";

const defaultMessage = "How can Friday AI help you today?";

function getApiUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl) {
    return configuredUrl;
  }

  if (typeof window === "undefined") {
    return "http://localhost:8080/api/chat";
  }

  const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  if (isLocalHost) {
    return "http://localhost:8080/api/chat";
  }

  return "/api/chat";
}

export default function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("Idle");
  const [error, setError] = useState("");

  const apiUrl = useMemo(() => getApiUrl(), []);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setError("Enter a message before sending it.");
      return;
    }

    setStatus("Sending...");
    setError("");
    setResponse("");

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed.");
      }

      setResponse(data.reply || "No response received.");
      setStatus("Completed");
    } catch (err) {
      setStatus("Request failed");
      setError(
        `${err instanceof Error ? err.message : "Unknown error."} Configure VITE_API_URL for Vercel or production deployments.`,
      );
    }
  };

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div className="badge">Production-ready frontend</div>
        <h1>Friday AI</h1>
        <p className="hero-copy">
          A lightweight chat workspace that can connect to a local Go backend
          or a hosted AI API in production.
        </p>

        <div className="status-grid">
          <article>
            <span>Status</span>
            <strong>{status}</strong>
          </article>
          <article>
            <span>API URL</span>
            <strong>{apiUrl}</strong>
          </article>
        </div>

        <label className="composer-label" htmlFor="prompt">
          Prompt
        </label>
        <textarea
          id="prompt"
          className="composer"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={defaultMessage}
          rows={5}
        />

        <div className="actions">
          <button type="button" onClick={sendMessage}>
            Send message
          </button>
          <p>
            Tip: in Vercel, set <code>VITE_API_URL</code> to your hosted backend.
          </p>
        </div>

        {error ? <div className="alert">{error}</div> : null}

        <section className="response-panel" aria-live="polite">
          <div className="response-header">
            <h2>Response</h2>
            <span>Latest AI output appears here</span>
          </div>
          <pre>{response || "Waiting for a response..."}</pre>
        </section>
      </section>
    </main>
  );
}
