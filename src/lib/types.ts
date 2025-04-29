import { z } from "zod";

// Schema for trip input form validation
export const TripInputSchema = z.object({
  departureLocation: z.string().min(3, "Departure location must be at least 3 characters"),
  arrivalLocation: z.string().min(3, "Arrival location must be at least 3 characters"),
  departureDateTime: z.string().min(1, "Departure date and time is required"), // Using string for simplicity, ideally date-time
  arrivalDateTime: z.string().min(1, "Arrival date and time is required"),   // Using string for simplicity, ideally date-time
});

// Type derived from the schema
export type TripInput = z.infer<typeof TripInputSchema>;

export interface ExerciseRecommendation {
  id: string;
  time: string; // e.g., "Day 1, 9:00 AM Local Time"
  type: string; // e.g., "Light Walk", "Stretching", "Moderate Jog"
  duration: string; // e.g., "30 minutes"
  intensity: 'Light' | 'Moderate' | 'Vigorous';
  notes?: string;
}

export interface SleepRecommendation {
  id: string;
  suggestion: string; // e.g., "Aim for bedtime at 10:00 PM local time."
  details?: string; // e.g., "Avoid caffeine 6 hours before bed."
}

export interface LightExposureGuide {
  id: string;
  timing: string; // e.g., "Day 1 Morning", "Day 2 Evening"
  action: 'Seek Light' | 'Avoid Light';
  details?: string; // e.g., "Get 30 minutes of outdoor sunlight.", "Wear sunglasses if outside."
}

export interface RecoveryPlan {
  tripSummary: {
    departure: string;
    arrival: string;
    duration?: string; // Calculated duration, e.g., "10 hours"
    timeZoneDifference?: string; // e.g., "+8 hours"
  };
  exercisePlan: ExerciseRecommendation[];
  sleepSchedule: SleepRecommendation[];
  lightExposure: LightExposureGuide[];
}
