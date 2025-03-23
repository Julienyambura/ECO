import api from "./api";
import type { RecyclingLocation } from "../types";

export const locationService = {
  getLocations: async (): Promise<RecyclingLocation[]> => {
    const response = await api.get<RecyclingLocation[]>("/locations");
    return response.data;
  },

  getLocationById: async (id: string): Promise<RecyclingLocation> => {
    const response = await api.get<RecyclingLocation>(`/locations/${id}`);
    return response.data;
  },

  createLocation: async (
    location: Omit<RecyclingLocation, "_id" | "createdAt" | "updatedAt">
  ): Promise<RecyclingLocation> => {
    const response = await api.post<RecyclingLocation>("/locations", location);
    return response.data;
  },

  updateLocation: async (
    id: string,
    data: Partial<RecyclingLocation>
  ): Promise<RecyclingLocation> => {
    const response = await api.patch<RecyclingLocation>(
      `/locations/${id}`,
      data
    );
    return response.data;
  },

  deleteLocation: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.delete<{ success: boolean }>(`/locations/${id}`);
    return response.data;
  },
};
