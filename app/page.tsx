"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    setLoading(true);
    setError("");
    setImage("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();

      if (data.imageUrl) {
        setImage(data.imageUrl);
      } else {
        throw new Error("No image URL returned from API");
      }
    } catch (err: unknown) {
      console.error("Error generating image:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        padding: "3rem 1rem",
        textAlign: "center",
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        🎨 DC Comic Cover Generator
      </h1>
      <p style={{ marginBottom: "1rem", color: "#aaa" }}>
        Enter a creative prompt below (include your trigger word <b>dccomic</b> to apply your trained style)
      </p>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: dccomic Wonder Woman fighting villains with lightning in the background"
        style={{
          width: "70%",
          padding: "0.75rem",
          borderRadius: "6px",
          border: "1px solid #555",
          backgroundColor: "#222",
          color: "white",
          fontSize: "1rem",
        }}
      />

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={generateImage}
          disabled={loading || !prompt}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            background: loading ? "#555" : "#0070f3",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "none",
            transition: "all 0.2s ease-in-out",
          }}
        >
          {loading ? "Generating..." : "Generate Cover"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          ⚠️ {error}
        </p>
      )}

      {image && (
        <div style={{ marginTop: "2rem" }}>
          <img
            src={image}
            alt="Generated comic cover"
            style={{
              width: "512px",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(255,255,255,0.2)",
              border: "2px solid #444",
            }}
          />
          <p style={{ marginTop: "0.5rem", color: "#888" }}>
            Generated comic cover
          </p>
        </div>
      )}
    </main>
  );
}
