import { API_ENDPOINTS } from "@/constants/api";
import { apiRequest, type ApiResponse } from "../apiClient";

export type TicketPayload = Record<string, unknown>;

export const ticketsApi = {
  list: (): Promise<ApiResponse> => apiRequest(API_ENDPOINTS.TICKETS.LIST),

  create: (payload: TicketPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.TICKETS.CREATE, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getById: (ticketId: string): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.TICKETS.GET(ticketId)),

  updatePut: (ticketId: string, payload: TicketPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.TICKETS.GET(ticketId), {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  updatePatch: (ticketId: string, payload: TicketPayload): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.TICKETS.GET(ticketId), {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  deleteById: (ticketId: string): Promise<ApiResponse> =>
    apiRequest(API_ENDPOINTS.TICKETS.GET(ticketId), {
      method: "DELETE",
    }),
};

