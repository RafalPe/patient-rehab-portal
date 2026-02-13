export type ExerciseStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type ISODateString = string & { readonly __brand: "ISODateString" };

export interface Exercise {
  id: string;
  deviceName: string;
  params: string;
  status: ExerciseStatus;
  startedAt?: ISODateString;
  completedAt?: ISODateString;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}
