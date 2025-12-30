"use client";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Link as LinkIcon,
  Undo,
  Redo
} from "lucide-react";

// Utility function to strip inline styles from HTML
function stripInlineStyles(html) {
  if (typeof window === "undefined") return html;
  if (!html || typeof html !== "string") return html;
  
  try {
    // Create a temporary DOM element
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    
    // Remove style and class attributes from all elements
    const allElements = tempDiv.querySelectorAll("*");
    allElements.forEach((el) => {
      el.removeAttribute("style");
      // Keep some semantic classes but remove styling classes
      const currentClass = el.getAttribute("class");
      if (currentClass) {
        // Remove classes that contain style-related keywords
        const classes = currentClass.split(" ").filter(cls => 
          !cls.includes("style") && 
          !cls.includes("color") && 
          !cls.includes("bg-") &&
          !cls.includes("text-") &&
          !cls.includes("font-") &&
          !cls.includes("margin") &&
          !cls.includes("padding")
        );
        if (classes.length > 0) {
          el.setAttribute("class", classes.join(" "));
        } else {
          el.removeAttribute("class");
        }
      }
    });
    
    return tempDiv.innerHTML;
  } catch (error) {
    console.error("Error stripping inline styles:", error);
    return html;
  }
}

export default function AIPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
    ],
    content: "",
    // Important for Next.js SSR: avoid rendering editor content on the server
    // so that hydration matches the client-rendered content.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none p-4 min-h-[400px] text-black [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-2 [&_h3]:mb-1 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1 [&_a]:text-blue-600 [&_a]:underline",
      },
      transformPastedHTML(html) {
        // Strip inline styles from pasted content
        return stripInlineStyles(html);
      },
    },
    parseOptions: {
      preserveWhitespace: "full",
    },
  });

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

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Unknown error occurred" }));
        setMessage(errorData.message || `Error: ${res.status} ${res.statusText}`);
        return;
      }

      const data = await res.json();

      if (data.success) {
        // Strip inline styles from LLM-generated content
        const cleanContent = stripInlineStyles(data.emailContent);
        // Set content in editor
        if (editor && !editor.isDestroyed) {
          editor.commands.setContent(cleanContent);
        }
        setMessage("Email generated successfully! You can edit it below.");
      } else {
        setMessage(data.message || "Failed to generate email");
      }
    } catch (err) {
      console.error("Error generating email:", err);
      setMessage(err.message || "Something went wrong while generating email");
    } finally {
      setGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!recipientEmail.trim()) {
      setMessage("Please enter recipient email address");
      return;
    }

    if (!editor || !editor.getHTML().trim()) {
      setMessage("Please generate or enter email content first");
      return;
    }

    setSending(true);
    setMessage("");

    try {
      // Get HTML from editor and strip any remaining inline styles
      let emailContent = editor.getHTML();
      emailContent = stripInlineStyles(emailContent);

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
        if (editor) {
          editor.commands.clearContent();
        }
        setRecipientEmail("");
      }
    } catch (err) {
      setMessage("Something went wrong while sending email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          AI-Powered Application Email Generator
        </h1>
        <p className="text-gray-600 text-center mb-8 text-sm md:text-base">
          Enter job description to generate personalized application email
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Job Description
              </label>
              <textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={12}
                className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black placeholder-gray-400"
              />
              <button
                onClick={handleGenerate}
                disabled={generating || !jobDescription.trim()}
                className={`w-full mt-4 py-3 rounded-lg font-medium transition-all duration-200 border ${
                  generating || !jobDescription.trim()
                    ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {generating ? "Generating..." : "Generate Email with AI"}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Recipient Email Address
              </label>
              <input
                type="email"
                placeholder="recipient@example.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Column - Generated Email */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Generated Email Content (Editable)
              </label>
              {/* Toolbar */}
              {editor && (
                <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border border-gray-300 border-b-0 rounded-t-lg">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive("bold") ? "bg-blue-100 text-blue-700" : "text-gray-700"
                    }`}
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive("italic") ? "bg-blue-100 text-blue-700" : "text-gray-700"
                    }`}
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive("heading", { level: 1 }) ? "bg-blue-100 text-blue-700" : "text-gray-700"
                    }`}
                    title="Heading 1"
                  >
                    <Heading1 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive("heading", { level: 2 }) ? "bg-blue-100 text-blue-700" : "text-gray-700"
                    }`}
                    title="Heading 2"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive("heading", { level: 3 }) ? "bg-blue-100 text-blue-700" : "text-gray-700"
                    }`}
                    title="Heading 3"
                  >
                    <Heading3 className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive("bulletList") ? "bg-blue-100 text-blue-700" : "text-gray-700"
                    }`}
                    title="Bullet List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive("orderedList") ? "bg-blue-100 text-blue-700" : "text-gray-700"
                    }`}
                    title="Numbered List"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => {
                      const url = window.prompt("Enter URL:");
                      if (url) {
                        editor.chain().focus().setLink({ href: url }).run();
                      }
                    }}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                      editor.isActive("link") ? "bg-blue-100 text-blue-700" : "text-gray-700"
                    }`}
                    title="Add Link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  {editor.isActive("link") && (
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().unsetLink().run()}
                      className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700"
                      title="Remove Link"
                    >
                      <LinkIcon className="w-4 h-4 rotate-45" />
                    </button>
                  )}
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Undo"
                  >
                    <Undo className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Redo"
                  >
                    <Redo className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="w-full bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 min-h-[400px] overflow-auto">
                {editor ? (
                  <EditorContent editor={editor} />
                ) : (
                  <div className="p-4 text-gray-400 text-sm">
                    Loading editor...
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Note: Inline CSS styles are automatically removed from the content
              </p>
            </div>

            <button
              onClick={handleSend}
              disabled={sending || !editor || !editor.getHTML().trim() || !recipientEmail.trim()}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 border ${
                sending || !editor || !editor.getHTML().trim() || !recipientEmail.trim()
                  ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
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
                ? "bg-blue-50 border-blue-500 text-blue-900"
                : "bg-red-50 border-red-400 text-red-700"
            }`}
          >
            <p className="text-center">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}


