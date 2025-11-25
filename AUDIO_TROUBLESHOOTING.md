# 🔊 Audio & Haptics Troubleshooting Guide

## What to Expect on Different Platforms

### 🌐 Web Browser
**You WILL hear:**
- ✅ **Audio clicks/beeps** at your selected tempo
- ✅ Higher pitch (1200 Hz) for **sam** (first beat)
- ✅ Lower pitch (800 Hz) for **other beats**
- ✅ Volume varies (louder for sam)

**How to test:**
1. Open app in **Chrome, Firefox, or Safari**
2. Make sure **volume is up** 🔊
3. **Allow audio** if browser asks for permission
4. Start practice and **listen for beeps**

### 📱 Mobile (iOS/Android)
**You WILL feel:**
- ✅ **Haptic vibrations** at your selected tempo
- ✅ **Strong vibration** for sam (first beat)
- ✅ **Light vibration** for other beats

**You might NOT hear audio (yet):**
- ❌ Audio clicks not implemented on mobile yet
- ✅ But haptics work great!

**How to test:**
1. **Hold your phone** in your hand
2. Make sure **haptics are enabled** in phone settings
3. Start practice and **feel the vibrations**
4. Sam (beat 1) will be **noticeably stronger**

### 💻 Desktop Expo App
**You WILL hear:**
- ✅ Audio clicks (same as web)
- ✅ Web Audio API works in Expo

---

## Quick Diagnostic Checklist

### Can't Hear Anything on Web?

**Check These:**

1. ✅ **Browser Volume**
   - System volume is up
   - Browser tab is not muted
   - Check browser volume mixer

2. ✅ **Browser Permissions**
   - Some browsers block auto-play
   - Click anywhere on page first
   - Check browser console for errors

3. ✅ **AudioContext Support**
   - Open browser console (F12)
   - Type: `window.AudioContext`
   - Should NOT say "undefined"

4. ✅ **Device Audio**
   - Headphones plugged in properly?
   - Bluetooth speaker connected?
   - System audio working in other apps?

5. ✅ **Test in Different Browser**
   - Try Chrome
   - Try Firefox  
   - Try Safari

### Can't Feel Vibrations on Mobile?

**Check These:**

1. ✅ **Haptics Enabled**
   ```
   iOS: Settings → Sounds & Haptics → System Haptics: ON
   Android: Settings → Sound & vibration → Vibration: ON
   ```

2. ✅ **Silent/Ring Mode**
   - Phone not in silent mode
   - Vibration strength set high enough

3. ✅ **Battery Saver**
   - Low power mode might disable haptics
   - Charge phone or disable battery saver

4. ✅ **App Permissions**
   - App has permission to use haptics
   - Check in phone settings

5. ✅ **Hold the Phone**
   - Must hold device to feel vibrations
   - Place on soft surface (not hard table)

---

## Testing Steps

### Web Testing (Audio)

```bash
# 1. Start app
npm start

# 2. Press 'w' for web

# 3. In browser:
- Open browser console (F12)
- Go to Practice tab
- Set tempo to 60 BPM (slow, easy to hear)
- Select any raga
- Press "Start Practice"

# 4. Listen for:
   Beep ... beep ... beep ... BEEP
   ↑        ↑        ↑        ↑
   normal   normal   normal   sam (higher pitch)
```

### Mobile Testing (Haptics)

```bash
# 1. Start app
npm start

# 2. Scan QR code with Expo Go

# 3. In app:
- Hold phone in your hand
- Go to Practice tab
- Set tempo to 60 BPM (slow, easy to feel)
- Select any raga
- Press "Start Practice"

# 4. Feel:
   buzz ... buzz ... buzz ... BUZZ
   ↑        ↑        ↑        ↑
   light    light    light    strong (sam)
```

---

## What's Actually Happening

### Web Audio Implementation

```javascript
// Creates oscillator (tone generator)
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();

// Sam (first beat): 1200 Hz, louder
oscillator.frequency.value = 1200;
gainNode.gain.setValueAtTime(0.4);

// Other beats: 800 Hz, softer  
oscillator.frequency.value = 800;
gainNode.gain.setValueAtTime(0.2);

// Plays for 50 milliseconds
oscillator.start();
oscillator.stop(currentTime + 0.05);
```

### Mobile Haptics Implementation

```javascript
// Sam (first beat): Heavy impact
await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

// Other beats: Light impact
await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
```

---

## Visual Indicators (Work Everywhere!)

Even if you can't hear/feel anything, you should **always see**:

### Beat Counter
```
╔═══════════════════╗
║  Current Beat:    ║
║      5  / 16      ║  ← Updates every beat
╚═══════════════════╝
```

### Visual Dots
```
⭕ ● ● ● ⚫ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○
↑       ↑
Sam    Current (lights up and grows)
```

---

## Platform-Specific Tips

### Chrome (Best for Web)
- ✅ Best WebAudio support
- ✅ No permissions needed usually
- ✅ Low latency

