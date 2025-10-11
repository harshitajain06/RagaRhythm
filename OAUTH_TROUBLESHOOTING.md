# OAuth Sign-In Troubleshooting

## ✅ What I Fixed

1. **Fixed the Client ID format** - Removed the invalid `http://` prefix and duplicate domain
2. **Implemented real OAuth flow** - Replaced the alert placeholder with actual expo-auth-session implementation
3. **Added proper imports** - Added AuthSession and WebBrowser

## 🔧 Why "Sign in with Google" Might Not Work

The OAuth flow requires specific configuration in **Google Cloud Console**. Here's what you need:

### Step 1: Configure OAuth Client for Web (Required for Expo)

When using Expo with `useProxy: true` (which we are), Google sees this as a **web application**, not a mobile app.

1. Go to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials)
2. Click "+ CREATE CREDENTIALS" > "OAuth client ID"
3. Select **"Web application"** (not Android or iOS)
4. Under **Authorized redirect URIs**, add:
   ```
   https://auth.expo.io/@your-username/RagaRhythm
   ```
   
   **Important:** You need to find your Expo username:
   - Run `npx expo whoami` in terminal
   - Or check https://expo.dev/ after signing in
   - Replace `your-username` with your actual Expo username

5. **Also add these redirect URIs** (for development):
   ```
   https://auth.expo.io/@anonymous/RagaRhythm
   https://localhost
   ```

6. Click "Create" and copy the **Client ID**

### Step 2: Update Your Client ID

The Client ID in your HomeScreen.jsx should look like:
```javascript
const GOOGLE_CLIENT_ID = "348329748433-xxxxx.apps.googleusercontent.com";
```

✅ **Current format is correct!**

### Step 3: Test the Flow

1. Make sure you're running the app:
   ```bash
   npx expo start
   ```

2. Open the app in Expo Go (or web)

3. Click "Sign in with Google"

4. You should see:
   - Browser/WebView opens with Google sign-in
   - Sign in with your Google account
   - Grant permissions to RagaRhythm
   - Browser closes and returns to app
   - Your playlists load!

## 🐛 Common Issues

### Issue 1: "redirect_uri_mismatch"
**Error:** The redirect URI doesn't match what's configured in Google Cloud Console

**Solution:**
1. Check the console logs for "Redirect URI: ..."
2. Copy that exact URI
3. Add it to Google Cloud Console under "Authorized redirect URIs"
4. Wait 5 minutes for changes to propagate
5. Try again

### Issue 2: Nothing happens when clicking button
**Possible causes:**
- ❌ Client ID not set correctly
- ❌ expo-auth-session not installed (should be in package.json)
- ❌ expo-web-browser not installed (should be in package.json)

**Solution:**
```bash
npm install expo-auth-session expo-web-browser
# or
npx expo install expo-auth-session expo-web-browser
```

### Issue 3: "Access blocked: This app's request is invalid"
**Solution:**
1. Go to Google Cloud Console > OAuth consent screen
2. Add your email to "Test users"
3. Make sure the app is in "Testing" mode (or published)

### Issue 4: Browser opens but shows error
**Check:**
1. YouTube Data API v3 is enabled in your project
2. OAuth consent screen is configured
3. Scopes include `https://www.googleapis.com/auth/youtube.readonly`
4. Your email is added as a test user

## 📱 Platform-Specific Notes

### For Expo Go (easiest for testing):
- Uses web OAuth with Expo proxy
- Works on iOS, Android, and web
- Requires web OAuth client (configured ✅)

### For Development Build:
- Can use native OAuth clients
- Requires platform-specific setup
- More complex but better for production

### For Web:
- Uses web OAuth directly
- Simplest to test
- Run with `npx expo start --web`

## 🧪 Quick Test

Run these commands to test:

```bash
# Check Expo username
npx expo whoami

# Start the app
npx expo start

# Test on web (easiest)
Press 'w' in terminal to open web version
```

In the web version:
1. Open browser console (F12)
2. Click "Sign in with Google"
3. Check console for logs:
   - "Redirect URI: ..." - Copy this URI
   - "Auth Result: ..." - Shows what happened

## 🔍 Debug Checklist

- [ ] Google Cloud Console: YouTube Data API v3 is enabled
- [ ] Google Cloud Console: OAuth consent screen configured
- [ ] Google Cloud Console: Web OAuth client created
- [ ] Google Cloud Console: Redirect URIs added (check console log for exact URI)
- [ ] Google Cloud Console: Your email added as test user
- [ ] Code: Client ID is correct format (no http://, no double domain)
- [ ] Code: MODE is set to "user"
- [ ] Terminal: expo-auth-session is installed
- [ ] Terminal: expo-web-browser is installed
- [ ] App: Can see "Sign in with Google" button
- [ ] Console: Check for any error messages when clicking button

## 📞 Still Not Working?

Check the console output when you click "Sign in with Google". Share the console logs and I can help debug further!

Expected console output:
```
Redirect URI: https://auth.expo.io/@your-username/RagaRhythm
Auth Result: {type: 'success', params: {...}}
```

