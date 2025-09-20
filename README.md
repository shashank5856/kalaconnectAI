# KalaConnect AI

**A hackathon-ready prototype** that helps Indian artisans showcase their crafts, automatically generates marketing content, and educates visitors about India’s cultural heritage — powered by Google Cloud Vertex AI (Gemini Vision), a Node.js/Express backend, and a React + Vite frontend. Deployments: **Frontend** → Firebase Hosting, **Backend** → Google Cloud Run.

---

## Elevator pitch

KalaConnect AI enables artisans to upload a photo of their craft, provide one or two keywords (e.g., `Warli painting`, `terracotta`) and choose a language (Hindi, English, Tamil). When they click **Generate**, the system uses Gemini Vision (Vertex AI) to analyze the image and produce:

- A compelling product story/description that artisans can use on product pages.
- An engaging social-media caption with hashtags ready for use across platforms.
- A short cultural context paragraph explaining the art form’s origin and current state.

All outputs are returned as JSON and localized into the selected language.

---

## Key features

- Upload an image, add keywords, and choose a language.
- Backend calls Vertex AI Gemini Vision to analyze and generate text.
- Returns a JSON object with `story`, `caption`, and `cultural_context`.
- Clean, mobile-friendly React frontend with upload box, input fields, generate button, loading indicator, and results area.
- Deployable frontend (Firebase Hosting) and backend (Google Cloud Run).

---

## System architecture

1. **Frontend (React + Vite)**
   - Uploads file + metadata to backend.
   - Displays loading state and AI-generated results.

2. **Backend (Node.js + Express)**
   - Handles multipart/form-data upload.
   - Calls Vertex AI Gemini Vision with image + prompt.
   - Returns structured JSON with story, caption, and context.

3. **Vertex AI (Gemini Vision)**
   - Processes image and keywords.
   - Generates outputs in the requested language.

4. **Hosting**
   - **Frontend:** Firebase Hosting
   - **Backend:** Google Cloud Run (containerized)

---

## Tech stack

- **Frontend:** React (Vite), Tailwind (optional)
- **Backend:** Node.js, Express, Multer
- **AI:** Google Cloud Vertex AI (Gemini Vision)
- **Deploy:** Firebase Hosting, Google Cloud Run
- **Container:** Docker

---

## Security & privacy

- Use a dedicated **service account** with minimal Vertex AI roles.
- Never commit service account keys to source control.
- Use HTTPS and restrict CORS to your frontend origin.
- Do not persist images unless explicitly needed (or store securely in Cloud Storage).

---

## Environment variables (backend)

Create a `.env` (do not commit) or configure in Cloud Run:

```env
PORT=8080
GCLOUD_PROJECT=your-gcp-project-id
GCLOUD_LOCATION=us-central1
VERTEX_MODEL_NAME=projects/PROJECT/locations/LOCATION/publishers/google/models/gemini-vision-1
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
FRONTEND_ORIGIN=https://your-frontend.web.app

# kalaconnectAI
my website
>>>>>>> 4235f5ae3803e59991854323c741b8bedf341aeb

 
