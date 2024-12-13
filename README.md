# Automatic Plate Number Recognition (APNR) - Web

This project is a **Next.js application** designed to detect vehicle license plates from images. It uses the following backend and machine learning repositories to process and manage data:

- **Backend API**: [APNR-Backend](https://github.com/C242-AP02/APNR-Backend)  
  Provides endpoints for managing detected vehicle data and integrating with Firestore and Google Cloud Storage.

- **Machine Learning Model**: [APNR-ML](https://github.com/C242-AP02/APNR-ML)  
  Handles the core license plate detection functionality.

---

## Features

- **Upload Image**  
  Upload an image to detect license plates. The plate details are processed via the [APNR-ML](https://github.com/C242-AP02/APNR-ML) and saved using the [APNR-Backend](https://github.com/C242-AP02/APNR-Backend).

- **List Detected Vehicles**  
  View a list of detected vehicles with plate details.

- **Statistics**  
  Access vehicle detection statistics by:
  - Day
  - Month
  - Region

- **Share Detected Vehicle Details**  
  Share links to specific vehicle details.

- **Google Authentication**  
  Log in using a Google account for easy access.


---

## Prerequisites

1. **Node.js** (LTS recommended)  
   Install from [Node.js Official Website](https://nodejs.org/).

2. **Backend API**  
   - Clone and set up the [APNR-Backend](https://github.com/C242-AP02/APNR-Backend) repository.
   - Follow its installation instructions and ensure it is running.

3. **Machine Learning Model**  
   - Clone and set up the [APNR-ML](https://github.com/C242-AP02/APNR-ML) repository.
   - Follow its installation instructions to deploy the model server.

4. **Firebase Project**   
    For firebase Authentication

## Installation

Follow these steps to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/C242-AP02/APNR-Web.git
cd APNR-Web

```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup

1. **Configure Backend URL**  
   Open `constant/configuration.js` and replace the `BACKEND_URL` value with the link to your local **APNR-Backend** server.  

   Example:  
   ```javascript
   export const BACKEND_URL = "http://localhost:5000"; 
   ```
2. **Configure Firebase**   
    Replace the Firebase configuration in `utils/firebase.js` with your own Firebase project settings.

    Example:
    ```javascript
    const firebaseConfig = {
        apiKey: "your-firebase-api-key",
        authDomain: "your-auth-domain",
        projectId: "your-project-id",
        storageBucket: "your-storage-bucket",
        messagingSenderId: "your-messaging-sender-id",
        appId: "your-app-id",
        measurementId: "your-measurement-id",
    };
    ```

### 4. Run Development Server

To start the project, you have the following options:

1. **Development Mode**  
   Run the development server with hot-reloading:  
   ```bash
   npm run dev
   ```

2. **Production Build**   
    Create a production-optimized build:
    ```bash
    npm run build
    ```
    Run production server:
    ```
    npm start
    ```

The web will start running on http://localhost:3000.













