export interface Profile {
  id: number;
  name: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    email: string;
  };
}
