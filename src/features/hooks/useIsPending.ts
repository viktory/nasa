import { useAppSelector } from '../../app/hooks';
import { LOADING_STATUS } from '../constants';
import { selectStatus } from '../gallerySlice';

const useIsPending = () => useAppSelector(selectStatus) === LOADING_STATUS;

export default useIsPending;
