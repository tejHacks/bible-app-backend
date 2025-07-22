# EchoVerse Backend

Backend for the EchoVerse Bible app, handling API calls to [api.scripture.api.bible](https://scripture.api.bible) and [bible-api.com](https://bible-api.com).

## Features

- **Fetch available Bibles:** `/api/bibles`
- **Fetch Bible verses:** `/api/verse/:query/:version`
- **Fetch chapter audio:** `/api/audio/:audioBibleId/:bookId/:chapter`

## Tech Stack

- **Backend:** Node.js, Express
- **Dependencies:** axios, cors, dotenv
- **Development:** nodemon

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/echoverse-backend.git
    cd echoverse-backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file:**
    ```
    API_BIBLE_KEY=7efd8c7196bbc20912f6d50a3fec8fdb
    PORT=3000
    ```

4. **Run locally:**
    ```bash
    npm run dev
    ```

## Deployment

1. **Push to GitHub:**
    ```bash
    git add .
    git commit -m "Initial backend setup"
    git push origin main
    ```

2. **Deploy to Vercel:**
    - Create a Vercel project and link it to the repository.
    - Set environment variables in Vercel: `API_BIBLE_KEY`, `PORT`.
    - Deploy and note the URL (e.g., `https://echoverse-backend.vercel.app`).

## Endpoints

- `GET /api/bibles`: Fetch available Bibles.
- `GET /api/verse/:query/:version`: Fetch verse (e.g., `/api/verse/John+3:16/kjv`).
- `GET /api/audio/:audioBibleId/:bookId/:chapter`: Fetch audio URL (e.g., `/api/audio/de4e12af7f28f599-02/JHN/3`).

## License

MIT License.