import { config } from 'src/config/firebase';
import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
const firebaseApp = initializeApp(config);

const storage = getStorage(firebaseApp);

const uploadImage = async (
  image: Request | string,
  name: string,
  storageNameRef: string,
): Promise<string> => {
  const imagesRef = ref(storage, storageNameRef);

  const imageRef = ref(imagesRef, name);
  const blob = await fetch(image).then(r => r.blob());
  await uploadBytes(imageRef, blob);
  return getDownloadURL(imageRef);
};

const deleteImage = async (imageRefName: string) => {
  try {
    await deleteObject(ref(storage, imageRefName));
  } catch (e) {
    console.log(e);
  }
};

export const useUploadImage = (): {
  uploadedImageUrl: string;
  uploadedImageRef: string;
  uploading: boolean;
  uploadingError: string;
  upload: (file: File, storageNameRef: string, previousName: string) => Promise<void>;
} => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploadedImageRef, setUploadedImageRef] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingError, setUploadingError] = useState(null);

  const upload = async (file: File, storageNameRef: string, previousRef = null) => {
    try {
      setUploadingError(null);
      setUploading(true);
      const imageName = `${Date.now()}_${file.name}`;
      const result = await uploadImage(URL.createObjectURL(file), imageName, storageNameRef);
      if (uploadedImageRef || previousRef) {
        await deleteImage(uploadedImageRef || previousRef);
      }
      setUploadedImageRef(`${storageNameRef}/${imageName}`);
      setUploadedImageUrl(result);

      setUploading(false);
    } catch (e) {
      setUploadingError(e);
      setUploading(false);
    }
  };

  return {
    uploadedImageUrl,
    uploadedImageRef,
    uploading,
    uploadingError,
    upload,
  };
};
