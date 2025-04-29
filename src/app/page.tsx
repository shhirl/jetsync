"use client";

import { useState } from 'react';
import TripInputForm from '@/components/trip-input-form';
import RecoveryPlanDisplay from '@/components/recovery-plan-display';
import { generateRecoveryPlanAction } from '@/app/actions';
import type { TripInput, RecoveryPlan } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image'; // Import next/image

export default function Home() {
  const [recoveryPlan, setRecoveryPlan] = useState<RecoveryPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTripSubmit = async (data: TripInput) => {
    setIsLoading(true);
    setRecoveryPlan(null); // Clear previous plan

    const result = await generateRecoveryPlanAction(data);

    setIsLoading(false);

    if (result.success && result.plan) {
      setRecoveryPlan(result.plan);
      toast({
        title: "Success!",
        description: "Your personalized recovery plan has been generated.",
        variant: "default", // Use default (like success) style from theme
      });
    } else {
      console.error("Plan generation failed:", result.error);
      toast({
        title: "Error",
        description: result.error || "Could not generate recovery plan.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12 bg-gradient-to-br from-background to-secondary/30">
       {/* Hero Image */}
       <div className="relative w-full h-48 md:h-64 mb-6 md:mb-10 overflow-hidden rounded-lg shadow-xl">
         <Image
           src="https://picsum.photos/1200/400?random=1&blur=1" // Placeholder image URL
           alt="Abstract background representing travel and wellness"
           layout="fill"
           objectFit="cover"
           priority // Load image eagerly as it's above the fold
         />
         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-center text-white drop-shadow-md px-4">
                JetLagEase
            </h1>
         </div>
       </div>


      <div className="w-full max-w-4xl">
        <TripInputForm onSubmit={handleTripSubmit} isLoading={isLoading} />
        <RecoveryPlanDisplay plan={recoveryPlan} />
      </div>
    </main>
  );
}
