export type AuthActionState = {
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
    firstName?: string[];
    lastName?: string[];
    confirmPassword?: string[];
    form?: string;
  };
};
