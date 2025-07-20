'use client'
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { rideSchema, RideFormData } from '../schema/ride.schema'
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface PublishRideProps {
  busId: number;
}
export default function PublishRide({ busId }: PublishRideProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RideFormData>({
    resolver: zodResolver(rideSchema),
  });

  
  const onSubmit = async (data: RideFormData) => {
    try {
      const res = await axios.post(`http://localhost:3001/ride/create/${busId}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      toast.success("Ride published successfully!");
      reset(); // clear form
      console.log("Ride Created:", res.data);
    } catch (error: any) {
      console.error("❌ Error:", error.response?.data || error.message);
      toast.error("Failed to publish ride");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <ToastContainer />
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom>
          Publish a Ride
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Source"
            fullWidth
            margin="normal"
            {...register("source")}
            error={!!errors.source}
            helperText={errors.source?.message}
          />
          <TextField
            label="Destination"
            fullWidth
            margin="normal"
            {...register("destination")}
            error={!!errors.destination}
            helperText={errors.destination?.message}
          />
          <TextField
            label="Departure Time"
            fullWidth
            margin="normal"
            {...register("departure_time")}
            error={!!errors.departure_time}
            helperText={errors.departure_time?.message}
          />
          <TextField
            label="Stop Duration"
            fullWidth
            margin="normal"
            {...register("Stop_duration")}
            error={!!errors.Stop_duration}
            helperText={errors.Stop_duration?.message}
          />
          <TextField
            label="Ride Date"
            type="date"
            fullWidth
            margin="normal"
            {...register("ride_Date")}
            error={!!errors.ride_Date}
            helperText={errors.ride_Date?.message}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fare (₹)"
            type="number"
            fullWidth
            margin="normal"
            {...register("fare", { valueAsNumber: true })}
            error={!!errors.fare}
            helperText={errors.fare?.message}
          />
          <TextField
            label="Current Location"
            fullWidth
            margin="normal"
            {...register("current_location")}
            error={!!errors.current_location}
            helperText={errors.current_location?.message}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Publish 
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
