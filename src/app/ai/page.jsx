"use client";
import { useState } from "react";

export default function AIPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setMessage("Please enter a job description");
      return;
    }

    setGenerating(true);
    setMessage("");

    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      });

      const data = await res.json();

      if (data.success) {
        setEmailContent(data.emailContent);
        setMessage("Email generated successfully! You can edit it below.");
      } else {
        setMessage(data.message || "Failed to generate email");
      }
    } catch (err) {
      setMessage("Something went wrong while generating email");
    } finally {
      setGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!recipientEmail.trim()) {
      setMessage("Please enter recipient email address");
      return;
    }

    if (!emailContent.trim()) {
      setMessage("Please generate or enter email content first");
      return;
    }

    setSending(true);
    setMessage("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emails: recipientEmail,
          emailContent: emailContent,
        }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        // Clear form after successful send
        setJobDescription("");
        setEmailContent("");
        setRecipientEmail("");
      }
    } catch (err) {
      setMessage("Something went wrong while sending email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          AI-Powered Application Email Generator
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm md:text-base">
          Enter job description to generate personalized application email
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Job Description
              </label>
              <textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={12}
                className="w-full p-4 bg-black border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white resize-none text-white placeholder-gray-500"
              />
              <button
                onClick={handleGenerate}
                disabled={generating || !jobDescription.trim()}
                className={`w-full mt-4 py-3 rounded-lg font-medium transition-all duration-200 border-2 ${
                  generating || !jobDescription.trim()
                    ? "bg-gray-900 border-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-white text-black border-white hover:bg-gray-100"
                }`}
              >
                {generating ? "Generating..." : "Generate Email with AI"}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Recipient Email Address
              </label>
              <input
                type="email"
                placeholder="recipient@example.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full p-4 bg-black border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Right Column - Generated Email */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Generated Email Content (Editable)
              </label>
              <textarea
                placeholder="Generated email will appear here. You can edit it manually."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={16}
                className="w-full p-4 bg-black border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white resize-none text-white placeholder-gray-500 font-mono text-sm"
              />
            </div>

            <button
              onClick={handleSend}
              disabled={sending || !emailContent.trim() || !recipientEmail.trim()}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 border-2 ${
                sending || !emailContent.trim() || !recipientEmail.trim()
                  ? "bg-gray-900 border-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-white text-black border-white hover:bg-gray-100"
              }`}
            >
              {sending ? "Sending..." : "Send Email"}
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg border ${
              message.includes("success")
                ? "bg-gray-900 border-white text-white"
                : "bg-gray-900 border-gray-600 text-gray-300"
            }`}
          >
            <p className="text-center">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}


