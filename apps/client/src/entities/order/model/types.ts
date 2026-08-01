import { Product } from "@/entities/product";

enum OrderStatus {
  DECLINED,
  PAID,
  SHIPPING,
}

enum ShippingMethod {
  FREE_SHIPPING,
  EXPRESS_SHIPPING,
  PICK_UP,
}

export interface Order {
  shipping: ShippingMethod;
  id: number;
  userId: number | null;
  status: OrderStatus;
  createdAt: Date;
  items: {
    productId: number;
    quantity: number;
    priceAtPurchase: number;
    id: number;
    orderId: number;
    product: Omit<Product, "comments">;
  }[];
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    id: number;
    orderId: number;
  } | null;
  address: {
    country: string;
    city: string;
    street: string;
    zip: string;
    id: number;
    orderId: number;
  } | null;
}
