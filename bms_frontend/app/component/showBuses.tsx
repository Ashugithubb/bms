import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography, Card, CardContent } from "@mui/material";
import PublishRide from "./publish.ride";

const MyBusComponent = () => {
  const [buses, setBuses] = useState([]);
  const [rideDetails, setRideDetails] = useState<any[]>([]);
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null)
  const [showRideForm, setShowRideForm] = useState(false);
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get("http://localhost:3001/user/bus", {
          withCredentials: true,
        });
        setBuses(res.data.bus); 
      } catch (error) {
        console.log("❌ Error fetching buses:", error);
      }
    };

    fetchBuses();
  }, []);

  const handelBusClick = async (busId: number) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/ride/busHistory/${busId}`,
        {
          withCredentials: true,
        }
      );
      setSelectedBusId(busId);
      setRideDetails(res.data); 
    } catch (error) {
      console.log("❌ Error fetching ride history:", error);
    }
  };
const handlePublishClick = (busId: number) => {
    setSelectedBusId(busId);
    setShowRideForm(!showRideForm);
  };
  return (
    <div>
      <h2>Your Buses</h2>
      {buses.length === 0 ? (
        <p>No buses found</p>
      ) : (
        <ul>
          {buses.map((bus: any) => (
            <li key={bus.busId}>
              {bus.model} - {bus.regno}
              <Button
                onClick={() => handelBusClick(bus.busId)}
                variant="contained"
                style={{ marginLeft: "10px" }}
              >
                See Bus Ride Details
              </Button>
              <Button
                variant="outlined"
                onClick={() => handlePublishClick(bus.busId)}
                style={{ marginLeft: "10px" }}
              >
                Publish Ride
              </Button>
            </li>
          ))}
        </ul>
      )}
      {showRideForm && selectedBusId !== null && (
        <PublishRide busId={selectedBusId} />
      )}
     
      {rideDetails.length > 0 && selectedBusId && (
        <div style={{ marginTop: "30px", width:"400px" }}>
          <Typography variant="h5" gutterBottom>
            Ride Details for Bus #{selectedBusId}
          </Typography>
          {rideDetails.map((ride: any) => (
            <Card key={ride.rideId} style={{ marginBottom: "10px" }}>
              <CardContent>
                <Typography>
                  <strong>Date:</strong> {ride.ride_Date}
                </Typography>
                <Typography>
                  <strong>From:</strong> {ride.source}
                </Typography>
                <Typography>
                  <strong>To:</strong> {ride.destination}
                </Typography>
                <Typography>
                  <strong>Departure:</strong> {ride.departure_time}
                </Typography>
                <Typography>
                  <strong>Stop Duration:</strong> {ride.Stop_duration}
                </Typography>
                <Typography>
                  <strong>Current Location:</strong> {ride.current_location}
                </Typography>
                <Typography>
                  <strong>Fare:</strong> ₹{ride.fare}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBusComponent;
