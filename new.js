async function predictIris() {
    // Retrieve input values from the form
    const sepalLength = parseFloat(document.getElementById('sepalLength').value);
    const sepalWidth = parseFloat(document.getElementById('sepalWidth').value);
    const petalLength = parseFloat(document.getElementById('petalLength').value);
    const petalWidth = parseFloat(document.getElementById('petalWidth').value);

    // Create an object with the data
    const data = {
        sepalLength,
        sepalWidth,
        petalLength,
        petalWidth
    };

    try {
        // Send the data to the Flask backend
        const response = await fetch('/predict', {  // Ensure this matches your Flask route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Check if the response was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const result = await response.json();

        // Display the prediction result
        document.getElementById('result').innerText = `Predicted Iris Species: ${result.species}`;
    } catch (error) {
        // Handle any errors that occurred during fetch
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('result').innerText = 'Error occurred while predicting.';
    }
}

