"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>;

type ToastActionElement = React.ReactElement<any, any>;

const LIMITER_COUNT = 3;

type ToasterToast = ToastProps & {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

type State = {
  toasts: ToasterToast[];
};

type Action =
  | {
      type: typeof actionTypes.ADD_TOAST;
      toast: ToasterToast;
    }
  | {
      type: typeof actionTypes.UPDATE_TOAST;
      toast: Partial<ToasterToast>;
    }
  | {
      type: typeof actionTypes.DISMISS_TOAST;
      toastId?: ToasterToast["id"];
    }
  | {
      type: typeof actionTypes.REMOVE_TOAST;
      toastId?: ToasterToast["id"];
    };

interface ToastStateProps {
  children?: React.ReactNode;
}

interface ToasterProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, LIMITER_COUNT),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === toastId ? { ...t, open: false } : t
          ),
        };
      }

      return {
        ...state,
        toasts: state.toasts.map((t) => ({ ...t, open: false })),
      };
    }

    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return { ...state, toasts: [] };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ToastContent = {
  title?: string;
  description?: string;
  action?: ToastActionElement;
};

type ToastOmit = "open" | "onOpenChange" | "title" | "description" | "action";

type ToastPropsWithoutContent = Omit<ToastProps, ToastOmit> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type ToastItem = React.ComponentProps<typeof Toast> & {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
};

export function ToastProviderComponent({
  children,
  position = "bottom-right",
}: ToastStateProps & ToasterProps) {
  const [state, dispatch] = React.useReducer(reducer, {
    toasts: [],
  });

  const toast = React.useCallback(
    ({ ...props }: ToastContent & ToastPropsWithoutContent) => {
      const id = genId();

      const update = (props: ToasterToast) =>
        dispatch({
          type: actionTypes.UPDATE_TOAST,
          toast: { ...props, id },
        });
      const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

      const closing = {
        open: false,
        onOpenChange: (open: boolean) => {
          if (!open) dismiss();
        },
      };

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: {
          id,
          open: true,
          onOpenChange: closing.onOpenChange,
          ...props,
        },
      });

      return {
        id: id,
        dismiss,
        update,
      };
    },
    []
  );

  const dismiss = React.useCallback((toastId?: string) => {
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId });
  }, []);

  const mapToastItem = ({
    id,
    title,
    description,
    action,
    ...props
  }: ToastItem) => {
    return (
      <ToastPrimitives.Root
        open={props.open}
        onOpenChange={props.onOpenChange}
        role="alert"
        className={cn("border", props.className)}
        {...props}
      >
        {title && <ToastPrimitives.Title>{title}</ToastPrimitives.Title>}
        {description && (
          <ToastPrimitives.Description>{description}</ToastPrimitives.Description>
        )}
        {action && <ToastPrimitives.Action>{action}</ToastPrimitives.Action>}
        <ToastPrimitives.Close>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ToastPrimitives.Close>
      </ToastPrimitives.Root>
    );
  };

  return (
    <ToastPrimitives.Provider
      position={position}
      toast={toast}
      dismiss={dismiss}
      {...state}
    >
      <ToastViewport position={position}>
        {state.toasts.map((t) => mapToastItem(t))}
      </ToastViewport>
      {children}
    </ToastPrimitives.Provider>
  );
}

export { ToastProviderComponent as ToastProvider, actionTypes, reducer };

type ToastDisplay = Omit<
  React.ComponentProps<typeof ToastProviderComponent>,
  "children"
>;

export function useToast() {
  return React.useContext(ToastContext);
}

const ToastContext = React.createContext<{
  toast: ReturnType<typeof ToastProviderComponent>["toast"];
  dismiss: ReturnType<typeof ToastProviderComponent>["dismiss"];
} | null>(null);

export function ToastView({ children }: { children: React.ReactNode }) {
  return (
    <ToastContext.Provider value={{ toast: React.useCallback(() => {}, []), dismiss: React.useCallback(() => {}, []) }}>
      {children}
    </ToastContext.Provider>
  );
}
