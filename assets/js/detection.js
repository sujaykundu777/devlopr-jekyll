// assets/js/detection.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('detection-form');
    const resultContainer = document.getElementById('result-container');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const imageUrl = document.getElementById('image-url').value;
        
        // API endpoint and headers
        const apiUrl = 'https://atrium-prod-api.optic.xyz/aion/ai-generated/reports';
        const apiKey = '9b23c426-2e37-4edb-b6c3-162acbca0d1c'; // Replace with your actual API key
        
        const payload = {
            object: imageUrl
        };
        
        const headers = new Headers({
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            
            // Display the result
            resultContainer.innerHTML = `
                <h3>AI Detection Result:</h3>
                <p>AI Confidence: ${data.report.ai.confidence}</p>
                <p>AI Detected: ${data.report.ai.is_detected ? 'Yes' : 'No'}</p>
            `;
        } catch (error) {
            console.error('Error:', error);
            resultContainer.innerHTML = '<p>An error occurred. Please try again later.</p>';
        }
    });
});
