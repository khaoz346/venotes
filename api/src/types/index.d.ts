export interface User {
  id: number;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}
