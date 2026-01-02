"use client";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Pencil, Send, Zap, Users, MessageSquare, Shield, CloudLightning as Lightning } from "lucide-react"
import { NavbarDemo,  } from "../Navbar/Navbar"
import { useRouter } from "next/navigation";


export default function Landing() {
  const router = useRouter();
  
  return (
    <div className="w-full bg-white text-black">
      <NavbarDemo />
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">
            Smarter Email Automation, Without Complexity
          </h1>
          <p className="text-xl text-gray-600 text-balance max-w-2xl mx-auto">
            Write, customize, and send emails manually or with AI — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-900 px-8 py-6 text-lg" onClick={() => router.push("/email")}>
              Send Direct Email
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-black text-black hover:bg-gray-50 px-8 py-6 text-lg bg-transparent"
              onClick={() => router.push("/ai")}
            >
              Generate with AI
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How Email Automato Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Choose Mode</h3>
              <p className="text-gray-600">Select between direct email or AI-assisted email generation.</p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <Pencil className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Edit & Customize</h3>
              <p className="text-gray-600">Fine-tune your email using a rich text editor before sending.</p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Send Instantly</h3>
              <p className="text-gray-600">Send clean, reliable HTML emails using secure SMTP.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Modes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Two Ways to Send Emails</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Direct Email Card */}
            <Card className="p-8 border border-gray-200 rounded-lg space-y-6">
              <h3 className="text-3xl font-bold">Direct Email</h3>
              <p className="text-gray-600 text-lg">
                Perfect for quick messages. Write your email manually and send it instantly.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                  <span>No AI involvement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                  <span>Full manual control</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                  <span>Fast and simple</span>
                </li>
              </ul>
              <Button className="w-full bg-black text-white hover:bg-gray-900 py-6" onClick={() => router.push("/email")}>Compose Email</Button>
            </Card>

            {/* AI-Customized Email Card */}
            <Card className="p-8 border border-gray-200 rounded-lg space-y-6">
              <h3 className="text-3xl font-bold">AI-Customized Email</h3>
              <p className="text-gray-600 text-lg">
                Generate professional email drafts using AI, edit them, and send with confidence.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                  <span>AI-generated content</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                  <span>Fully editable</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                  <span>Professional tone</span>
                </li>
              </ul>
              <Button className="w-full bg-black text-white hover:bg-gray-900 py-6" onClick={() => router.push("/ai")}>Generate with AI</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Editor Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Editing Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Description */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Rich Text Editing</h3>
                <p className="text-gray-600">
                  Our powerful editor provides all the tools you need to create professional emails with full formatting
                  control.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Clean HTML Output</h3>
                <p className="text-gray-600">
                  Generate semantic, clean HTML that renders perfectly across all email clients and devices.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Email-Safe Formatting</h3>
                <p className="text-gray-600">
                  All formatting is optimized for email delivery, ensuring your messages look perfect every time.
                </p>
              </div>
            </div>

            {/* Right: Editor Mockup */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="flex gap-2 pb-4 border-b border-gray-200">
                <button className="p-2 hover:bg-gray-200 rounded">
                  <Zap className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded font-bold">B</button>
                <button className="p-2 hover:bg-gray-200 rounded italic">I</button>
                <button className="p-2 hover:bg-gray-200 rounded underline">U</button>
                <button className="p-2 hover:bg-gray-200 rounded">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
              <div className="min-h-40 text-gray-400 text-sm leading-relaxed">
                <p>Your email content goes here...</p>
                <p className="mt-4">All formatting is preserved in clean HTML.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Email Automato Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Email Automato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="p-6 border border-gray-200 rounded-lg space-y-4">
              <Zap className="w-8 h-8 text-black" />
              <h3 className="text-xl font-semibold">Simple & Fast</h3>
              <p className="text-gray-600">Minimal steps, no clutter. Get your emails sent in seconds.</p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 border border-gray-200 rounded-lg space-y-4">
              <Pencil className="w-8 h-8 text-black" />
              <h3 className="text-xl font-semibold">AI + Manual Control</h3>
              <p className="text-gray-600">Best of both worlds — automate with AI or write manually.</p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 border border-gray-200 rounded-lg space-y-4">
              <Mail className="w-8 h-8 text-black" />
              <h3 className="text-xl font-semibold">Clean HTML Output</h3>
              <p className="text-gray-600">Email-safe formatting that works everywhere.</p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 border border-gray-200 rounded-lg space-y-4">
              <Shield className="w-8 h-8 text-black" />
              <h3 className="text-xl font-semibold">Developer Friendly</h3>
              <p className="text-gray-600">Built with modern web standards and best practices.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Built For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Use Case 1 */}
            <Card className="p-8 border border-gray-200 rounded-lg space-y-4 hover:shadow-lg transition">
              <Users className="w-8 h-8 text-black" />
              <h3 className="text-xl font-semibold">Developers</h3>
              <p className="text-gray-600">
                Sending automated emails programmatically with full control over content and delivery.
              </p>
            </Card>

            {/* Use Case 2 */}
            <Card className="p-8 border border-gray-200 rounded-lg space-y-4 hover:shadow-lg transition">
              <Lightning className="w-8 h-8 text-black" />
              <h3 className="text-xl font-semibold">Startups</h3>
              <p className="text-gray-600">
                Sending professional outreach and customer communications without technical overhead.
              </p>
            </Card>

            {/* Use Case 3 */}
            <Card className="p-8 border border-gray-200 rounded-lg space-y-4 hover:shadow-lg transition">
              <Mail className="w-8 h-8 text-black" />
              <h3 className="text-xl font-semibold">Individuals</h3>
              <p className="text-gray-600">
                Sending structured emails quickly with optional AI assistance for better messaging.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold text-balance">Start Sending Better Emails Today</h2>
          <p className="text-xl text-gray-600">Choose your workflow and send emails with confidence.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-900 px-8 py-6 text-lg" onClick={() => router.push("/email")}>
              Send Direct Email
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-black text-black hover:bg-gray-50 px-8 py-6 text-lg bg-transparent"
              onClick={() => router.push("/ai")}
            >
              Generate with AI
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">Email Automato — Built for clarity, speed, and control.</p>
            <div className="flex gap-6 mt-6 md:mt-0 text-gray-600 text-sm">
              <a href="#" className="hover:text-black transition">
                Docs
              </a>
              <a href="#" className="hover:text-black transition">
                Privacy
              </a>
              <a href="#" className="hover:text-black transition">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
