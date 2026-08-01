type Rate = 1 | 2 | 3 | 4 | 5;

export type Comment = {
  id: number;
  rate: Rate;
  description: string;
  createdAt: Date;
  profileId: number;
  parentId: number | null;
  replies?: Pick<Comment, "id" | "profile" | "description" | "createdAt">[];
  profile: {
    id: number;
    name: string;
    userId: number;
  };
};
import { Genre } from "@/entities/genre";

export type Product = {
  id: number;
  name: string;
  description: string;
  label: string;
  barcode: string;
  photo: string;
  genres: Genre[];
  price: number;
  comments: Comment[];
};

export type CartProduct = Product & {
  quantity: number;
};
