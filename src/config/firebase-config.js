/**
 * Firebase Configuration Template
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com
 * 2. Create a new project (or use existing)
 * 3. Click "Add app" and select Web
 * 4. Copy the firebaseConfig object
 * 5. Replace the placeholder below with your actual config
 * 6. Enable Auth: Anonymous, Email/Password, Google Sign-In
 * 7. Enable Firestore Database
 * 8. Enable Analytics
 * 
 * FIRESTORE SECURITY RULES:
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     // Users can only access their own saves
 *     match /saves/{userId} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *     }
 *     // Leaderboards - public read, authenticated append-only
 *     match /leaderboards/{doc} {
 *       allow read: if true;
 *       allow create: if request.auth != null;
 *       allow update, delete: if false;
 *     }
 *     // Analytics - write-only
 *     match /analytics/{doc} {
 *       allow create: if request.auth != null;
 *       allow read, update, delete: if false;
 *     }
 *     // Settings per user
 *     match /settings/{userId} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *     }
 *   }
 * }
 */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

let app = null;
let auth = null;
let db = null;
let analytics = null;
let firebaseEnabled = false;

async function initFirebase() {
  try {
    if (!window.firebaseInit) {
      console.warn('[Firebase] SDK not loaded, using localStorage fallback');
      return { app: null, auth: null, db: null, analytics: null, enabled: false };
    }
    
    // Check if config is still placeholder
    if (firebaseConfig.apiKey === 'YOUR_API_KEY') {
      console.warn('[Firebase] Using placeholder config. Add your real keys for cloud features.');
      return { app: null, auth: null, db: null, analytics: null, enabled: false };
    }
    
    const { initializeApp, getAuth, getFirestore, getAnalytics } = window.firebaseInit;
    
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    
    // Analytics may fail in offline/blockers
    try {
      analytics = getAnalytics(app);
    } catch (e) {
      console.warn('[Firebase] Analytics not available');
    }
    
    firebaseEnabled = true;
    console.log('[Firebase] Initialized successfully');
    
  } catch (error) {
    console.error('[Firebase] Initialization failed:', error);
    console.warn('[Firebase] Game will use localStorage only');
    firebaseEnabled = false;
  }
  
  return { app, auth, db, analytics, enabled: firebaseEnabled };
}

function isFirebaseEnabled() {
  return firebaseEnabled;
}

export { initFirebase, isFirebaseEnabled, app, auth, db, analytics, firebaseConfig };
