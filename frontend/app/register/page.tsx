"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store/authStore";
import { Users, Crown, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"community_member" | "organizer">("community_member");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) return;
    await register(name, email, password, role);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-vball-bg flex flex-col justify-center py-8 px-4">
      <div className="max-w-md mx-auto w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-vball-blue rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
            VM
          </div>
          <h1 className="text-2xl font-bold text-vball-navy">Create Your Account</h1>
          <p className="text-sm text-vball-muted">
            Join Volleyball Mtaa Nairobi and start your journey with the community.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center px-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${s <= step ? "bg-vball-blue text-white" : "bg-gray-200 text-gray-500"}`}>
                {s}
              </div>
              <span className="text-[10px] font-medium text-vball-navy">
                {s === 1 ? "Account Info" : s === 2 ? "Personal Info" : "Preferences"}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between px-8 -mt-2">
          <div className={`h-0.5 w-1/3 ${step >= 2 ? "bg-vball-blue" : "bg-gray-200"}`} />
          <div className={`h-0.5 w-1/3 ${step >= 3 ? "bg-vball-blue" : "bg-gray-200"}`} />
        </div>

        <Card className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <Input label="Full Name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Email Address" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input label="Phone Number" placeholder="07X XXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Input 
                  label="Password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a strong password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-vball-muted">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <div className="flex gap-3 text-[10px] text-green-600 mt-1">
                  <span>✓ At least 8 characters</span>
                  <span>✓ One number</span>
                  <span>✓ One special character</span>
                </div>
              </div>
              <Input label="Confirm Password" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              
              <Button className="w-full" onClick={() => setStep(2)}>Continue</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <label className="text-sm font-medium text-vball-navy">I am registering as a:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("community_member")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${role === "community_member" ? "border-vball-blue bg-blue-50" : "border-gray-200"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Users size={24} className="text-vball-blue" />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${role === "community_member" ? "border-vball-blue" : "border-gray-300"}`}>
                      {role === "community_member" && <div className="w-2 h-2 bg-vball-blue rounded-full" />}
                    </div>
                  </div>
                  <p className="font-semibold text-sm">Community Member</p>
                  <p className="text-[10px] text-vball-muted">I want to explore tournaments, chat and stay updated.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("organizer")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${role === "organizer" ? "border-vball-blue bg-blue-50" : "border-gray-200"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Crown size={24} className="text-vball-yellow" />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${role === "organizer" ? "border-vball-blue" : "border-gray-300"}`}>
                      {role === "organizer" && <div className="w-2 h-2 bg-vball-blue rounded-full" />}
                    </div>
                  </div>
                  <p className="font-semibold text-sm">Organizer</p>
                  <p className="text-[10px] text-vball-muted">I want to create and manage tournaments.</p>
                </button>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="w-1/3" onClick={() => setStep(1)}>Back</Button>
                <Button className="w-2/3" onClick={handleRegister} isLoading={isLoading}>Create Account</Button>
              </div>
            </div>
          )}
        </Card>

        <div className="relative flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-vball-muted">or sign up with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="gap-2 text-xs">
            <span className="text-red-500 font-bold">G</span> Continue with Google
          </Button>
          <Button variant="outline" className="gap-2 text-xs">
            <span className="text-blue-600 font-bold">f</span> Continue with Facebook
          </Button>
        </div>

        <p className="text-center text-sm text-vball-muted">
          Already have an account? <Link href="/login" className="text-vball-blue font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}