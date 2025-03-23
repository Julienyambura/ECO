import api from "./api";
import type { ContactSubmission } from "../types";

export type ContactFormData = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export const contactService = {
  submitContactForm: async (
    data: ContactFormData
  ): Promise<{ success: boolean; id: string }> => {
    const response = await api.post<{ success: boolean; id: string }>(
      "/contact",
      data
    );
    return response.data;
  },

  getSubmissions: async (): Promise<ContactSubmission[]> => {
    const response = await api.get<ContactSubmission[]>("/contact/submissions");
    return response.data;
  },

  markAsHandled: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.patch<{ success: boolean }>(
      `/contact/submissions/${id}`
    );
    return response.data;
  },
};
