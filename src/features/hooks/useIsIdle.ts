import { useAppSelector } from '../../app/hooks';
import { IDLE_STATUS } from '../constants';
import { selectStatus } from '../gallerySlice';

const useIsIdle = () => useAppSelector(selectStatus) === IDLE_STATUS;

export default useIsIdle;
