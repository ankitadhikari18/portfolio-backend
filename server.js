const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { Resend } = require("resend");

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
    res.send("Portfolio backend is running!");
});

app.post("/contact", async (req, res) => {

    console.log("CONTACT ROUTE HIT");
    console.log("Received data:", req.body);

    const { name, email, message } = req.body;

    try {

        console.log("Attempting to send email...");

        const { data, error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: ["ankitadhikari310@gmail.com"],
            subject: `New portfolio message from ${name}`,
            html: `
                <h2>New Contact Message</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `
        });

        console.log("EMAIL RESPONSE:", data);
        console.log("RESEND ERROR:", error);

        if (error) {

            console.error("RESEND ERROR:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to send email."
            });
        }

        console.log("EMAIL SENT SUCCESSFULLY");

        res.json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {

        console.error("SERVER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});