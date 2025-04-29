"use client";

import type { LightExposureGuide } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon } from "lucide-react"; // Using Moon for 'Avoid Light'
import { Badge } from "@/components/ui/badge";

interface LightCardProps {
  guide: LightExposureGuide;
}

export default function LightCard({ guide }: LightCardProps) {
  const isSeekingLight = guide.action === 'Seek Light';
  const Icon = isSeekingLight ? Sun : Moon;
  const badgeVariant = isSeekingLight ? 'default' : 'secondary';
  const badgeBg = isSeekingLight ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-400/80' : 'bg-blue-900 text-white hover:bg-blue-900/80'; // Custom colors

  return (
    <Card className="mb-4 shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Icon className={`w-5 h-5 ${isSeekingLight ? 'text-yellow-500' : 'text-blue-900'}`} />
            <span>{guide.timing}</span>
          </div>
           <Badge variant={badgeVariant} className={`py-1 px-2 text-xs ${badgeBg} border-none`}>
            {guide.action}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        {guide.details && (
          <p className="text-muted-foreground italic">{guide.details}</p>
        )}
      </CardContent>
    </Card>
  );
}
