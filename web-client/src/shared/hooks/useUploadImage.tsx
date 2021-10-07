import { config } from 'src/config/firebase';
import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
const firebaseApp = initializeApp(config);

const storage = getStorage(firebaseApp);

const uploadImage = async (
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

export const useUploadImage = () => {
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingError, setUploadingError] = useState(null);

  const upload = async (file, storageNameRef) => {
    try {
      setUploadingError(null);
      setUploading(true);
      setUploadedUrl(
        await uploadImage(URL.createObjectURL(file), `${Date.now()}_${file.name}`, storageNameRef),
      );
      setUploading(false);
    } catch (e) {
      setUploadingError(e);
      setUploading(false);
    }
  };

  return {
    uploadedUrl,
    uploading,
    uploadingError,
    upload,
  };
};
