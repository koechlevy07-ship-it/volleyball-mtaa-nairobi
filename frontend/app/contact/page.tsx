"use client";

import { useState } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/home/BottomNav";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ChevronLeft, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Your message has been sent. We will get back to you soon!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-vball-bg pb-[90px]">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Contact Us</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        <Card className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-vball-navy">Get in Touch</h2>
            <p className="text-sm text-vball-muted">Have a question, feedback, or partnership idea? Reach out to us!</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3 p-3 bg-vball-bg rounded-xl">
              <Mail size={18} className="text-vball-blue" />
              <span>info@volleyballmtaa.co.ke</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-vball-bg rounded-xl">
              <Phone size={18} className="text-vball-blue" />
              <span>+254 700 123 456</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-vball-bg rounded-xl">
              <MapPin size={18} className="text-vball-blue" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-bold text-vball-navy text-sm">Send Us a Message</h3>
          <Input label="Your Name" placeholder="Enter your full name" />
          <Input label="Email Address" type="email" placeholder="Enter your email" />
          <div className="space-y-1">
            <label className="text-sm font-medium text-vball-navy">Message</label>
            <textarea 
              className="w-full h-32 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vball-blue resize-none"
              placeholder="Write your message here..."
            />
          </div>
          <Button className="w-full" onClick={handleSubmit} isLoading={isSubmitting}>
            Send Message
          </Button>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}