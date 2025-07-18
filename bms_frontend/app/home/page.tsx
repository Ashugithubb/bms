'use client'
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { UserInfo } from "@/app/redux/slice/user.slice";
import { Typography } from "@mui/material";
import { useEffect } from "react";

export default function DashBoard(){
    const dispatch = useAppDispatch();
    const email = useAppSelector((state)=>state.user.profile?.first_name)
    useEffect(()=>{
       setTimeout(function() {
  console.log("This message appears after 2 seconds.");
}, 5000);

    },[dispatch])

    return(
        <>
        {console.log(email)}
        <Typography color="secondary">Home</Typography>
        </>
    )
}

// const profile = useAppSelector((state) => state.user.profile);

// console.log(profile?.bus);     // array of buses
// console.log(profile?.tickets); // array of tickets