import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Incubator } from 'react-native-ui-lib';
import { ToastPresets } from 'react-native-ui-lib/src/incubator';

type ToastContextType = {
  toastState: ToastState;
  setToastState: React.Dispatch<React.SetStateAction<ToastState>>;
};

type ToastState = {
  visible: boolean;
  message: string;
  style: ToastPresets;
  dismissTime: number;
};
type ToastOptions = {
  style?: ToastPresets;
  dismissTime?: number;
};
const InitToastState: ToastState = {
  visible: false,
  message: '',
  style: ToastPresets.GENERAL,
  dismissTime: 3000,
};

const ToastContext = createContext<ToastContextType>({
  toastState: InitToastState,
  setToastState: () => null,
});

export function ToastProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [toastState, setToastState] = useState<ToastState>({
    visible: false,
    message: '',
    style: ToastPresets.GENERAL,
    dismissTime: 3000,
  });
  const value = useMemo(() => ({ toastState, setToastState }), [toastState]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <Incubator.Toast
        visible={toastState.visible}
        position="bottom"
        preset={toastState.style}
        autoDismiss={toastState.dismissTime}
        message={toastState.message}
        onDismiss={() => setToastState(prev => ({ ...prev, visible: false }))}
      />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const { setToastState } = useContext(ToastContext);
  const showMessage = useCallback(
    (message: string, options?: ToastOptions) => {
      setToastState({
        ...InitToastState,
        ...options,
        message,
        visible: true,
      });
    },
    [setToastState],
  );
  return { showMessage };
};
