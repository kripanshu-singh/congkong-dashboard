"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Hide loading when pathname changes (navigation complete)
    setIsLoading(false);
  }, [pathname]);

  useEffect(() => {
    // Listen for browser back/forward navigation
    const handlePopState = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4 p-8 rounded-lg bg-card border shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
