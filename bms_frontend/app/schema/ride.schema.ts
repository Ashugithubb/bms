import { z } from 'zod';

export const rideSchema = z.object({
  source: z.string().min(1, "Source is required"),
  destination: z.string().min(1, "Destination is required"),
  departure_time: z.string().min(1, "Departure time is required"), // You can add time validation here
  Stop_duration: z.string().min(1, "Stop duration is required"),
  ride_Date: z.string().min(1, "Ride date is required"), // Optional: z.string().refine(...) for date format
  fare: z.number().min(0, "Fare must be positive"),
  current_location: z.string().min(1, "Current location is required"),
});

export type RideFormData = z.infer<typeof rideSchema>;
