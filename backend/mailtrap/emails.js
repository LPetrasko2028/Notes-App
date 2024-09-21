import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";
import dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken).replaceAll("{company_name}", "Auth Company"),
			category: "Email Verification",
		});

		if(process.env.NODE_ENV === 'development') console.log("Email sent successfully", response);
	} catch (error) {
		if(process.env.NODE_ENV === 'development') console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};

export const sendWelcomeEmail = async (email, name) => {
	const recipient = [{ email }];

    const description = "<p>Our Notes App is designed for students and focuses on academic note styles like the cornell method.</p><br/><p>It is a simple and easy-to-use note-taking app that helps students to take notes, create to-do lists, and set reminders.</p><br/><p>Our app is designed to help students to stay organized and focused on their studies.</p>";
	try {
		const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "0f58fbfb-01fc-4066-8fd6-a7724b4821db",
      template_variables: {
        user_name: "Test_User_name",
        description: description,
        company_legal_name: "Test_Company_legal_name",
        company_physical_address: "Test_Company_physical_address",
        company_name: "Test_Company_name",
      },
    });

		if(process.env.NODE_ENV === 'development') console.log("Welcome email sent successfully", response);
	} catch (error) {
		if(process.env.NODE_ENV === 'development') console.error(`Error sending welcome email`, error);

		throw new Error(`Error sending welcome email: ${error}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		if(process.env.NODE_ENV === 'development') console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		if(process.env.NODE_ENV === 'development') console.log("Password reset email sent successfully", response);
	} catch (error) {
		if(process.env.NODE_ENV === 'development') console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};