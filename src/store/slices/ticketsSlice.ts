import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ticketsApi, type TicketPayload } from "../services/ticketsApi";
import type { ApiResponse } from "../apiClient";

type RequestState = "idle" | "loading" | "succeeded" | "failed";

type TicketsState = {
  status: RequestState;
  error: string | null;
  message: string | null;
  data: unknown;
};

const initialState: TicketsState = {
  status: "idle",
  error: null,
  message: null,
  data: null,
};

const runTicketRequest = async (request: Promise<ApiResponse>, rejectWithValue: (value: string) => unknown) => {
  const result = await request;
  if (!result.success) {
    return rejectWithValue(result.message ?? "Request failed");
  }
  return result;
};

export const fetchTickets = createAsyncThunk("tickets/fetch", async (_, { rejectWithValue }) =>
  runTicketRequest(ticketsApi.list(), rejectWithValue),
);

export const createTicket = createAsyncThunk(
  "tickets/create",
  async (payload: TicketPayload, { rejectWithValue }) => runTicketRequest(ticketsApi.create(payload), rejectWithValue),
);

export const getTicketById = createAsyncThunk("tickets/getById", async (ticketId: string, { rejectWithValue }) =>
  runTicketRequest(ticketsApi.getById(ticketId), rejectWithValue),
);

export const updateTicketPut = createAsyncThunk(
  "tickets/updatePut",
  async ({ ticketId, payload }: { ticketId: string; payload: TicketPayload }, { rejectWithValue }) =>
    runTicketRequest(ticketsApi.updatePut(ticketId, payload), rejectWithValue),
);

export const updateTicketPatch = createAsyncThunk(
  "tickets/updatePatch",
  async ({ ticketId, payload }: { ticketId: string; payload: TicketPayload }, { rejectWithValue }) =>
    runTicketRequest(ticketsApi.updatePatch(ticketId, payload), rejectWithValue),
);

export const deleteTicketById = createAsyncThunk("tickets/deleteById", async (ticketId: string, { rejectWithValue }) =>
  runTicketRequest(ticketsApi.deleteById(ticketId), rejectWithValue),
);

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearTicketsState: (state) => {
      state.status = "idle";
      state.error = null;
      state.message = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => action.type.startsWith("tickets/") && action.type.endsWith("/pending"), (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addMatcher((action) => action.type.startsWith("tickets/") && action.type.endsWith("/fulfilled"), (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message ?? null;
        state.data = action.payload.data ?? null;
      })
      .addMatcher((action) => action.type.startsWith("tickets/") && action.type.endsWith("/rejected"), (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? action.error.message ?? "Request failed";
      });
  },
});

export const { clearTicketsState } = ticketsSlice.actions;
export default ticketsSlice.reducer;

