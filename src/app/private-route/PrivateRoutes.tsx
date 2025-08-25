"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Auth = {
  isLoggedIn?: boolean;
  status?: string;
  role?: string;
};

export default function PrivateRoute({
  children,
}: PropsWithChildren<{ requiredRoles: string[] }>) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthFromStorage = (): Auth | null => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("auth");
      if (!stored) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  };

  const isPatientDetailPage = (pathname: string): boolean => {
    return /^\/patients\/[^\/]+$/.test(pathname);
  };

  useEffect(() => {
    const authData = getAuthFromStorage();
    const isAuthenticated =
      authData?.role &&
      (authData.isLoggedIn || authData.status === "succeeded");

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (pathname.startsWith("/patients")) {
      if (authData?.role === "medical") {
        // medical allowed
      } else if (authData?.role === "patient") {
        if (isPatientDetailPage(pathname)) {
          // patient accessing specific patient page – allowed
        } else {
          router.replace("/profile");
          return;
        }
      } else {
        router.replace("/profile");
        return;
      }
    }

    // patient cannot access other routes
    if (authData?.role === "patient") {
      if (!pathname.startsWith("/profile") && !isPatientDetailPage(pathname)) {
        router.replace("/profile");
        return;
      }
    }

    // passed all checks
    setAuthorized(true);
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!authorized) return null;

  return <>{children}</>;
}
