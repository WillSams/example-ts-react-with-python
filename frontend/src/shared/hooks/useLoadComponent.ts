import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { Config, DispatchFromConfig } from '@/shared/base/ConnectComponent';

interface useLoadComponentProps {
  props?: DispatchFromConfig;
  config?: Config;
}

const useLoadComponent = (input: useLoadComponentProps) => {
  const loads = input?.config?.load;
  const location = useLocation();

  useEffect(() => {
    const dispatch = input?.props?.getDispatch?.();
    if (loads) {
      Object.values(loads).forEach((loadAction) => {
        if (typeof loadAction === 'function') {
          const actionCreator = loadAction(input?.props);
          dispatch?.(actionCreator);
        }
      });
    }
  }, [input?.config?.componentName, location?.pathname]);

  return;
};

export default useLoadComponent;
