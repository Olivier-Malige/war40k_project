import { config } from '../config/firebase';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseApp = initializeApp(config);

const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);

export const uploadImage = async (
  image: Request | string,
  name: string,
  storageNameRef: string,
): Promise<string> => {
  const wk40ImagesRef = ref(storage, storageNameRef);
  const metadata = {
    contentType: 'image/jpeg',
  };

  const imageRef = ref(wk40ImagesRef, name);
  const blob = await fetch(image).then(r => r.blob());
  await uploadBytes(imageRef, blob, metadata);
  return getDownloadURL(imageRef);
};

// export const isUserAuth = () => {
//   return onAuthStateChanged(auth, user => {
//     console.log('isUserAuth');
//     console.log(user);
//     return user;
//   });
// };

export const userSignOut = () => {
  signOut(auth);
};

export const signInWithEmail = async (email: string, password: string): Promise<any> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    throw new Error(e);
  }
};
