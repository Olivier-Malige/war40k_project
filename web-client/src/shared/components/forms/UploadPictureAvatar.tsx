import React, { FC, useEffect } from 'react';
import { Avatar, CardMedia } from '@mui/material';
import { LoadingSpinner } from '../LoadingSpinner';
import { AddAPhoto as AddAPhotoIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useUploadImage } from 'src/shared/hooks/useUploadImage';

type Props = {
  urlValue: string;
  setUrlValue: (value: string) => void;
  refValue: string;
  setRefValue: (value: string) => void;
  storageNameRef: string;
};
const UploadPictureAvatar: FC<Props> = ({
  setUrlValue,
  urlValue,
  storageNameRef,
  setRefValue,
  refValue,
}) => {
  const onDrop = async acceptedFiles => {
    if (acceptedFiles.length > 0) {
      await upload(acceptedFiles[0], storageNameRef, refValue);
    }
  };
  const { uploadedImageUrl, uploadedImageRef, uploading, upload } = useUploadImage();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: ['image/jpeg', 'image/png'],
  });

  useEffect(() => {
    if (uploadedImageUrl?.length > 1) {
      setUrlValue(uploadedImageUrl);
    }
  }, [uploadedImageUrl, setUrlValue]);

  useEffect(() => {
    if (uploadedImageRef) {
      setRefValue(uploadedImageRef);
    }
  }, [uploadedImageRef, setRefValue]);

  return (
    <Avatar
      variant={'rounded'}
      {...getRootProps()}
      sx={{
        width: 300,
        minHeight: 300,
        height: 'auto',
        cursor: 'pointer',
        bgcolor: theme => theme.palette.background.default,
      }}
    >
      <>
        <input {...getInputProps()} />
        {uploading && <LoadingSpinner />}
        {!uploading && (uploadedImageUrl || urlValue) && (
          <CardMedia component="img" image={uploadedImageUrl || urlValue} alt="Picture" />
        )}
        {!uploading && !urlValue && !uploadedImageUrl && (
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
