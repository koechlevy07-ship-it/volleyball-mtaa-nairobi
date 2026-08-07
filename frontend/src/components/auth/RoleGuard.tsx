"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Array<"community_member" | "organizer" | "super_admin">;
  redirectTo?: string;
}

export const RoleGuard = ({ 
  children, 
  allowedRoles, 
  redirectTo = "/login" 
}: RoleGuardProps) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated && !isLoading) {
        await checkAuth();
      }
      setChecked(true);
    };
    verifyAuth();
  }, [isAuthenticated, isLoading, checkAuth]);

  useEffect(() => {
    if (checked && !isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }
      
      if (user && !allowedRoles.includes(user.role as any)) {
        router.push("/");
      }
    }
  }, [checked, isAuthenticated, isLoading, user, allowedRoles, router, redirectTo]);

  if (isLoading || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-vball-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-vball-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-vball-muted text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role as any)) {
    return null;
  }

  return <>{children}</>;
};