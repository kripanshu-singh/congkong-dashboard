"use client";

import React, {
  createContext,
  useContext,
  useState,
  useTransition,
} from "react";

interface NavigationContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  navigate: (url: string) => void;
  isPending: boolean;
  startTransition: (callback: () => void) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const navigate = (url: string) => {
    setIsLoading(true);
    startTransition(() => {
      window.location.href = url;
    });
  };

  return (
    <NavigationContext.Provider
      value={{
        isLoading,
        setIsLoading,
        navigate,
        isPending,
        startTransition,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
