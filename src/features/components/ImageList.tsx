import IconButton from '@mui/material/IconButton';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect, useState } from 'react';
import * as React from 'react';
import {
  ImageList as BaseImageList
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { Image as ImageProps, selectAllImages } from './../gallerySlice';
import ImageModal from './ImageModal';

function Image ({
  onClick, ...image
// eslint-disable-next-line react/require-default-props
}: ImageProps & { onClick?: (image: ImageProps) => void }) {
  return (
    <ImageListItem onClick={() => { onClick?.(image); }}>
      <img
        src={image.preview}
        alt={image.title}
      />
      <ImageListItemBar
        title={image.title}
        subtitle={image.date}
        actionIcon={(
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label={`info about ${image.title}`}
          />
                  )}
      />
    </ImageListItem>
  );
}

function ImageList () {
  const images = useAppSelector(selectAllImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<ImageProps>();

  useEffect(() => {
    setIsModalOpen(Boolean(modalImage));
  }, [modalImage]);

  const openModal = (image: ImageProps) => {
    setModalImage(image);
  };

  return (
    <>
      <BaseImageList cols={5}>
        {images.map((image: ImageProps) => (
          <Image {...image} key={image.id} onClick={openModal} />
        ))}
      </BaseImageList>
      <ImageModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); }}>
        {modalImage ? <Image {...modalImage} preview={modalImage.href}/> : null}
      </ImageModal>
    </>
  );
}

export default ImageList;
