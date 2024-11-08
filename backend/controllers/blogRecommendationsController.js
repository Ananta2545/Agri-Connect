import axios from 'axios';
import dotenv from 'dotenv';

export const getBlogRecommendations = async (req, res) => {
    dotenv.config();

    // Retrieve parameters from the query string
    const { region } = req.query;

    try {
        // Construct a prompt to generate the "Tip of the Day" and recent farming challenges
        const promptText = `
            please provide the following for the experts with new recommendations every time :
            
             Suggest 2 topics in 5-6 words that an expert can write about to help farmers address current issues effectively .
            
            

            Keep each point clear, expert-friendly, and  should be about the most the current weather problems, crop health problems , or economic conditions of the farmers or any recent concerns .
        `;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: promptText.trim(),
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

        // Log the response for debugging
        console.log(response.data.candidates);

        // Check if response contains candidates
        if (response.data.candidates && response.data.candidates.length > 0) {
            const parts = response.data.candidates[0].content.parts;

            if (parts && parts.length > 0) {
                // Extract the structured content from the response
                const recommendations = parts[0].text;
                res.status(200).json({ recommendations });
            } else {
                console.error("No parts found in the content.");
                res.status(404).json({ error: "No recommendations found" });
            }
        } else {
            console.error("No candidates found in the response.");
            res.status(404).json({ error: "No recommendations found" });
        }
    } catch (err) {
        console.error("Error fetching expert recommendations: ", err);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
};
