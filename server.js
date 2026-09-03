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

        if (error) {
            console.error("RESEND ERROR:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to send email."
            });
        }

        console.log("EMAIL SENT:", data);
        console.log("RESEND ERROR:", error);

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