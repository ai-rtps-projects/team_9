# Deployment Guide for Team 2 Chatbot

This project has been split into two parts for separate hosting:
1.  **Backend:** Flask API (to be hosted on **Render**)
2.  **Frontend:** Vanilla JS (to be hosted on **Vercel**)

---

## 1. Backend Deployment (Render)

### Steps:
1.  Create a new GitHub repository for the contents of the `backend/` folder.
2.  Log in to [Render](https://render.com/).
3.  Click **New +** and select **Web Service**.
4.  Connect your GitHub repository.
5.  Use the following settings:
    *   **Name:** `team-2-chatbot-backend`
    *   **Environment:** `Python 3`
    *   **Build Command:** `pip install -r requirements.txt`
    *   **Start Command:** `gunicorn app:app`
6.  Once deployed, copy your service's URL (e.g., `https://team-2-chatbot-backend.onrender.com`).

---

## 2. Frontend Deployment (Vercel)

### Steps:
1.  Create a new GitHub repository for the contents of the `frontend/` folder.
2.  Log in to [Vercel](https://vercel.com/).
3.  Click **Add New...** and select **Project**.
4.  Import your frontend repository.
5.  **Important:** Before clicking "Deploy", update the `vercel.json` file in your repository.
    *   Replace `https://your-render-backend-url.onrender.com` with the actual URL from your Render deployment.
6.  Click **Deploy**.

---

## 3. Configuration Details

### `vercel.json`
The `vercel.json` file is configured to proxy all `/chat` requests to your Render backend. This avoids CORS (Cross-Origin Resource Sharing) issues.

```json
{
  "rewrites": [
    {
      "source": "/chat",
      "destination": "https://your-render-backend-url.onrender.com/chat"
    }
  ]
}
```

---

## Local Development
To run the backend locally:
1.  Navigate to the `backend/` folder.
2.  Run `pip install -r requirements.txt`.
3.  Run `python app.py`.
4.  The backend will be available at `http://localhost:5000`.
