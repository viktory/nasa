import { useEffect, useState } from 'react';
import * as React from 'react';
import { useAppDispatch } from '../app/hooks';
import Error from './components/Error';
import useIsIdle from './hooks/useIsIdle';
import ImageList from './components/ImageList';
import Pagination from './components/Pagination';
import Search from './components/Search';
import useIsPending from './hooks/useIsPending';
import useWasMount from './hooks/useWasMount';
import { fetchImages, SearchParams } from './utils/fetchImages';

function Gallery () {
  const dispatch = useAppDispatch();
  const isIdle = useIsIdle();
  const isPending = useIsPending();
  const [params, setParams] = useState<SearchParams>({ page: 1 });
  const [wasMount, setWasMount] = useWasMount();

  useEffect(() => {
    if (wasMount) {
      dispatch(fetchImages(params));
    }
  }, [params, dispatch, fetchImages]);

  useEffect(() => {
    if (isIdle) {
      dispatch(fetchImages(params));
    }
  }, [isIdle, params, dispatch, fetchImages]);

  // todo don't really like current solution, but it prevents fetchImages(params) to be fired twice when page is loading
  useEffect(() => {
    if (!(isIdle && isPending)) {
      setWasMount();
    }
  }, [isIdle, isPending, setWasMount]);

  return (
    isIdle
      ? null
      : (
      <>
        <Error />
        <Search onSubmit={(q: string) => { setParams({ q }); }} />
        <ImageList />
        <Pagination page={params.page || 1} onChange={(page: number) => { setParams({ ...params, page }); }} />
      </>
        )
  );
}

export default Gallery;
