// useCustomToast.tsx

import React from "react";
import { Toast, ToastTitle, ToastDescription, useToast as useGluestackToast } from ".";

export interface ToastOptions {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  placement?: "top" | "bottom";
}

const DEFAULT_DURATION = 3000;
const DEFAULT_PLACEMENT: "top" | "bottom" = "top";

export function useCustomToast() {
  const toast = useGluestackToast();

  const showToast = (
    action: "error" | "success" | "warning" | "info",
    options: ToastOptions
  ) => {
    toast.show({
      id: options.id,
      placement: options.placement || DEFAULT_PLACEMENT,
      duration: options.duration || DEFAULT_DURATION,
      render: ({ id }) => {
        const nativeID = `toast-${id}`;
        return (
          <Toast nativeID={nativeID} action={action} variant="solid">
            <ToastTitle>{options.title}</ToastTitle>
            {options.description && (
              <ToastDescription>{options.description}</ToastDescription>
            )}
          </Toast>
        );
      },
    });
  };

  return {
    error: (options: ToastOptions) => showToast("error", options),
    success: (options: ToastOptions) => showToast("success", options),
    warning: (options: ToastOptions) => showToast("warning", options),
    info: (options: ToastOptions) => showToast("info", options),
    isActive: toast.isActive,
  };
}
