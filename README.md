# KalaConnect AI

**A ready prototype** that helps Indian artisans showcase their crafts, automatically generates marketing content, and educates visitors about India’s cultural heritage — powered by Google Cloud Vertex AI (Gemini Vision), a Node.js/Express backend, and a React + Vite frontend. Deployments: **Frontend** → Firebase Hosting, **Backend** → Google Cloud Run.

---

## Elevator pitch

KalaConnect AI enables artisans to upload a photo of their craft, provide one or two keywords (e.g., `Warli painting`, `terracotta`) and choose a language (Hindi, English, Tamil). When they click **Generate**, the system uses Gemini Vision (Vertex AI) to analyze the image and produce:

- A compelling product story/description that artisans can use on product pages.
- An engaging social-media caption with hashtags ready for use across platforms.
- A short cultural context paragraph explaining the art form’s origin and current state.

All outputs are returned as JSON and localized into the selected language.

ALSO

KalaConnect AI is a prototype web application designed to bridge the gap between India’s rich artisan heritage and the modern digital marketplace. Across India, millions of artisans create extraordinary crafts — from Warli paintings of Maharashtra to terracotta pottery of West Bengal and Kanchipuram silk from Tamil Nadu — yet many lack the tools, resources, and marketing support to reach broader audiences.

Our solution gives artisans an intuitive and accessible platform where they simply upload a photo of their craft, type a couple of keywords, and choose a preferred language (currently supporting English, Hindi, and Tamil). With a single click, KalaConnect AI harnesses the power of Google Cloud’s Vertex AI Gemini Vision model to instantly generate three high-value outputs tailored for promotion and cultural education:

A product story — A compelling, emotionally resonant description that highlights the craftsmanship, materials, and cultural essence of the item, ready for use in product catalogs or e-commerce listings.

A social-media caption — Short, catchy, and engaging text with relevant hashtags, enabling artisans to share their work effectively on Instagram, Facebook, or Twitter/X without needing marketing expertise.

Cultural context — A concise yet informative paragraph that explains the origin, history, and regional significance of the art form, educating buyers and raising awareness about India’s cultural diversity.

By combining computer vision, generative AI, and multilingual support, KalaConnect AI not only amplifies artisans’ reach but also helps preserve and promote India’s intangible cultural heritage in the digital era.

The prototype is built with a React + Vite frontend (deployed on Firebase Hosting) and a Node.js/Express backend (deployed on Google Cloud Run), ensuring scalability, reliability, and ease of demo. This design makes it hackathon-friendly while being production-ready for real-world impact.

Ultimately, KalaConnect AI lowers the barriers for artisans to market their crafts, strengthens cultural storytelling, and enables global consumers to appreciate the richness of India’s traditions — all while being accessible from a mobile-friendly web app.

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

 
