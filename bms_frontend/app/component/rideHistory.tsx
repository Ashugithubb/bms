import { Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function RideHistory() {
    const [rideHistory, setRideHistory] = useState<any[]>([]);

    const handelRideHistory = async () => {
        try {
            const res = await axios.get('http://localhost:3001/ticket/ride/history', {
                withCredentials: true
            });
            setRideHistory(res.data);
        } catch (error: any) {
            toast.error(`❌ Failed to load ride history: ${error.message}`);
        }
    };

    return (
        <>
            <Button onClick={handelRideHistory} variant="contained">Ride History</Button>

            <Box sx={{ mt: 3 }}>
                {rideHistory.length === 0 ? (
                    <Typography>No ride history yet.</Typography>
                ) : (
                    rideHistory.map((ticket, index) => (
                        <Box key={index} sx={{ border: '1px solid gray', borderRadius: 2, p: 2, mb: 2 }}>
                            <Typography variant="h6">🎫 Ticket ID: {ticket.ticketId}</Typography>
                            <Typography>📅 Booked At: {new Date(ticket.bookedAt).toLocaleString()}</Typography>
                            <Typography>🚌 From: {ticket.ride.source} ➡️ To: {ticket.ride.destination}</Typography>
                            <Typography>🕒 Departure: {ticket.ride.departure_time} on {ticket.ride.ride_Date}</Typography>
                            <Typography>💰 Fare: ₹{ticket.ride.fare}</Typography>
                            {/* <Typography>📍 Current Location: {hgticket.ride.current_location}</Typography> */}
                            <Typography>👤 Passenger: {ticket.passenger.first_name} {ticket.passenger.last_name}</Typography>
                        </Box>
                    ))
                )}
            </Box>

            <ToastContainer />
        </>
    );
}
