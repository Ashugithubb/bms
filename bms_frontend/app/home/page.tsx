'use client'
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { UserInfo } from "@/app/redux/slice/user.slice";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import Navbar from "../component/navbar";
import { SearchRide } from "../component/searchRide";

export default function DashBoard(){
    const dispatch = useAppDispatch();
    const name = useAppSelector((state)=>state.user.profile?.first_name)
    useEffect(()=>{
       setTimeout(function() {
        dispatch(UserInfo())
 
}, 5000);

    },[])

    return(
        <>
        <Navbar/>
        <Typography color="secondary">{name}</Typography>
        <SearchRide/>
        </>
    )
}

// const profile = useAppSelector((state) => state.user.profile);

// console.log(profile?.bus);     // array of buses
// console.log(profile?.tickets); // array of tickets