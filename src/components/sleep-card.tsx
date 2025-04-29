"use client";

import type { SleepRecommendation } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon } from "lucide-react";

interface SleepCardProps {
  recommendation: SleepRecommendation;
}

export default function SleepCard({ recommendation }: SleepCardProps) {
  return (
    <Card className="mb-4 shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Moon className="w-5 h-5 text-primary" />
          Sleep Tip
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <p className="text-foreground mb-1">{recommendation.suggestion}</p>
        {recommendation.details && (
          <p className="text-muted-foreground italic">{recommendation.details}</p>
        )}
      </CardContent>
    </Card>
  );
}
