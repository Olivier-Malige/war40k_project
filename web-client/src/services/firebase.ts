import { config } from '../config/firebase';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const firebaseApp = initializeApp(config);

const storage = getStorage(firebaseApp);

const wk40ImagesRef = ref(storage, '/w40k/units/images/');
const metadata = {
  contentType: 'image/jpeg',
};

export const uploadImage = async (image: Request | string, name: string) => {
  const imageRef = ref(wk40ImagesRef, name);
  const blob = await fetch(image).then(r => r.blob());
  await uploadBytes(imageRef, blob, metadata);
  return getDownloadURL(imageRef);
};
