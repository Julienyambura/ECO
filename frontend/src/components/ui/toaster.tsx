"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, description, action, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        "bg-background border rounded-md shadow-sm p-4 pointer-events-auto w-[360px] max-w-[90vw] flex items-center space-x-4",
        className
      )}
      {...props}
    >
      <div className="flex flex-col space-y-1">
        <ToastPrimitives.Title className="text-sm font-semibold">
          {props.title}
        </ToastPrimitives.Title>
        {description && (
          <ToastPrimitives.Description className="text-sm opacity-70">
            {description}
          </ToastPrimitives.Description>
        )}
      </div>
      {action && (
        <ToastPrimitives.Action
          asChild
          altText="Goto schedule to manage your notifications"
        >
          <Button variant="outline" size="sm">
            {action}
          </Button>
        </ToastPrimitives.Action>
      )}
      <ToastPrimitives.Close asChild>
        <Button variant="ghost" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Button>
      </ToastPrimitives.Close>
    </ToastPrimitives.Root>
  );
});
Toast.displayName = "Toast";

const Toaster = ({}) => {
  return (
    <ToastPrimitives.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-y-2 pointer-events-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:zoom-out-95 data-[side=top]:slide-in-from-top-2 data-[side=left]:slide-in-from-left-2 data-[side=bottom]:slide-in-from-bottom-2 data-[side=right]:slide-in-from-right-2 z-[100]" />
  );
};

export { Toaster, Toast };
