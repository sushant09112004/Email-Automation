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
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-2">
          📧 Send Application Email
        </h2>

        <p className="text-sm md:text-base text-gray-600 text-center mt-2 mb-6">
          Enter one or multiple email addresses (comma separated)
        </p>

        <textarea
          placeholder="example@gmail.com, test@gmail.com"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          rows={4}
          className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black placeholder-gray-400"
        />

        <button
          onClick={handleSend}
          disabled={loading || !emails.trim()}
          className={`w-full mt-5 py-3 rounded-lg font-medium transition-all duration-200 border ${
            loading || !emails.trim()
              ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg border ${
              message.includes("success")
                ? "bg-blue-50 border-blue-500 text-blue-900"
                : "bg-red-50 border-red-400 text-red-700"
            }`}
          >
            <p className="text-center text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
