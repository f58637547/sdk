import { useCallback, useEffect, useState } from 'react';

import { fetchPluginState } from '@/client/fetch';
import { postToUpdatePluginState } from '@/client/postMessage';

export const usePluginState = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    fetchPluginState(key).then((e) => {
      if (!e) return;

      setValue(e);
    });
  }, [key]);

  const updateValue = useCallback(
    (value: T) => {
      setValue(value);
      postToUpdatePluginState(key, value);
    },
    [key],
  );

  return [value, updateValue] as const;
};
