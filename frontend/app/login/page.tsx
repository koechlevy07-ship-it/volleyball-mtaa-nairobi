"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store/authStore";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    await login(email, password);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-vball-bg flex flex-col justify-center py-8 px-4">
      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-soft mx-auto flex items-center justify-center p-2">
             {/* Placeholder Logo */}
            <div className="w-full h-full bg-vball-blue rounded-xl flex items-center justify-center text-white font-extrabold text-2xl">
              VM
            </div>
          </div>
          <h1 className="text-2xl font-bold text-vball-navy">Welcome Back!</h1>
          <p className="text-sm text-vball-muted">Log in to your account and stay connected with Nairobi volleyball.</p>
        </div>

        <Card className="space-y-4">
          <div className="flex border-b border-gray-200">
            <button className="flex-1 py-3 text-center text-vball-blue font-semibold border-b-2 border-vball-blue">Log In</button>
            <Link href="/register" className="flex-1 py-3 text-center text-vball-muted hover:text-vball-navy transition-colors">Sign Up</Link>
          </div>

          <Input label="Email address" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          
          <div className="space-y-1 relative">
            <Input 
              label="Password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="pr-10"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-vball-muted hover:text-vball-navy">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <Link href="/forgot-password" className="block text-right text-xs text-vball-blue hover:underline mt-1">
              Forgot Password?
            </Link>
          </div>

          <Button className="w-full" onClick={handleLogin} isLoading={isLoading}>
            Log In
          </Button>
        </Card>

        <div className="relative flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-vball-muted">Or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="gap-2 text-xs">
            <span className="text-red-500 font-bold">G</span> Google
          </Button>
          <Button variant="outline" className="gap-2 text-xs">
            <span className="text-blue-600 font-bold">f</span> Facebook
          </Button>
        </div>

        <p className="text-center text-sm text-vball-muted">
          Don't have an account? <Link href="/register" className="text-vball-blue font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}