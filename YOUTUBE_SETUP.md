# YouTube Data API v3 Setup Guide

This guide will help you set up YouTube Data API v3 for the RagaRhythm app.

## 🎯 Two Modes Available

The HomeScreen supports two modes:

1. **Public Mode** (Default) - Browse any public YouTube playlist using just an API key
2. **User Mode** - Access the current user's personal playlists (requires OAuth setup)

## 📋 Prerequisites

- A Google account
- Your RagaRhythm project

## 🔑 Getting Your YouTube API Key

### Step 1: Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account

### Step 2: Create or Select a Project
1. Click on the project dropdown at the top of the page
2. Click "New Project" or select an existing project
3. Give your project a name (e.g., "RagaRhythm")
4. Click "Create"

### Step 3: Enable YouTube Data API v3
1. In the left sidebar, click on "APIs & Services" > "Library"
2. Search for "YouTube Data API v3"
3. Click on "YouTube Data API v3" from the results
4. Click the "Enable" button

### Step 4: Create API Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "+ CREATE CREDENTIALS" at the top
3. Select "API Key"
4. Your API key will be generated and displayed
5. **Copy this API key** - you'll need it in the next step

### Step 5: (Optional but Recommended) Restrict Your API Key
1. In the API key dialog, click "Edit API key" or find your key in the credentials list
2. Under "API restrictions", select "Restrict key"
3. Check "YouTube Data API v3"
4. Click "Save"

This helps prevent unauthorized use of your API key.

## 🔧 Configuring Your App

### For Public Mode (Default)

1. Open `app/(tabs)/HomeScreen.jsx`
2. Find these lines at the top:
   ```javascript
   const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY_HERE";
   const MODE = "public";
   ```
3. Replace `YOUR_YOUTUBE_API_KEY_HERE` with your actual API key
4. Make sure `MODE` is set to `"public"`

### For User Mode (Access Personal Playlists)

#### Step 1: Set up OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"
4. Click "+ CREATE CREDENTIALS" > "OAuth client ID"
5. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: RagaRhythm
   - User support email: Your email
   - Developer contact: Your email
   - Scopes: Add `../auth/youtube.readonly`
   - Test users: Add your email for testing
6. Choose application type:
   - For **Android**: Select "Android"
     - Package name: `com.yourusername.ragarhythm`
     - SHA-1 certificate: Get from `keytool` (see below)
   - For **iOS**: Select "iOS"
     - Bundle ID: `com.yourusername.ragarhythm`
   - For **Web**: Select "Web application"
     - Authorized redirect URIs: `https://auth.expo.io/@yourusername/ragarhythm`
7. Copy the **Client ID**

#### Step 2: Get SHA-1 Certificate (Android only)

```bash
# For debug builds
keytool -keystore ~/.android/debug.keystore -list -v -alias androiddebugkey
# Password: android

# Copy the SHA-1 fingerprint
```

#### Step 3: Configure OAuth in App

1. Open `app/(tabs)/HomeScreen.jsx`
2. Find these lines:
   ```javascript
   const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
   const MODE = "public";
   ```
3. Replace `YOUR_GOOGLE_CLIENT_ID` with your OAuth Client ID
4. Change `MODE` to `"user"`:
   ```javascript
   const MODE = "user";
   ```

#### Step 4: Update app.json (if needed)

Add the OAuth scheme to your `app.json`:
```json
{
  "expo": {
    "scheme": "ragarhythm",
    "android": {
      "package": "com.yourusername.ragarhythm"
    },
    "ios": {
      "bundleIdentifier": "com.yourusername.ragarhythm"
    }
  }
}
```

## 📺 Customizing Your Content

### Public Mode - Change the Playlist
In `HomeScreen.jsx`, find:
```javascript
const YOUTUBE_PLAYLIST_ID = "PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI";
```

Replace with any YouTube playlist ID:
- Go to YouTube
- Open any playlist
- Copy the ID from the URL (the part after `list=`)
- Example: `https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID`

### Public Mode - Use Popular Videos Instead
Uncomment the `fetchPopularVideos()` function in `HomeScreen.jsx` and change the useEffect to use it:
```javascript
useEffect(() => {
  // fetchYouTubeVideos();  // Comment this out
  fetchPopularVideos();     // Use this instead
}, []);
```

### User Mode - Access Your Playlists
When MODE is set to "user":
1. The app will show a "Sign in with Google" button
2. After signing in, all your YouTube playlists will appear as horizontal chips
3. Tap any playlist to view its videos
4. Switch between your playlists easily

### Search for Specific Content
Use the `searchVideos()` function from `youtube/youtubeConfig.js` to search for specific music or topics.

## 📊 API Quota Limits

YouTube Data API v3 has quota limits:
- **Default quota**: 10,000 units per day
- **Cost per request**:
  - `playlistItems.list`: 1 unit
  - `videos.list`: 1 unit
  - `search.list`: 100 units

Each time the HomeScreen loads, it makes 2 API calls (2 units total), so you can refresh approximately 5,000 times per day with the default quota.

## 🔗 Useful Resources

- [YouTube Data API v3 Documentation](https://developers.google.com/youtube/v3)
- [API Reference](https://developers.google.com/youtube/v3/docs)
- [Quota Calculator](https://developers.google.com/youtube/v3/determine_quota_cost)
- [Sample Playlists](https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ/playlists) - YouTube Music Official

## 🎵 Popular Music Playlist IDs

Here are some popular music playlists you can use:
- YouTube Music Official Chart: `PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI`
- Trending Music Videos: `PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-`

You can find more playlists on YouTube Music's official channel.

## 🚨 Troubleshooting

### Public Mode Issues

#### Error: "The request cannot be completed because you have exceeded your quota"
- You've reached your daily API quota limit
- Wait until the next day (resets at midnight Pacific Time)
- Or request a quota increase in Google Cloud Console

#### Error: "API key not valid"
- Make sure you copied the entire API key
- Check that YouTube Data API v3 is enabled in your project
- If you set restrictions, make sure they're configured correctly

#### Error: "The playlist identified with the request's playlistId parameter cannot be found"
- The playlist ID is incorrect
- The playlist might be private
- Try a different public playlist ID

#### Videos not loading
- Check your internet connection
- Verify your API key is correct
- Check the browser/app console for detailed error messages

### User Mode Issues

#### OAuth popup not appearing
- Make sure you've set up OAuth 2.0 credentials correctly
- Check that the redirect URI matches your app's configuration
- For mobile, ensure `expo-auth-session` is properly installed

#### Error: "invalid_client"
- Your Client ID is incorrect
- Make sure you're using the correct OAuth client ID (not the API key)
- Verify the client ID matches your platform (Android/iOS/Web)

#### "No playlists found"
- Make sure you have created playlists in your YouTube account
- Check that your OAuth token has the correct scopes (`youtube.readonly`)
- Try signing out and signing in again

#### Sign in button does nothing
- This is a placeholder implementation
- For full OAuth support, you need to:
  1. Set up proper OAuth credentials in Google Cloud Console
  2. Configure redirect URIs
  3. Implement the full OAuth flow (see `youtube/youtubeAuth.js`)
  4. Or use a library like `expo-auth-session`

#### Token expired
- Access tokens expire after 1 hour
- Implement token refresh using the refresh token
- Or sign in again to get a new token

## 🎉 You're All Set!

Your RagaRhythm app should now display YouTube videos on the home screen. Tap on any video to open it in YouTube!

