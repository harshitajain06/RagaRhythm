import * as AuthSession from 'expo-auth-session';

const CLIENT_ID = 'd16a098717694a05a9a40f9a15d90a85';
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });
const SCOPES = ['user-read-email', 'playlist-read-private'];
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

export async function authenticateWithSpotify() {
  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES.join(' '))}`;

  const result = await AuthSession.startAsync({ authUrl });
  
  if (result.type === 'success' && result.params.access_token) {
    return result.params.access_token;
  } else {
    throw new Error('Spotify authentication failed');
  }
}
