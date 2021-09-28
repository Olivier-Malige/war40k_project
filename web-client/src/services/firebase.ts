import { config } from '../config/firebase';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const firebaseApp = initializeApp(config);

const storage = getStorage(firebaseApp);

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
