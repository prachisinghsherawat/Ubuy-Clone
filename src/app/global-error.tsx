"use client";

/**
 * Last-resort boundary for failures in the root layout itself. It replaces the
 * whole document, so it must ship its own <html>/<body> and cannot rely on
 * antd — the providers it would need are exactly what failed to mount.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          margin: 0,
          padding: 24,
          textAlign: "center",
          color: "#1f2933",
        }}
      >
        <main>
          <h1 style={{ fontSize: 24, marginBottom: 8 }}>Ubuy is temporarily unavailable</h1>
          <p style={{ color: "#616e7c", marginBottom: 24 }}>
            {error.digest ? `Reference: ${error.digest}` : "An unexpected error occurred."}
          </p>
          <button
            onClick={reset}
            style={{
              padding: "10px 22px",
              fontSize: 15,
              border: 0,
              borderRadius: 6,
              background: "#ff6a00",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </main>
      </body>
    </html>
  );
}
