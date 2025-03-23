import { Key } from "react";

export type RecyclingLocation = {
  _id: Key | null | undefined;
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website?: string;
  hours: string;
  acceptedItems: string[];
  position: [number, number];
  createdAt: string;
  updatedAt: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isHandled: boolean;
  createdAt: string;
};

export type User = {
  id: string;
  name?: string;
  email: string;
  role: "admin" | "user";
};

export type ApiResponse<T> = {
  success?: boolean;
  error?: string;
  data?: T;
};
