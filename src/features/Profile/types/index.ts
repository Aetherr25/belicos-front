export interface ProfileResponse {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  currentPassword?: string;
  newPassword?: string;
}