### Firefox
- ✅ Good WebAudio support
- ⚠️ Might need page interaction first
- ✅ Generally works well

### Safari
- ⚠️ Stricter auto-play policies
- ✅ Click anywhere on page first
- ✅ Works after user interaction

### iOS
- ✅ Excellent haptic support
- ✅ Taptic Engine very precise
- ✅ Works even in silent mode

### Android
- ✅ Good haptic support
- ⚠️ Varies by device/manufacturer
- ✅ Most modern phones work well

---

## Common Issues & Solutions

### Issue: "No sound on web"
**Solution:**
1. Click anywhere on the page first
2. Check browser console for errors
3. Refresh and try again
4. Use Chrome if other browsers fail

### Issue: "No vibration on mobile"
**Solution:**
1. Enable haptics in phone settings
2. Check battery saver isn't blocking
3. Hold phone properly
4. Test with other apps first

### Issue: "Audio stutters/glitches"
**Solution:**
1. Close other browser tabs
2. Reduce CPU load
3. Try lower tempo first
4. Restart browser

### Issue: "Timing feels off"
**Solution:**
1. Stop and restart practice
2. Try different tempo
3. Check system load
4. Use lower tempo (less CPU intensive)

---

## Testing Audio Context (Web)

Open browser console and run:

```javascript
// Test 1: Check AudioContext exists
console.log('AudioContext:', window.AudioContext || window.webkitAudioContext);

// Test 2: Try to create context
const ctx = new (window.AudioContext || window.webkitAudioContext)();
console.log('Context state:', ctx.state);

// Test 3: Play a test beep
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.connect(gain);
gain.connect(ctx.destination);
osc.frequency.value = 800;
gain.gain.value = 0.3;
osc.start();
osc.stop(ctx.currentTime + 0.1);
console.log('Test beep played!');
```

If you hear a beep, audio is working!

---

## Testing Haptics (Mobile)

In Expo Go console, you should see:
```
[Haptics] Heavy impact triggered  ← For sam
[Haptics] Light impact triggered  ← For other beats
```

---

## What Works vs What Doesn't

### ✅ Currently Working

| Feature | Web | iOS | Android |
|---------|-----|-----|---------|
| Visual indicator | ✅ | ✅ | ✅ |
| Beat counter | ✅ | ✅ | ✅ |
| Audio clicks | ✅ | ❌ | ❌ |
| Haptic feedback | ❌ | ✅ | ✅ |
| Tempo sync | ✅ | ✅ | ✅ |

### 🔮 Coming Soon
- Full audio on mobile
- Volume controls
- Different sound options
- Tabla bols (dha, tin, na)

---

## Quick Test Protocol

### 1-Minute Test (Web)
```
1. Open in Chrome
2. Click page once
3. Go to Practice tab
4. Select Yaman
5. Tempo: 60 BPM
6. Start Practice
7. Listen: Beep... beep... beep... BEEP!
```

### 1-Minute Test (Mobile)
```
1. Open in Expo Go
2. Hold phone
3. Go to Practice tab
4. Select Yaman
5. Tempo: 60 BPM
6. Start Practice
7. Feel: Buzz... buzz... buzz... BUZZ!
```

---

## Getting Help

### If NOTHING works:

1. **Check device basics:**
   - Volume/vibration settings
   - Audio/haptics working in other apps
   - Device not damaged

2. **Check app state:**
   - Is practice actually playing? (visual indicator moving?)
   - Does stop button appear?
   - Are numbers counting up?

3. **Try different settings:**
   - Different tempo (60 BPM easiest to test)
   - Different taal (Teental is default)
   - Different device/platform

4. **Check console logs:**
   - Browser: Press F12, check Console tab
   - Expo: Check Metro bundler terminal
   - Look for error messages

---

## Expected Experience

### On Web (Chrome):
```
Start Practice →
Alert appears →
Click OK →
See: Numbers counting (1, 2, 3...)
See: Dots lighting up
Hear: Beep... beep... beep... BEEP... beep
      ↑                      ↑
      800 Hz                 1200 Hz (sam)
```

### On Mobile:
```
Start Practice →
Alert appears →
Tap OK →
See: Numbers counting (1, 2, 3...)
See: Dots lighting up
Feel: Buzz... buzz... buzz... BUZZ... buzz
      ↑                      ↑
      Light                  Heavy (sam)
```

---

## Summary

✅ **Works on Web**: Audio clicks (beeps)
✅ **Works on Mobile**: Haptic vibrations
✅ **Works Everywhere**: Visual indicators

The metronome IS working - it's just using different output methods depending on your platform!

- **Web = Sound** 🔊
- **Mobile = Vibration** 📳
- **Both = Visuals** 👁️

---

## Still Not Working?

Please check:
1. Visual indicator IS moving? → System is working
2. Numbers ARE counting? → Timing is accurate
3. Just can't hear/feel? → Platform-specific issue

The core metronome functionality is working if you see the visual feedback!

---

**Remember:** The visual beat indicator works on ALL platforms and is the most reliable way to follow the metronome!

