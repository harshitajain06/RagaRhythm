# Accessing Your Personal YouTube Playlists

## Quick Answer

**Yes, you can access the current user's YouTube playlists!** 

However, it requires OAuth 2.0 authentication setup instead of just an API key.

## Two Modes in HomeScreen.jsx

### 🌐 Public Mode (Current Default)
- Uses: API key only
- Shows: Any public YouTube playlist
- Setup: Simple - just add your API key
- Authentication: None required

### 👤 User Mode (For Personal Playlists)
- Uses: OAuth 2.0 + API
- Shows: The signed-in user's personal playlists
- Setup: More complex - requires OAuth credentials
- Authentication: User must sign in with Google

## How to Switch to User Mode

### 1. Quick Switch (to see the UI)

In `app/(tabs)/HomeScreen.jsx`, change line 27:
```javascript
const MODE = "user"; // Change from "public" to "user"
```

This will show you the sign-in screen, but clicking "Sign in" won't work yet without OAuth setup.

### 2. Full Setup (to make it work)

Follow these steps:

#### A. Get OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create one)
3. Enable YouTube Data API v3
4. Go to "APIs & Services" > "Credentials"
5. Click "+ CREATE CREDENTIALS" > "OAuth client ID"
6. Configure OAuth consent screen:
   - User Type: External
   - App name: RagaRhythm
   - Scopes: `https://www.googleapis.com/auth/youtube.readonly`
   - Test users: Add your email
7. Create OAuth client ID:
   - **For Web/Expo Go**: Choose "Web application"
     - Authorized redirect URIs: Add your Expo redirect URI
   - **For Android**: Choose "Android"
     - Package name: From your `app.json`
     - SHA-1: From your keystore
   - **For iOS**: Choose "iOS"
     - Bundle ID: From your `app.json`
8. Copy the Client ID

#### B. Configure Your App

In `app/(tabs)/HomeScreen.jsx`:
```javascript
const GOOGLE_CLIENT_ID = "YOUR_CLIENT_ID_HERE.apps.googleusercontent.com";
const MODE = "user";
```

#### C. Implement Full OAuth Flow

The current implementation shows a placeholder alert. For full functionality, you need to:

1. Use `expo-auth-session` for OAuth flow (already in dependencies)
2. Implement the authentication flow in `youtube/youtubeAuth.js` (template provided)
3. Handle token storage and refresh

**Option 1: Use the provided template**
- Check `youtube/youtubeAuth.js` for a ready-to-use OAuth implementation
- Import and use those functions in HomeScreen

**Option 2: Custom implementation**
- Follow the [expo-auth-session documentation](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- Implement Google OAuth flow
- Store tokens in AsyncStorage
- Fetch user playlists with the token

## What User Mode Gives You

When properly set up with OAuth, user mode provides:

1. **Automatic playlist discovery**: All the user's playlists appear as chips
2. **Easy playlist switching**: Tap any playlist chip to load its videos
3. **Personal library**: Access liked videos, watch later, etc.
4. **Privacy**: Only the signed-in user sees their own playlists
5. **Sign out**: Easy to switch accounts

## Current Status

✅ **What's Ready:**
- UI for user mode (sign in screen, playlist selector)
- API calls for fetching user playlists
- Playlist switching functionality
- Token storage structure

⚠️ **What Needs Setup:**
- OAuth 2.0 credentials from Google Cloud Console
- Complete OAuth flow implementation (template in `youtube/youtubeAuth.js`)
- Platform-specific OAuth configuration (redirect URIs, etc.)
- Token refresh mechanism for expired tokens

## Recommendations

### For Quick Testing
Stick with **Public Mode**:
```javascript
const MODE = "public";
const YOUTUBE_PLAYLIST_ID = "YOUR_FAVORITE_PLAYLIST_ID";
```

### For Production/Personal Use
Set up **User Mode** with OAuth:
1. Complete OAuth setup in Google Cloud Console
2. Implement full auth flow using `youtube/youtubeAuth.js`
3. Test with your own account
4. Deploy with proper redirect URIs

### Hybrid Approach
You could add a toggle in the UI to switch between:
- Browsing public playlists (no sign-in)
- Accessing personal playlists (with sign-in)

## Need Help?

- Full setup instructions: See `YOUTUBE_SETUP.md`
- OAuth template code: See `youtube/youtubeAuth.js`
- YouTube API docs: [https://developers.google.com/youtube/v3](https://developers.google.com/youtube/v3)
- Expo Auth Session: [https://docs.expo.dev/versions/latest/sdk/auth-session/](https://docs.expo.dev/versions/latest/sdk/auth-session/)

## Example User Flow

1. User opens app
2. Sees "Sign in with Google" button
3. Clicks button → OAuth flow starts
4. Google sign-in page opens
5. User signs in and grants permissions
6. App receives access token
7. App fetches user's playlists
8. Playlists appear as horizontal chips
9. User taps a playlist
10. Videos from that playlist load
11. User can switch between their playlists easily

That's it! You now have access to your personal YouTube playlists in your app! 🎉

