from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the model
model = pickle.load(open('iris.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # Extract features
        features = np.array([[data['sepalLength'], data['sepalWidth'], data['petalLength'], data['petalWidth']]])
        # Make prediction
        prediction = model.predict(features)[0]
        # Map numeric predictions to species names
        species = 'Iris-setosa' if prediction == 0 else 'Iris-versicolor' if prediction == 1 else 'Iris-virginica'
        return jsonify({'species': species})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True)
