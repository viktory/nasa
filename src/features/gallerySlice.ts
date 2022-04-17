import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {
  IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS, FAILED_STATUS
} from './constants';
import { fetchImages } from './utils/fetchImages';

export interface Image {
  id: string;
  preview: string;
  href: string;
  title: string,
  description: string;
  date: string;
}

export interface GalleryState {
  images: Image[];
  total: number,
  status: typeof IDLE_STATUS | typeof LOADING_STATUS | typeof SUCCESS_STATUS | typeof FAILED_STATUS,
  error?: string;
}

const initialState: GalleryState = {
  images: [],
  total: 0,
  status: IDLE_STATUS
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = LOADING_STATUS;
      })
      .addCase(fetchImages.fulfilled, (state, { payload: [images, total] }) => {
        state.status = SUCCESS_STATUS;
        state.images = images as Image[];
        state.total = total as number;
        state.error = undefined;
      })
      .addCase(fetchImages.rejected, (state, { payload = '' }) => {
        state.status = FAILED_STATUS;
        state.error = payload as string;
        state.images = [];
      });
  }
});

export const selectAllImages = (state: RootState) => state.gallery.images;
export const selectStatus = (state: RootState) => state.gallery.status;

export default gallerySlice.reducer;
