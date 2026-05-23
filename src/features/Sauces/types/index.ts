export interface Sauce {
  sauceId: number;
  name: string;
  active: boolean;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string | null;
  updatedAt?: Date | null;
}