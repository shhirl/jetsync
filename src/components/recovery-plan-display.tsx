"use client";

import type { RecoveryPlan } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExerciseCard from "./exercise-card";
import SleepCard from "./sleep-card";
import LightCard from "./light-card";
import { PlaneTakeoff, PlaneLanding, Clock, Activity, Moon, Sun } from "lucide-react";

interface RecoveryPlanDisplayProps {
  plan: RecoveryPlan | null;
}

export default function RecoveryPlanDisplay({ plan }: RecoveryPlanDisplayProps) {
  if (!plan) {
    return (
      <Card className="mt-6 shadow-lg">
        <CardHeader>
          <CardTitle>Your Personalized Recovery Plan</CardTitle>
          <CardDescription>Enter your trip details above to generate your plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No plan generated yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 shadow-lg bg-card/80 backdrop-blur-sm">
       <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary-foreground">Your Recovery Plan</CardTitle>
        <CardDescription className="text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:gap-4 pt-2">
          <span className="flex items-center gap-1"><PlaneTakeoff className="w-4 h-4" /> {plan.tripSummary.departure}</span>
          <span className="hidden sm:inline">→</span>
          <span className="flex items-center gap-1"><PlaneLanding className="w-4 h-4" /> {plan.tripSummary.arrival}</span>
          {plan.tripSummary.timeZoneDifference && (
             <span className="flex items-center gap-1 pt-1 sm:pt-0"><Clock className="w-4 h-4" /> {plan.tripSummary.timeZoneDifference}</span>
          )}

        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="exercise" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-primary/20">
            <TabsTrigger value="exercise" className="flex items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Activity className="w-4 h-4" /> Exercise
            </TabsTrigger>
            <TabsTrigger value="sleep" className="flex items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Moon className="w-4 h-4" /> Sleep
            </TabsTrigger>
            <TabsTrigger value="light" className="flex items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Sun className="w-4 h-4" /> Light
            </TabsTrigger>
          </TabsList>
          <TabsContent value="exercise">
             {plan.exercisePlan.length > 0 ? (
                plan.exercisePlan.map((ex) => <ExerciseCard key={ex.id} exercise={ex} />)
             ) : (
                <p className="text-muted-foreground text-center py-4">No specific exercise recommendations for this trip.</p>
             )}
          </TabsContent>
          <TabsContent value="sleep">
             {plan.sleepSchedule.length > 0 ? (
                plan.sleepSchedule.map((sl) => <SleepCard key={sl.id} recommendation={sl} />)
                ) : (
                <p className="text-muted-foreground text-center py-4">No specific sleep recommendations for this trip.</p>
                )}
          </TabsContent>
          <TabsContent value="light">
             {plan.lightExposure.length > 0 ? (
                 plan.lightExposure.map((li) => <LightCard key={li.id} guide={li} />)
                ) : (
                <p className="text-muted-foreground text-center py-4">No specific light exposure guidance for this trip.</p>
                )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
