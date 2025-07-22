const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_BIBLE_KEY = process.env.API_BIBLE_KEY;
const API_BIBLE_BASE_URL = 'https://api.scripture.api.bible/v1';
const BIBLE_API_BASE_URL = 'https://bible-api.com';

// Fetch Bibles
router.get('/bibles', async (req, res, next) => {
  try {
    const response = await axios.get(`${API_BIBLE_BASE_URL}/bibles`, {
      headers: { 'api-key': API_BIBLE_KEY },
    });
    res.json(response.data);
  } catch (err) {
    next(new Error(`Failed to fetch Bibles: ${err.message}`));
  }
});

// Fetch Verse
router.get('/verse/:query/:version', async (req, res, next) => {
  try {
    const { query, version } = req.params;
    const normalizedQuery = query.replace(/\s+(?=\d)/g, '');
    const response = await axios.get(`${BIBLE_API_BASE_URL}/${encodeURIComponent(normalizedQuery)}?translation=${version}`);
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    res.json(response.data);
  } catch (err) {
    next(new Error(`Failed to fetch verse: ${err.message}`));
  }
});

// Fetch Chapter Audio
router.get('/audio/:audioBibleId/:bookId/:chapter', async (req, res, next) => {
  try {
    const { audioBibleId, bookId, chapter } = req.params;
    const chapterId = `${audioBibleId}.${bookId}.${chapter}`;
    
    // Validate chapter exists
    const chaptersResponse = await axios.get(
      `${API_BIBLE_BASE_URL}/audio-bibles/${audioBibleId}/books/${bookId}/chapters`,
      { headers: { 'api-key': API_BIBLE_KEY } }
    );
    const chapterExists = chaptersResponse.data.data?.some((ch) => ch.id === chapterId);
    
    if (!chapterExists) {
      throw new Error('Chapter not found');
    }

    // Fetch audio
    const audioResponse = await axios.get(
      `${API_BIBLE_BASE_URL}/audio-bibles/${audioBibleId}/chapters/${chapterId}`,
      { headers: { 'api-key': API_BIBLE_KEY } }
    );
    const audioUrl = audioResponse.data.data?.audioUrls?.[0]?.url || null;
    
    if (!audioUrl) {
      throw new Error('No audio URL found for chapter');
    }
    
    res.json({ audioUrl });
  } catch (err) {
    next(new Error(`Failed to fetch audio: ${err.message}`));
  }
});

module.exports = router;