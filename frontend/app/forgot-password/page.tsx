"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, MailCheck, Mail } from "lucide-react";

const API_URL = "https://volleyball-mtaa-backend.onrender.com/api/v1/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      await axios.post(`${API_URL}/forgot-password`, { email });
      setIsSent(true);
      setMessage("If an account exists for that email, a reset link has been sent.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vball-bg flex flex-col justify-center py-8 px-4">
      <div className="max-w-md mx-auto w-full space-y-6">
        <Link href="/login" className="inline-flex items-center gap-1 text-sm text-vball-muted hover:text-vball-navy transition-colors">
          <ArrowLeft size={16} /> Back to Log In
        </Link>

        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-soft mx-auto flex items-center justify-center p-2">
            <div className="w-full h-full bg-vball-blue rounded-xl flex items-center justify-center text-white">
              {isSent ? <MailCheck size={32} /> : <Mail size={32} />}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-vball-navy">Forgot Password</h1>
          <p className="text-sm text-vball-muted">
            Enter your account email and we'll send you a link to reset your password.
          </p>
        </div>

        {isSent ? (
          <Card className="space-y-4 p-6 text-center">
            <p className="text-sm text-gray-600">{message}</p>
            <Link href="/login">
              <Button className="w-full">Back to Log In</Button>
            </Link>
          </Card>
        ) : (
          <Card className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-3 py-2">
                {error}
              </div>
            )}
            <Input
              label="Email address"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="w-full" onClick={handleSubmit} isLoading={isLoading} disabled={!email.trim()}>
              Send Reset Link
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
