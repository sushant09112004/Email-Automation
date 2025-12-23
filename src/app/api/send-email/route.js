import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { emails, emailContent } = body;

    if (!emails) {
      return Response.json(
        { success: false, message: "Emails are required" },
        { status: 400 }
      );
    }

    // Convert comma-separated emails → array
    const emailList = emails
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    if (emailList.length === 0) {
      return Response.json(
        { success: false, message: "Invalid email input" },
        { status: 400 }
      );
    }

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Use custom email content if provided, otherwise use default
    const defaultEmailContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    
    <p>Dear Hiring Team,</p>

    <p>
      I am writing to apply for a suitable software development role at your organization.
      I have around <b>1 year of hands-on experience as a Full-Stack Developer</b>,
      primarily working with <b>React, Next.js, JavaScript, TypeScript, and Node.js</b>.
    </p>

    <p>
      Over the past year, I have been actively building and deploying real-world applications,
      focusing on clean UI development, scalable backend APIs, and practical problem-solving.
      As part of my experience, I have worked on <b>AI ToolBook</b>, a live platform for
      discovering and exploring AI tools, where I was involved in frontend development,
      feature implementation, and performance optimization.
      <br/>
      🔗 <a href="https://aitoolbook.ai/" target="_blank">https://aitoolbook.ai/</a>
    </p>

    <p>
      I am currently a <b>Final Year engineering student at Pune University</b>,
      and alongside my academic responsibilities, I have consistently invested time in
      improving my development skills through hands-on work, internships, and continuous learning.
    </p>

    <p>
      Beyond technical skills, I consider myself a <b>curious, disciplined, and reliable</b>
      individual who enjoys learning new technologies and adapting quickly to changing requirements.
      I value clear communication, ownership of work, and delivering maintainable solutions.
    </p>

    <p>
      You can view my GitHub profile here:
      <br/>
      🔗 <a href="https://github.com/sushant09112004" target="_blank">
        https://github.com/sushant09112004
      </a>
    </p>

    <p>
      My resume is available at the link below:
      <br/>
      📄 <a href="https://drive.google.com/file/d/1ZfXTnahAmFXZB3Dqy17y9aDojIJ9bUVs/view?usp=drive_link" target="_blank">
        Download Resume (PDF)
      </a>
    </p>

    <p>
      I would welcome the opportunity to discuss how my skills and experience could contribute
      to your team. Thank you for your time and consideration.
    </p>

    <p>
      Best regards,<br/>
      <b>Sushant Jadhav</b><br/>
      Full-Stack Developer<br/>
      Final Year Student, Pune University<br/>
      📧 jadhavsushant379@gmail.com<br/>
      📞 +91 85306 90469
    </p>

  </div>
`;

    const mailOptions = {
      from: `"Application Team" <${process.env.SMTP_EMAIL}>`,
      to: emailList, // array or single email both work
      subject: "Sushant Jadhav - Application ",
      html: emailContent || defaultEmailContent,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);

    return Response.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
