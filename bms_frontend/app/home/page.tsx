'use client'
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { UserInfo } from "@/app/redux/slice/user.slice";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import Navbar from "../component/navbar";
import { SearchRide } from "../component/searchRide";
import RideHistory from "../component/rideHistory";
import MyBusComponent from "../component/showBuses";

export default function DashBoard(){
    const dispatch = useAppDispatch();
    const name = useAppSelector((state)=>state.user.profile?.first_name)
    const role = useAppSelector((state)=>state.user.profile?.role);
    useEffect(()=>{
       setTimeout(function() {
        dispatch(UserInfo())
 
}, 5000);

    },[])

    return (
  <>
    <Navbar />

    {role === 'Passenger' ? (
      <>
        <Typography color="secondary">{name}</Typography>
        <SearchRide />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <RideHistory />
        </Box>
      </>
    ) : (
      <MyBusComponent />
    )}
  </>
);

}

// const profile = useAppSelector((state) => state.user.profile);

// console.log(profile?.bus);     // array of buses
// console.log(profile?.tickets); // array of tickets