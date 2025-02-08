"use server";
import nodemailer from "nodemailer";
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;//Host Name
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;//Your gmail id
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;//app password
console.log(SMTP_SERVER_PASSWORD,SMTP_SERVER_USERNAME)

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});
//fun in which values wiill come
export async function Mail({ to, subject, message }) {
  try {
    const isVerified = await transporter.verify();
    console.log("SMTP server verified:", isVerified);
  } catch (error) {
    console.error(
      "Something went wrong during SMTP verification:",
      SMTP_SERVER_USERNAME,
      SMTP_SERVER_PASSWORD,
      error
    );
    return;
  }

  try {
    //the messge and the things u want to send to th person 
    const info = await transporter.sendMail({
      from: SMTP_SERVER_USERNAME,
      to: to,
      subject: subject,
      html: message,
    });

    console.log("Message Sent:", info.messageId);
    console.log("Mail sent to:", to);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}