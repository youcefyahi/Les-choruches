export interface Admin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
}