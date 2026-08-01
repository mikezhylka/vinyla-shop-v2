export * from "./schemas/comment.schema";
export * from "./schemas/user.schema";

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

export interface ClientProfile {
  id: number;
  name: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    email: string;
  };
}

export type CreateUserPayload = Omit<User, "id" | "createdAt">;

export interface CartItemResponse {
  cartItemId: number;
  productId: number;
  quantity: number;
  name: string;
  price: number;
  photo: string;
}
