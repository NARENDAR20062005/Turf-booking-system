import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/helper';
import toast from 'react-hot-toast';

const token = localStorage.getItem('token');

export const createGround = createAsyncThunk(
  'ground/createGround',
  async (inputs, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('ground_name', inputs.ground_name);
      formData.append('description', inputs.description);
      formData.append('price', inputs.price);
      formData.append('location', inputs.location);
      formData.append('published', inputs.published);
      formData.append('coordinates[latitude]', inputs.latitude);
      formData.append('coordinates[longitude]', inputs.longitude);

      const imageUrls = inputs.images.split(',').map(url => url.trim());
      imageUrls.forEach((url, index) => {
        formData.append(`images[${index}]`, url);
      });

      const availableSlots = inputs.availableSlots.split(',').map(timeslot => timeslot.trim());
      availableSlots.forEach((timeslot, index) => {
        formData.append(`availableSlots[${index}]`, timeslot);
      });

      const { data } = await axios.post(`${BASE_URL}/api/v1/admin/create-ground`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (data.success) {
        toast.success("Ground created");
        return data.ground;
      } else {
        toast.error("Something went wrong");
        return rejectWithValue(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Check log.");
      return rejectWithValue(error.message);
    }
  }
);

export const updateGround = createAsyncThunk(
  'ground/updateGround',
  async ({ id, inputs }, { rejectWithValue }) => {
    try {
      const formData = {
        ground_name: inputs.ground_name,
        description: inputs.description,
        price: inputs.price,
        location: inputs.location,
        published: inputs.published,
        coordinates: {
          latitude: inputs.latitude,
          longitude: inputs.longitude
        },
        images: inputs.images.split(',').map(url => url.trim()),
        availableSlots: inputs.availableSlots.split(',').map(timeslot => timeslot.trim())
      };

      const { data } = await axios.put(`${BASE_URL}/api/v1/admin/update-ground/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (data.success) {
        toast.success("Ground updated");
        return data.ground;
      } else {
        toast.error("Something went wrong");
        return rejectWithValue(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Check log.");
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGround = createAsyncThunk(
  'ground/deleteGround',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/v1/admin/delete-ground/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (data.success) {
        toast.success("Ground deleted");
        return id;
      } else {
        toast.error("Failed to delete ground");
        return rejectWithValue(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete ground");
      return rejectWithValue(error.message);
    }
  }
);

const groundSlice = createSlice({
  name: 'ground',
  initialState: {
    grounds: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGround.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGround.fulfilled, (state, action) => {
        state.loading = false;
        state.grounds.push(action.payload);
      })
      .addCase(createGround.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateGround.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGround.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.grounds.findIndex(ground => ground.id === action.payload.id);
        if (index !== -1) {
          state.grounds[index] = action.payload;
        }
      })
      .addCase(updateGround.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteGround.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGround.fulfilled, (state, action) => {
        state.loading = false;
        state.grounds = state.grounds.filter(ground => ground.id !== action.payload);
      })
      .addCase(deleteGround.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default groundSlice.reducer;
