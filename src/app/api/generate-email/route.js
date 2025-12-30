import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { personalContext } from "@/lib/personal-context";

export async function POST(req) {
  // Try different model names in order of preference
  const modelNames = [
    "gemini-2.5-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
  ];

  try {
    const body = await req.json();
    const { jobDescription } = body;

    if (!jobDescription || jobDescription.trim() === "") {
      return Response.json(
        { success: false, message: "Job description is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { success: false, message: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    // Format education details
    const educationStr = `${personalContext.education.degree}, ${personalContext.education.year} at ${personalContext.education.university} (${personalContext.education.college})`;
    
    // Format skills by category
    const allSkills = [
      ...personalContext.skills.frontend,
      ...personalContext.skills.backend,
      ...personalContext.skills.databases,
      ...personalContext.skills.ai_ml,
      ...personalContext.skills.tools
    ];
    const skillsStr = `Frontend: ${personalContext.skills.frontend.join(", ")}; Backend: ${personalContext.skills.backend.join(", ")}; Databases: ${personalContext.skills.databases.join(", ")}; AI/ML: ${personalContext.skills.ai_ml.join(", ")}; Tools: ${personalContext.skills.tools.join(", ")}`;
    
    // Format projects with all details
    const projectsStr = personalContext.projects.map(p => {
      let projectInfo = `${p.name} - ${p.description}`;
      if (p.role) projectInfo += ` (Role: ${p.role})`;
      if (p.highlights) projectInfo += ` (Highlights: ${p.highlights.join(", ")})`;
      if (p.link) projectInfo += ` (Link: ${p.link})`;
      return projectInfo;
    }).join("; ");
    
    // Format availability
    const availabilityStr = `Available from ${personalContext.availability.startDate}, ${personalContext.availability.workMode}, ${personalContext.availability.commitment}`;

    const prompt = `You are an expert at writing professional, personalized job application emails. 

Based on the following personal information and job description, compose a professional, personalized email application.

PERSONAL INFORMATION:
- Name: ${personalContext.name}
- Title: ${personalContext.title}
- Education: ${educationStr}
- Experience: ${personalContext.experience}
- Interests: ${personalContext.interests.join(", ")}
- Skills: ${skillsStr}
- Projects: ${projectsStr}
- Achievements: ${personalContext.achievements.join("; ")}
- Personal Qualities: ${personalContext.personalQualities.join(", ")}
- Availability: ${availabilityStr}
- Bio: ${personalContext.bio}
- Contact: ${personalContext.contact.email}, ${personalContext.contact.phone}
- GitHub: ${personalContext.contact.github}
- Resume: ${personalContext.contact.resume}

JOB DESCRIPTION:
${jobDescription}

INSTRUCTIONS:
1. Write a professional, personalized email that highlights relevant skills, experience, projects, and achievements from the personal information that match the job description
2. Make it specific to the job requirements mentioned in the job description
3. Reference specific projects and achievements that are relevant to the role
4. Mention relevant interests and technical skills that align with the job
5. Keep it concise but comprehensive (3-4 paragraphs)
6. Include a professional greeting and closing
7. Format it as HTML with proper styling (use inline styles)
8. Include links to GitHub and resume
9. Make it sound natural and enthusiastic but professional
10. Do not include placeholders or generic statements - be specific and personalized
11. If availability information is relevant, you can mention it naturally

Generate the email content in HTML format with inline styles suitable for email clients.`;

    let emailContent;
    let lastError;
    
    // Try each model name until one works
    for (const modelName of modelNames) {
      try {
        const { text } = await generateText({
          model: google(modelName, { apiKey }),
          prompt: prompt,
        });
        emailContent = text;
        break; // Success, exit loop
      } catch (err) {
        lastError = err;
        console.log(`Model ${modelName} failed, trying next...`, err.message);
        continue; // Try next model
      }
    }
    
    if (!emailContent) {
      throw lastError || new Error("All model attempts failed");
    }

    // Remove markdown code blocks if present
    emailContent = emailContent.replace(/```html\n?/g, "").replace(/```\n?/g, "").trim();

    return Response.json({
      success: true,
      emailContent: emailContent,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    
    // Provide more helpful error message
    let errorMessage = "Failed to generate email content";
    if (error.message?.includes("404") || error.message?.includes("Not Found")) {
      errorMessage = `Model not found. Tried models: ${modelNames.join(", ")}. Please verify:
1. Your API key is valid and from Google AI Studio (https://makersuite.google.com/app/apikey)
2. The API key has access to Gemini models
3. Your API key is correctly set in .env file as GEMINI_API_KEY`;
    } else if (error.message?.includes("API key") || error.message?.includes("401") || error.message?.includes("403")) {
      errorMessage = "Invalid or unauthorized API key. Please check your GEMINI_API_KEY in the .env file and ensure it's valid.";
    } else if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
      errorMessage = "API quota exceeded or rate limit reached. Please try again later.";
    }
    
    return Response.json(
      { 
        success: false, 
        message: errorMessage, 
        error: error.message,
        triedModels: modelNames
      },
      { status: 500 }
    );
  }
}

