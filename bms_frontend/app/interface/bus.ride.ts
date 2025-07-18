interface Bus {
  busId: number;
  model: string;
  color: string;
  total_seats: number;
  regno: string;
  registeredAt: string;
   category: string;
}

interface Ride {
  rideId: number;
  source: string;
  destination: string;
  ride_Date: string;
  departure_time: string;
  fare: number;
  current_location: string;
  publisedAt: string;
  Stop_duration: string;
  bus: Bus;
}
