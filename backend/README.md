
# House Price Prediction Model Backend

This backend handles the machine learning model for predicting house prices.

## Setup Instructions

1. Install Python 3.8+ if not already installed
2. Install required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Set up Kaggle API credentials:
   - Create an account on Kaggle.com
   - Go to your account settings and click "Create New API Token"
   - This will download a `kaggle.json` file
   - Create a `.kaggle` directory in your home folder (`~/.kaggle` on Unix/Mac or `C:\Users\<Windows-username>\.kaggle` on Windows)
   - Move the `kaggle.json` file to this directory
   - Set permissions: `chmod 600 ~/.kaggle/kaggle.json` (on Unix/Mac)

## Training the Model

Run the training script:
```
python train_model.py
```

By default, it will download the Melbourne Housing dataset from Kaggle and train a Random Forest model.

## Running the API

Start the Flask server:
```
python app.py
```

The API will be available at http://localhost:5000

## API Endpoints

- `GET /api/model/status` - Check if the model is trained
- `POST /api/predict` - Get a house price prediction (send house data in JSON format)

## Example Request/Response

Request to `/api/predict`:
```json
{
  "squareFootage": 2000,
  "bedrooms": 3,
  "bathrooms": 2,
  "yearBuilt": 2000,
  "neighborhood": "Suburban Heights",
  "lotSize": 0.25,
  "garage": 2,
  "basement": true,
  "centralAir": true,
  "kitchenQuality": 4
}
```

Response:
```json
{
  "prediction": 350000,
  "modelInfo": {
    "trained": true,
    "accuracy": 0.85
  }
}
```
