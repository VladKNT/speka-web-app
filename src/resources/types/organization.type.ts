export interface IOrganization {
  id: string;
  name: string;
  email: string;
  createdAt: number;
  contactNumber: string;
  logoUrl: string | null;
  updatedAt: number | null;
  deletedAt: number | null;
}
