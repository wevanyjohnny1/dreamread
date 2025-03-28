// StatusToasts.tsx

import React from "react";
import { Toast, ToastDescription, ToastTitle, useToast } from ".";
import { Button, ButtonText } from "../Button";

type ToastProps = {
  id: string;
  title: string;
  description: string;
  duration?: number;
  placement?: "top" | "bottom";
  buttonText?: string;
};

const createToastHandler = (
  id: string,
  status: "success" | "error" | "warning" | "info",
  title: string,
  description: string,
  toast: ReturnType<typeof useToast>,
  duration: number,
  placement: "top" | "bottom"
) => {
  toast.show({
    id,
    placement,
    duration,
    render: ({ id }) => {
      const nativeID = `toast-${id}`;
      return (
        <Toast nativeID={nativeID} action={status} variant="solid">
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{description}</ToastDescription>
        </Toast>
      );
    },
  });
};

export const SuccessToast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  duration = 3000,
  placement = "top",
  buttonText = "Show Success Toast",
}) => {
  const toast = useToast();
  const handlePress = () => createToastHandler(id, "success", title, description, toast, duration, placement);
  return (
    <Button onPress={handlePress}>
      <ButtonText>{buttonText}</ButtonText>
    </Button>
  );
};

export const ErrorToast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  duration = 3000,
  placement = "top",
  buttonText = "Show Error Toast",
}) => {
  const toast = useToast();
  const handlePress = () => createToastHandler(id, "error", title, description, toast, duration, placement);
  return (
    <Button onPress={handlePress}>
      <ButtonText>{buttonText}</ButtonText>
    </Button>
  );
};

export const WarningToast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  duration = 3000,
  placement = "top",
  buttonText = "Show Warning Toast",
}) => {
  const toast = useToast();
  const handlePress = () => createToastHandler(id, "warning", title, description, toast, duration, placement);
  return (
    <Button onPress={handlePress}>
      <ButtonText>{buttonText}</ButtonText>
    </Button>
  );
};

export const InfoToast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  duration = 3000,
  placement = "top",
  buttonText = "Show Info Toast",
}) => {
  const toast = useToast();
  const handlePress = () => createToastHandler(id, "info", title, description, toast, duration, placement);
  return (
    <Button onPress={handlePress}>
      <ButtonText>{buttonText}</ButtonText>
    </Button>
  );
};
