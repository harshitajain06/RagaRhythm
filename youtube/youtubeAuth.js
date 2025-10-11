/**
 * YouTube OAuth 2.0 Authentication
 * 
 * This allows users to sign in with their Google account
 * and access their personal YouTube playlists
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

// ⚠️ Replace with your OAuth credentials from Google Cloud Console
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET'; // Optional for mobile apps

// YouTube OAuth scopes
const SCOPES = [
  'https://www.googleapis.com/auth/youtube.readonly', // View YouTube account
  'https://www.googleapis.com/auth/youtube.force-ssl', // Full access (if needed)
];

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

/**
 * Authenticate user with Google/YouTube
 * @returns {Promise<string>} Access token
 */
export async function authenticateWithYouTube() {
  try {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'ragarhythm',
      path: 'redirect',
    });

    console.log('Redirect URI:', redirectUri);

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
      {
        clientId: CLIENT_ID,
        scopes: SCOPES,
        redirectUri,
        responseType: AuthSession.ResponseType.Code,
        usePKCE: true,
      },
      discovery
    );

    const result = await promptAsync();

    if (result.type === 'success') {
      const { code } = result.params;

      // Exchange code for access token
      const tokenResponse = await fetch(discovery.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `code=${code}&client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&grant_type=authorization_code&code_verifier=${request.codeVerifier}`,
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.access_token) {
        // Store tokens
        await AsyncStorage.setItem('youtube_access_token', tokenData.access_token);
        if (tokenData.refresh_token) {
          await AsyncStorage.setItem('youtube_refresh_token', tokenData.refresh_token);
        }
        return tokenData.access_token;
      }
    }

    throw new Error('Authentication failed');
  } catch (error) {
    console.error('YouTube auth error:', error);
    throw error;
  }
}

/**
 * Get stored access token
 * @returns {Promise<string|null>} Access token or null
 */
export async function getStoredToken() {
  try {
    return await AsyncStorage.getItem('youtube_access_token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
}

/**
 * Sign out user
 */
export async function signOut() {
  try {
    await AsyncStorage.removeItem('youtube_access_token');
    await AsyncStorage.removeItem('youtube_refresh_token');
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

/**
 * Fetch user's playlists
 * @param {string} accessToken - OAuth access token
 * @param {number} maxResults - Maximum number of playlists
 * @returns {Promise<Object>} User's playlists
 */
export async function fetchUserPlaylists(accessToken, maxResults = 25) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=${maxResults}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'Failed to fetch user playlists');
    }

    return data;
  } catch (error) {
    console.error('Error fetching user playlists:', error);
    throw error;
  }
}

/**
 * Fetch videos from user's playlist
 * @param {string} accessToken - OAuth access token
 * @param {string} playlistId - Playlist ID
 * @param {number} maxResults - Maximum number of videos
 * @returns {Promise<Object>} Playlist videos
 */
export async function fetchUserPlaylistVideos(accessToken, playlistId, maxResults = 25) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=${maxResults}&playlistId=${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'Failed to fetch playlist videos');
    }

    return data;
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    throw error;
  }
}

