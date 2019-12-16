import { Action as ReduxAction, Store as ReduxStore } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

type AnyFunction = (...args: any[]) => any;
interface StringMap<T> {
  [key: string]: T;
}

export type Action<T extends string = string, P = void> = P extends void
  ? ReduxAction<T>
  : ReduxAction<T> & Readonly<{ payload: P }>;

export type ActionsUnion<A extends StringMap<AnyFunction>> = ReturnType<
  A[keyof A]
>;

export type Store = ReduxStore<{}, Action> & {
  dispatch: Dispatch;
};

export type Dispatch = ThunkDispatch<{}, void, Action>;

export type Actions = Action<any>;

export type DispatchAction<T = void> = ThunkAction<
  Promise<T>,
  {},
  void,
  Action
>;

// interfaces for reducers

export interface ParkingSpot {
  id: string;
  name: string;
  owner: string | null;
  n?: string;
}

export interface AppState {
  user: UserState;
  parkingSpot: ParkingSpotState;
  persons: PersonsState;
}

export interface UserState {
  loggedIn: boolean;
  userName: string;
  currentPage: string;
}

export interface ParkingSpotState {
  parkingSpotList: ParkingSpot [];
  
}

export interface Person {
  id: string;
  name: string;
  email: string;
  parkingSpot: number| null;
  usageStatic: number;
  admin: boolean;
  role: string;

}

export interface PersonNameEmail {
  id: string;
  name: string;
  email: string;
}

export interface PersonsState {
  personList: Person [];
  selectedPersonIndex: number;

}

// interfaces for api

export enum UserRole {
  ADMIN = "admin",
  UNVERIFIED = "unverified",
  VERIFIED = "verified",
  SLACK = "slack",
}

export interface LoginState {
  isAuthenticated: boolean;
  userRole?: UserRole;
  name: string;
}

export interface PasswordLogInData {
  email: string;
  password: string;
}
export interface CreateParkingSpotData {
  name: string;
  user: string | null;
  created: string;
  updated: string;
}
