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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          📧 Send Application Email
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
          Enter one or multiple email addresses (comma separated)
        </p>

        <textarea
          placeholder="example@gmail.com, test@gmail.com"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          rows={4}
          className="w-full mt-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className={`w-full mt-5 py-3 rounded-lg text-white font-medium transition-all duration-200
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }
          `}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
