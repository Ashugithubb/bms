'use client'
import { useForm } from "react-hook-form";
import { userSchema } from "./schema/profile.schema"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from "../redux/hook/hook"
import { useAppSelector } from "../redux/hook/hook";

import { error } from "console";
import { Controller } from "react-hook-form";
import Navbar from "../component/navbar";


type ProfileData = z.infer<typeof userSchema>;
export default function Profile() {
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.user.profile);
    
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ProfileData>({
        resolver: zodResolver(userSchema),
    });

    useEffect(() => {
    reset({
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        gender: profile?.gender,
        phone: profile?.phone,
      });
    },[profile,reset]);


    const onSubmit = async (formData: ProfileData) => {
    
        const payload = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            gender: formData.gender,
            phone: formData.phone,
        }
        console.log(payload);
        try{const res = await axios.patch('http://localhost:3001/user/update'
            , payload, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        toast("Profile Updated");
        console.log(res);}
        catch(error){
            console.log(error);
        }

    };


    return (

        <>
        <Navbar/>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>

                <ToastContainer />
                <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
                    <Typography variant="h5" gutterBottom>Submit Your Profile</Typography>

                    <Typography variant="h6" color="primary">
                        {profile?.email ? profile.email : "Loading email..."}
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit, (err) => {
                        console.log("❌ Validation Errors:", err);
                        toast.error("Form validation failed");
                    })}>
                        <TextField
                            label="First Name"
                            fullWidth
                            margin="normal"
                            {...register('first_name')}
                            error={!!errors.first_name}
                            helperText={errors.first_name?.message}
                        />
                        <TextField
                            label="Last Name"
                            fullWidth
                            margin="normal"
                            {...register('last_name')}
                            error={!!errors.last_name}
                            helperText={errors.last_name?.message}
                        />
                        <FormLabel sx={{ mt: 2 }}>Gender</FormLabel>
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <RadioGroup row {...field}>
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            )}
                        />
                        {errors.gender && (
                            <Typography color="error" variant="body2">
                                {errors.gender.message}
                            </Typography>
                        )}

        
                        <TextField
                            label="Phone Number"
                            fullWidth
                            margin="normal"
                            {...register('phone')}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Update
                        </Button>
                    </form>
                </Paper>
            </Box>
        </>
    )

}



