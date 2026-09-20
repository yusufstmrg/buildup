
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import config from './firebase-applet-config.json' with { type: 'json' };

const app = initializeApp(config);
const db = getFirestore(app);

async function test() {
  const docRef = doc(db, 'cms', 'state');
  try {
    await setDoc(docRef, { test: '123' }, { merge: true });
    console.log('Write success');
    const d = await getDoc(docRef);
    console.log('Read success', d.data());
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}
test();

