import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const object = await req.json();
    
    // Extract the form fields from the frontend request
    // The frontend sends an array of subjects, so we join them if it's an array, or just use it as string.
    const { name, email, message } = object;
    let { subject } = object;
    
    // Convert subject array to string if it is an array (from the checkboxes)
    if (Array.isArray(subject)) {
      subject = subject.join(', ');
    } else if (!subject) {
      subject = 'General Inquiry';
    }

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Website Contact Form <contact@hemachandran.aircwou.in>',
      to: [process.env.RESEND_TO_EMAIL || 'vishal.sharma@woxsen.edu.in'], // The email address receiving the messages
      replyTo: email, // This allows you to directly hit "Reply" in your inbox to reply to the user
      subject: `New Inquiry: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Subject / Topics:</strong> ${subject}</p>
        <hr />
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${message || 'No additional message.'}</p>
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ success: false, message: error.message || 'Failed to send message via Resend.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!', data });
  } catch (error) {
    console.error('Error in Resend API route:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
