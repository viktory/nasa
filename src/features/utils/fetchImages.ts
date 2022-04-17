/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAULT_SEARCH_PARAMS, ROOT } from '../constants';
import { ImageResponse, transformData } from './transformData';

const ACTION = 'search';

interface Response {
    collection: { items: ImageResponse[], metadata: { total_hits: number } };
}

export interface SearchParams {
    media_type?: 'image',
    page?: number,
    q?: string
}

const generateSearchParams = (params: SearchParams) => Object.entries({ ...DEFAULT_SEARCH_PARAMS, ...params })
  .filter(([, value]) => !!value)
  .map(([key, value]) => [key, value?.toString() || '']);

export const fetchImages = createAsyncThunk(
  'search',
  async (params: SearchParams = {}, { rejectWithValue }) => {
    const searchParams = generateSearchParams(params);

    try {
      const response = await fetch(`${ROOT}${ACTION}?${new URLSearchParams(searchParams)}`);
      const data: Response = await response.json();
      if (!response.ok) {
        // @ts-ignore
        throw new Error(data.reason);
      }

      return [data.collection.items.map(transformData), data.collection.metadata.total_hits];
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
