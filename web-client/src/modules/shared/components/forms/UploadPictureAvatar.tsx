import React, { FC, useEffect } from 'react';
import { Avatar, CardMedia } from '@mui/material';
import { LoadingSpinner } from 'src/shared/components/LoadingSpinner';
import { AddAPhoto as AddAPhotoIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useUploadImage } from 'src/shared/hooks/useUploadImage';

type Props = {
  urlValue: string;
  setUrlValue: (urlValue: string) => void;
  storageNameRef: string;
};
const UploadPictureAvatar: FC<Props> = ({ setUrlValue, urlValue, storageNameRef }) => {
  const onDrop = async acceptedFiles => {
    await upload(acceptedFiles[0], storageNameRef);
  };
  const { uploadedUrl, uploading, upload } = useUploadImage();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'image/jpeg',
  });

  useEffect(() => {
    if (uploadedUrl?.length > 1) {
      setUrlValue(uploadedUrl);
    }
  }, [uploadedUrl, setUrlValue]);
  return (
    <Avatar
      {...getRootProps()}
      sx={{
        width: 300,
        height: 300,
        cursor: 'pointer',
        bgcolor: theme => theme.palette.background.default,
      }}
    >
      <>
        <input {...getInputProps()} />
        {uploading && <LoadingSpinner />}
        {!uploading && (uploadedUrl || urlValue) && (
          <CardMedia component="img" image={urlValue || uploadedUrl} alt="Picture" />
        )}
        {!uploading && !urlValue && !uploadedUrl && (
          <>
            <AddAPhotoIcon
              fontSize={'inherit'}
              sx={{ color: theme => theme.palette.secondary.main, transform: 'scale(6)' }}
            />
          </>
        )}
      </>
    </Avatar>
  );
};

export default UploadPictureAvatar;
