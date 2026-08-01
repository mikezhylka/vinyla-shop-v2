import { z } from "zod";

export const createOrderFormSchema = (isPickUp: boolean) =>
  z.object({
    contact: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      phone: z.string().min(1, "Phone is required"),
      email: z.string().email("Invalid email").min(1, "Email is required"),
    }),
    address: isPickUp
      ? z
          .object({
            country: z.string().optional(),
            city: z.string().optional(),
            street: z.string().optional(),
            zip: z.string().optional(),
          })
          .optional()
      : z.object({
          country: z.string().min(1, "Country is required"),
          city: z.string().min(1, "City is required"),
          street: z.string().min(1, "Street is required"),
          zip: z.string().min(1, "ZIP code is required"),
        }),
  });

export type OrderFormValues = {
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  address?: {
    country?: string;
    city?: string;
    street?: string;
    zip?: string;
  };
};

export const defaultOrderFormValues: OrderFormValues = {
  contact: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  },
  address: {
    country: "",
    city: "",
    street: "",
    zip: "",
  },
};
