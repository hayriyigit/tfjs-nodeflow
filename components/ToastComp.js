import { Position, Toaster, Intent } from "@blueprintjs/core";

const settings = {
  danger: {
    intent: Intent.DANGER,
    icon: "warning-sign",
  },
  success: {
    intent: Intent.SUCCESS,
    icon: "tick-circle",
  },
  warning: {
    intent: Intent.WARNING,
    icon: "warning-sign",
  },
};

const MyToaster =
  typeof window !== "undefined"
    ? Toaster.create({
        canEscapeKeyClear: true,
        maxToasts: 3,
        position: Position.BOTTOM,
      })
    : null;

export const ToastIt = (message, intent) =>
  MyToaster.show({
    message,
    icon: settings[intent].icon,
    intent: settings[intent].intent,
  });
