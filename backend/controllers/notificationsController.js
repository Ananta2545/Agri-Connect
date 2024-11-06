import axios from 'axios';
import dotenv from 'dotenv';

export const getFarmingAlerts = async (req, res) => {
    dotenv.config();
    
    // Retrieve parameters from query string
    const { region } = req.query;

    try {
        // Construct a concise prompt for the API to generate farming alerts and notifications
        const promptText = `
            Please provide a maximum of 2 short and recent farming alerts or notifications in max 5-6 words related to farming weather and conditions, specifically for the region of ${region}.

            Focus on:
            - Important weather-related alerts relevant to farming today.
            - Any immediate farming precautions or actions farmers should take.

            Keep each alert clear, brief, and farmer-friendly. Thank you!
        `;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: promptText.trim(), // Trim whitespace from the prompt text
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Log the entire response for debugging
        console.log(response.data.candidates);

        // Check if response contains candidates
        if (response.data.candidates && response.data.candidates.length > 0) {
            // Log the structure of the content object to understand its properties
            console.log(JSON.stringify(response.data.candidates[0].content, null, 2));

            // Extract the alert text from the parts array
            const parts = response.data.candidates[0].content.parts; // Access the parts array

            if (parts && parts.length > 0) {
                const alerts = parts[0].text; // Get the text from the first part
                res.status(200).json({ alerts });
            } else {
                console.error("No parts found in the content.");
                res.status(404).json({ error: "No alerts found" });
            }
        } else {
            console.error("No candidates found in the response.");
            res.status(404).json({ error: "No alerts found" });
        }
    } catch (err) {
        console.error("Error fetching farming alerts: ", err);
        res.status(500).json({ error: "Failed to fetch alerts" });
    }
};
