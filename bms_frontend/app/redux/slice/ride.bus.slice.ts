import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const RideBusInfo = createAsyncThunk(
    'ride/details',
    async (
        params: {
            source: string;
            destination: string;
            ride_Date: string;
            departure_time: string;
            category: string;
        },
        thunkAPI
    ) => {
        console.log("g0ing inside try")
        try {
            const res = await axios.get(`http://localhost:3001/ride/rides`, {
                params,
                withCredentials: true,
            });
            console.log('data:', res.data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch rides');
        }
    }
);
const initialState: RideState = {
    loading: false,
    error: null,
    Rides: null,
};

const RideSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
        clearRide: (state) => {
            state.Rides = null,
                state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.
            addCase(RideBusInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(RideBusInfo.fulfilled, (state, action: PayloadAction<Ride[]>) => {
                state.loading = false;
                state.Rides = action.payload

            })
            .addCase(RideBusInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }

});
export const { clearRide } = RideSlice.actions
export default RideSlice.reducer