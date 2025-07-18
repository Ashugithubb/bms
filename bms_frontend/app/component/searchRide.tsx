'use client'
import { Box, Button, List, ListItem, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export function SearchRide() {
    const [searchSource, setSearchSource] = useState('');
    const [searchDestination, setSearchDestination] = useState('')
    const [sources, setSource] = useState<{ source: string }[]>([]);
    const [destination, setDestination] = useState<{ source: string }[]>([]);
    const [ride_Date, setRide_Date] = useState('');
    const [departure_time, setDeparture_time] = useState('');
    const [category, setCatgory] = useState('');

    const [openIndex, setOpenIndex] = useState<number | null>(null);


    const [rides, setRides] = useState<Ride[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setCatgory(event.target.value as string);
    };

    useEffect(() => {
        const debounce = setTimeout(async () => {
            if (searchSource.trim() === '') {
                setSource([]);
                return;
            }
            try {
                const res = await axios.get(`http://localhost:3001/ride/search?source=${searchSource}`, {
                    withCredentials: true,
                });
                setSource(res.data);
                console.log(sources)
            } catch (error) {
                console.log("Fetch error:", error);
            }
        }, 2000);

        return () => clearTimeout(debounce);
    }, [searchSource]);

    useEffect(() => {
        console.log('monunt1')
        const debounce = setTimeout(async () => {
            if (searchDestination.trim() === '') {
                setDestination([]);
                return;
            }
            try {
                const res = await axios.get(`http://localhost:3001/ride/search?destination=${searchDestination}`, {
                    withCredentials: true,
                });
                setDestination(res.data);
                console.log(res.data);
                console.log('monunt2')
            } catch (error) {
                console.log("Fetch error:", error);
                console.log('monunt3')
            }
        }, 2000);
        console.log('monunt4')
        return () => clearTimeout(debounce);
    }, [searchDestination]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const params = {
            source: searchSource,
            destination: searchDestination,
            ride_Date: ride_Date,
            departure_time: departure_time,
            category: category
        };

        try {
            const response = await axios.get('http://localhost:3001/ride/rides', { params });
            console.log('Ride search results:', response.data);
            setRides(response.data);
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    return (
        <>
            <Typography>Search Rides</Typography>

            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Type Source.."
                        value={searchSource}
                        onChange={(e) => setSearchSource(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Type Destination"
                        value={searchDestination}
                        onChange={(e) => setSearchDestination(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Enter Date"
                        type="date"

                        value={ride_Date}
                        onChange={(e) => setRide_Date(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Enter Time"
                        type="time"
                        value={departure_time}
                        onChange={(e) => setDeparture_time(e.target.value)}
                    />

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={handleChange}
                    >
                        <MenuItem value={'Ac'}>Ac</MenuItem>
                        <MenuItem value={'Non-Ac'}>Non-Ac</MenuItem>
                    </Select>
                    <Button variant="contained" type="submit">Search</Button>
                </Box>
            </form>


            {/* <List>
                {sources.map((s, index) => (
                    <ListItem key={index} >
                        <ListItemText primary={s.source} />
                    </ListItem>
                ))}
            </List> */}


            {rides.length === 0 ? (
                <Typography>No Rides</Typography>
            ) : (
                rides.map((r, index) => (
                    <Box key={index} sx={{ width: "500px", border: '1px solid gray', p: 2, mt: 2 }}>
                        <Typography variant="h6">Ride ID: {r.rideId}</Typography>
                        <Typography>Source: {r.source}</Typography>
                        <Typography>Destination: {r.destination}</Typography>
                        <Typography>Date: {r.ride_Date}</Typography>
                        <Typography>Time: {r.departure_time}</Typography>
                        <Typography>Category: {r.bus?.category}</Typography>
                        <Typography>Fare: ₹{r.fare}</Typography>
                        <Typography>Current Location: {r.current_location}</Typography>
                        <Button onClick={() => setOpenIndex(openIndex === index ? null : index)} variant="contained">
                            Bus Details
                        </Button>


                        {openIndex === index && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1">Bus Info:</Typography>
                                <Typography>Model: {r.bus?.model}</Typography>
                                <Typography>Color: {r.bus?.color}</Typography>
                                <Typography>Total Seats: {r.bus?.total_seats}</Typography>
                                <Typography>Reg. no.: {r.bus?.regno}</Typography>
                                <Button variant="contained">Book Ticket</Button>
                            </Box>
                        )}
                    </Box>
                )))

            }

        </>
    );
}






/*
// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // prevent page refresh

//     const req?estData = {
//         source: searchSource,
//         destination: searchDestination,
//         date: searchDate,
//         time: searchTime,
//     };

//     try {
//         const response = await axios.post('http://localhost:3001/ride/rides', requestData);
//         console.log('Response from backend:', response.data);
//     } catch (error) {
//         console.error('Error submitting form:', error);
//     }
// };
// */