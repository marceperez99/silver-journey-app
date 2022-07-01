import React, {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { Incubator } from "react-native-ui-lib";
import { ToastPresets } from "react-native-ui-lib/src/incubator";

const ToastContext = createContext({});

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
  message: "",
  style: ToastPresets.GENERAL,
  dismissTime: 3000,
};

export const ToastProvider = ({ children }: any) => {
  const [toastState, setToastState] = useState<ToastState>({
    visible: false,
    message: "",
    style: ToastPresets.GENERAL,
    dismissTime: 3000,
  });
  return (
    <ToastContext.Provider value={{ toastState, setToastState }}>
      {children}
      <Incubator.Toast
        visible={toastState.visible}
        position={"bottom"}
        preset={toastState.style}
        autoDismiss={toastState.dismissTime}
        message={toastState.message}
        onDismiss={() => setToastState((prev) => ({ ...prev, visible: false }))}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { setToastState } = useContext(ToastContext);
  const showMessage = useCallback((message: string, options?: ToastOptions) => {
    setToastState({
      ...InitToastState,
      ...options,
      message,
      visible: true,
    });
  }, []);
  return { showMessage };
};
