/* eslint-disable react-hooks/exhaustive-deps */
// src/hooks/use-toast.ts

import * as React from "react";
// Remove the unused import statement for ToastPrimitives
// import * as ToastPrimitives from "@radix-ui/react-toast";

type ToastAction = {
  label: string;
  onClick: () => void;
};

type ToastVariant = "default" | "destructive";

type ToastDetails = {
  title: string;
  description?: string;
  action?: ToastAction;
  variant?: ToastVariant;
};

type Toast = ToastDetails & {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ToastAdd = (details: ToastDetails) => void;

type ToastUpdate = (toast: Partial<Toast> & Pick<Toast, "id">) => void;

type ToastRemove = (id: string) => void;

type UseToastReturn = {
  toasts: Toast[];
  toast: {
    add: ToastAdd;
    update: ToastUpdate;
    remove: ToastRemove;
  };
};

// const VIEWPORT_GAP = 8;

function useToast(): UseToastReturn {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const viewportRef = React.useRef<HTMLElement>(null);

  const handlePause = React.useCallback(() => {
    setToasts((t) => t.map((toast) => ({ ...toast, onOpenChange: () => {} })));
  }, []);

  const handleResume = React.useCallback(() => {
    setToasts((t) =>
      t.map((toast) => ({
        ...toast,
        onOpenChange: (open) => {
          if (!open) removeToast(toast.id);
        },
      }))
    );
  }, []);

  React.useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.addEventListener("pointerenter", handlePause);
    viewport.addEventListener("pointerleave", handleResume);

    return () => {
      viewport.removeEventListener("pointerenter", handlePause);
      viewport.removeEventListener("pointerleave", handleResume);
    };
  }, [handlePause, handleResume]);

  const addToast: ToastAdd = React.useCallback((details) => {
    const id = Math.random().toString(36).substring(2);
    setToasts((t) => [
      ...t,
      {
        id,
        ...details,
        open: true,
        onOpenChange: (open) => {
          if (!open) removeToast(id);
        },
      },
    ]);
  }, []);

  const updateToast: ToastUpdate = React.useCallback((toast) => {
    setToasts((t) =>
      t.map((prev) => (prev.id === toast.id ? { ...prev, ...toast } : prev))
    );
  }, []);

  const removeToast: ToastRemove = React.useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
  }, []);

  return {
    toasts,
    toast: {
      add: addToast,
      update: updateToast,
      remove: removeToast,
    },
  };
}

export { useToast };
