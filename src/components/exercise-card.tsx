"use client";

import type { ExerciseRecommendation } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Zap, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExerciseCardProps {
  exercise: ExerciseRecommendation;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const getIntensityColor = (intensity: 'Light' | 'Moderate' | 'Vigorous') => {
    switch (intensity) {
      case 'Light':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
      case 'Moderate':
        return 'bg-yellow-400 text-yellow-900 hover:bg-yellow-400/80'; // Custom color, not relying on theme accent for this
      case 'Vigorous':
        return 'bg-red-500 text-white hover:bg-red-500/80'; // Custom color for high intensity
      default:
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
    }
  };


  return (
    <Card className="mb-4 shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          {exercise.type}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground grid gap-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{exercise.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          <span>{exercise.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`py-1 px-2 text-xs ${getIntensityColor(exercise.intensity)} border-none`}>
            {exercise.intensity} Intensity
          </Badge>
        </div>
        {exercise.notes && (
          <p className="mt-2 text-foreground italic">{exercise.notes}</p>
        )}
      </CardContent>
    </Card>
  );
}
