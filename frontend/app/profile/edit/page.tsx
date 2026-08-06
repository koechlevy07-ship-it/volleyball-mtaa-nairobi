"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, Upload, User } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("John Mwangi");
  const [username, setUsername] = useState("@john_mwangi");
  const [bio, setBio] = useState("Volleyball player & enthusiast. Playing for Kasarani Spikers 🏐");
  const [location, setLocation] = useState("Nairobi, Kenya");

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      router.push("/profile");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-vball-bg pb-20">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/profile" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Edit Profile</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        <Card className="space-y-4">
          
          {/* Avatar Upload */}
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-vball-yellow to-vball-blue rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl relative mb-2">
              JM
              <button className="absolute -bottom-1 -right-1 bg-white p-2 rounded-full shadow-card border border-gray-200 hover:bg-vball-bg transition-colors">
                <Upload size={16} className="text-vball-navy" />
              </button>
            </div>
            <p className="text-xs text-gray-500">Tap the icon to upload a new photo</p>
          </div>

          <Input 
            label="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          
          <Input 
            label="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-vball-navy">Bio</label>
            <textarea 
              className="w-full h-24 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-vball-text placeholder:text-vball-muted focus:outline-none focus:ring-2 focus:ring-vball-blue focus:border-transparent resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <Input 
            label="Location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="w-1/3" onClick={() => router.back()}>Cancel</Button>
            <Button className="w-2/3" onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
          </div>

        </Card>
      </main>
    </div>
  );
}