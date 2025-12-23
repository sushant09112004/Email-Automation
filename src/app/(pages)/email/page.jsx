"use client";
import { useState } from "react";

export default function Home() {
  const [emails, setEmails] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-8">
      <div className="w-full max-w-md bg-black border border-white rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          📧 Send Application Email
        </h2>

        <p className="text-sm md:text-base text-gray-400 text-center mt-2 mb-6">
          Enter one or multiple email addresses (comma separated)
        </p>

        <textarea
          placeholder="example@gmail.com, test@gmail.com"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          rows={4}
          className="w-full p-4 bg-black border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white resize-none text-white placeholder-gray-500"
        />

        <button
          onClick={handleSend}
          disabled={loading || !emails.trim()}
          className={`w-full mt-5 py-3 rounded-lg font-medium transition-all duration-200 border-2 ${
            loading || !emails.trim()
              ? "bg-gray-900 border-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-white text-black border-white hover:bg-gray-100"
          }`}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg border ${
              message.includes("success")
                ? "bg-gray-900 border-white text-white"
                : "bg-gray-900 border-gray-600 text-gray-300"
            }`}
          >
            <p className="text-center text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
