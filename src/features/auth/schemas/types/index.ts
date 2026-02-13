export type AuthActionState = {
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
    form?: string;
  };
};
