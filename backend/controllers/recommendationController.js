import axios from 'axios';
import dotenv from 'dotenv';

export const getRecommendations = async (req, res) => {
    dotenv.config();
    
    // Destructure the required fields from req.body
    const { climate, soilType, cropType, cropInfo, weatherDetails, cropConditions } = req.body;

    try {
        // Construct a detailed prompt for the API based on the farmer's inputs
        const promptText = `
            Please provide farming recommendations based on the following information:

            1. **Climate**: ${climate}
            2. **Soil Type**: ${soilType}
            3. **Crop Type**: ${cropType}
            4. **Information about the Crop**: ${cropInfo}
            5. **Today's Weather**: ${weatherDetails}
            6. **Crop Conditions**: ${cropConditions}

            Based on this information, please suggest:
            - Suitable farming practices for today.
            - Care tips for the specified crop considering the current weather and soil conditions.
            - Any precautions to take given today's weather and crop requirements.

            Make the recommendations clear and easy to understand for farmers. Thank you!
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

            // Extract the recommendation text from the parts array
            const parts = response.data.candidates[0].content.parts; // Access the parts array

            if (parts && parts.length > 0) {
                const recommendation = parts[0].text; // Get the text from the first part
                res.status(200).json({ recommendation });
            } else {
                console.error("No parts found in the content.");
                res.status(404).json({ error: "No recommendations found" });
            }
        } else {
            console.error("No candidates found in the response.");
            res.status(404).json({ error: "No recommendations found" });
        }
    } catch (err) {
        console.error("Error fetching recommendations: ", err);
        res.status(500).json({ error: "Failed to fetch recommendations" });
    }
};
