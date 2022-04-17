import { useState } from 'react';

function useWasMount () {
  const [wasMount, setWasMount] = useState(false);

  return [wasMount, () => { setWasMount(true); }] as const;
}

export default useWasMount;
