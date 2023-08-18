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

        const xhr = new XMLHttpRequest();
        xhr.open('POST', apiUrl, true);
        xhr.setRequestHeader('X-API-KEY', apiKey);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resultContainer.innerHTML = `
                        <h3>AI Detection Result:</h3>
                        <p>AI Confidence: ${data.report.ai.confidence}</p>
                        <p>AI Detected: ${data.report.ai.is_detected ? 'Yes' : 'No'}</p>
                    `;
                } else {
                    console.error('Error:', xhr.statusText);
                    resultContainer.innerHTML = '<p>An error occurred. Please try again later.</p>';
                }
            }
        };

        xhr.send(JSON.stringify(payload));
    });
});
