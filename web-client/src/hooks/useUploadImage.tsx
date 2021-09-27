import { useState } from 'react';
import { uploadImage } from '../services/firebase';

export const useUploadImage = () => {
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingError, setUploadingError] = useState(null);

  const upload = async file => {
    try {
      setUploadingError(null);
      setUploading(true);
      setUploadedUrl(await uploadImage(URL.createObjectURL(file), `${Date.now()}_${file.name}`));
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
