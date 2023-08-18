document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('ai-detection-form');
    const resultContainer = document.getElementById('ai-result-container');
    const apiUrl = 'https://atrium-prod-api.optic.xyz/aion/ai-generated/reports';
    const apiKey = '9b23c426-2e37-4edb-b6c3-162acbca0d1c'; // Replace with your actual API key

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const imageUrl = document.getElementById('ai-image-url').value;

        const payload = {
            object: imageUrl
        };

        const xhr = new XMLHttpRequest();
        xhr.open('POST', apiUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-API-KEY', apiKey);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resultContainer.innerHTML = `
                    <h3>AI Detection Result:</h3>
                    <p>AI Confidence: ${response.report.ai.confidence}</p>
                    <p>AI Detected: ${response.report.ai.is_detected ? 'Yes' : 'No'}</p>
                `;
                resultContainer.classList.remove('hide');
            } else {
                resultContainer.innerHTML = '<p>An error occurred. Please try again later.</p>';
                resultContainer.classList.remove('hide');
            }
        };

        xhr.send(JSON.stringify(payload));
    });
});
