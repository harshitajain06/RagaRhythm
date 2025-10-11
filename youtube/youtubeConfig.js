/**
 * YouTube Data API v3 Configuration
 * 
 * 📚 Documentation: https://developers.google.com/youtube/v3
 * 
 * How to get your API key:
 * 1. Go to Google Cloud Console: https://console.cloud.google.com/
 * 2. Create a new project or select an existing one
 * 3. Enable the YouTube Data API v3
 * 4. Go to "Credentials" and create an API key
 * 5. (Optional) Restrict the API key to YouTube Data API v3
 * 6. Copy the API key and paste it below
 */

export const YOUTUBE_API_KEY = "AIzaSyCGz_3lXwrvLSKjep6YuSYp-P4mxzlCss8";

// Popular YouTube Music Playlists (you can use any of these)
export const PLAYLISTS = {
  TOP_MUSIC_VIDEOS: "PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI", // YouTube Music Official Chart
  TRENDING_MUSIC: "PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-", // Trending Music Videos
  GLOBAL_TOP_50: "PL4fGSI1pDJn5S28s4MKXgbLDVzB4yZNdh", // Example Global Top 50
};

// YouTube Data API Endpoints
export const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export const ENDPOINTS = {
  PLAYLIST_ITEMS: `${YOUTUBE_API_BASE}/playlistItems`,
  PLAYLISTS: `${YOUTUBE_API_BASE}/playlists`,
  VIDEOS: `${YOUTUBE_API_BASE}/videos`,
  SEARCH: `${YOUTUBE_API_BASE}/search`,
};

/**
 * Fetch videos from a YouTube playlist
 * @param {string} playlistId - YouTube playlist ID
 * @param {number} maxResults - Maximum number of results (default: 25, max: 50)
 * @returns {Promise<Object>} Playlist data
 */
export async function fetchPlaylistVideos(playlistId, maxResults = 25) {
  try {
    const response = await fetch(
      `${ENDPOINTS.PLAYLIST_ITEMS}?part=snippet,contentDetails&maxResults=${maxResults}&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "Failed to fetch playlist");
    }

    return data;
  } catch (error) {
    console.error("Error fetching playlist:", error);
    throw error;
  }
}

/**
 * Fetch playlist details
 * @param {string} playlistId - YouTube playlist ID
 * @returns {Promise<Object>} Playlist details
 */
export async function fetchPlaylistDetails(playlistId) {
  try {
    const response = await fetch(
      `${ENDPOINTS.PLAYLISTS}?part=snippet,contentDetails&id=${playlistId}&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "Failed to fetch playlist details");
    }

    return data;
  } catch (error) {
    console.error("Error fetching playlist details:", error);
    throw error;
  }
}

/**
 * Fetch most popular videos
 * @param {string} regionCode - Region code (e.g., "US", "IN")
 * @param {string} videoCategoryId - Video category ID (10 = Music)
 * @param {number} maxResults - Maximum number of results
 * @returns {Promise<Object>} Popular videos data
 */
export async function fetchPopularVideos(
  regionCode = "US",
  videoCategoryId = "10",
  maxResults = 25
) {
  try {
    const response = await fetch(
      `${ENDPOINTS.VIDEOS}?part=snippet,contentDetails&chart=mostPopular&regionCode=${regionCode}&videoCategoryId=${videoCategoryId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "Failed to fetch popular videos");
    }

    return data;
  } catch (error) {
    console.error("Error fetching popular videos:", error);
    throw error;
  }
}

/**
 * Search for videos
 * @param {string} query - Search query
 * @param {number} maxResults - Maximum number of results
 * @returns {Promise<Object>} Search results
 */
export async function searchVideos(query, maxResults = 25) {
  try {
    const response = await fetch(
      `${ENDPOINTS.SEARCH}?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&videoCategoryId=10&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "Failed to search videos");
    }

    return data;
  } catch (error) {
    console.error("Error searching videos:", error);
    throw error;
  }
}

