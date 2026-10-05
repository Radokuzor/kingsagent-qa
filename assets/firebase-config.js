/* Public Firebase web config for the kings-agent project.
 * Safe to publish: it is the browser-side config, not a secret. Firestore rules decide
 * what it can touch, and they allow only read+create on qa_feedback.
 */
window.FIREBASE_CONFIG = {
  "apiKey": "AIzaSyC3LLOyCJtRndgyUnZo-Y7-sR41mS2AOdk",
  "authDomain": "kings-agent.firebaseapp.com",
  "projectId": "kings-agent",
  "storageBucket": "kings-agent.firebasestorage.app",
  "messagingSenderId": "624919583484",
  "appId": "1:624919583484:web:0ae00f52ea597df8c49579"
};
