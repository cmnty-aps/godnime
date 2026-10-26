"use client";
import { ProgressProvider } from '@bprogress/next/app';

export function AuthProvider({ children }) {
  return (
    <ProgressProvider
      height="3px"
      color="#e26bbd"
      options={{ showSpinner: true }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}