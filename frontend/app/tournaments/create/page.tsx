"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, Upload } from "lucide-react";

export default function CreateTournamentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/tournaments");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-vball-bg pb-20">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <Link href="/tournaments" className="p-2 hover:bg-vball-bg rounded-full transition-colors">
          <ChevronLeft size={24} className="text-vball-navy" />
        </Link>
        <span className="font-semibold text-vball-navy text-sm">Create Tournament</span>
      </header>

      <main className="px-4 pt-4 space-y-4 max-w-md mx-auto pb-6">
        <Card>
          <div className="flex justify-between items-center px-4 py-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${s <= step ? "bg-vball-blue text-white" : "bg-gray-200 text-gray-500"}`}>
                  {s}
                </div>
                {s < 4 && <div className={`w-4 h-0.5 ${s < step ? "bg-vball-blue" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </Card>

        {step === 1 && (
          <Card className="space-y-4">
            <h2 className="font-bold text-vball-navy text-lg">Basic Details</h2>
            <Input label="Tournament Name *" placeholder="e.g. Kasarani Open 2025" />
            <Input label="Short Description" placeholder="A short catchy description..." />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Category" placeholder="Men, Women, Mixed" />
              <Input label="Tournament Type" placeholder="Open, League, Cup" />
            </div>
            <Button className="w-full" onClick={() => setStep(2)}>Next: Schedule & Venue</Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="space-y-4">
            <h2 className="font-bold text-vball-navy text-lg">Schedule & Venue</h2>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Start Date" type="date" />
              <Input label="End Date" type="date" />
            </div>
            <Input label="Venue Name *" placeholder="e.g. Kasarani Indoor Arena" />
            <Input label="Venue Address" placeholder="Enter full address" />
            <Input label="Registration Deadline" type="date" />
            <div className="flex gap-3">
              <Button variant="outline" className="w-1/3" onClick={() => setStep(1)}>Back</Button>
              <Button className="w-2/3" onClick={() => setStep(3)}>Next: Rules & Format</Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="space-y-4">
            <h2 className="font-bold text-vball-navy text-lg">Rules & Format</h2>
            <Input label="Max Teams" type="number" placeholder="16" />
            <Input label="Entry Fee" placeholder="KSh 6,000" />
            <Input label="Format" placeholder="Pool + Knockout" />
            <div className="flex gap-3">
              <Button variant="outline" className="w-1/3" onClick={() => setStep(2)}>Back</Button>
              <Button className="w-2/3" onClick={() => setStep(4)}>Next: Media & Publish</Button>
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card className="space-y-4">
            <h2 className="font-bold text-vball-navy text-lg">Media & Publish</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center space-y-2">
              <Upload className="mx-auto text-gray-400" size={32} />
              <p className="text-sm font-medium text-vball-navy">Upload Tournament Poster</p>
              <p className="text-xs text-gray-500">Drag and drop or click to upload</p>
              <Button variant="outline" size="sm" className="mt-2">Choose File</Button>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="w-1/3" onClick={() => setStep(3)}>Back</Button>
              <Button className="w-2/3" onClick={handleSubmit} isLoading={isSubmitting}>Publish Tournament</Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}