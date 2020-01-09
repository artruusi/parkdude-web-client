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
  owner?: IPerson | null;
 
}

export interface AppState {
  user: UserState;
  parkingSpot: ParkingSpotState;
  persons: PersonsState;
  reservations: ReservationsState;
}

export interface UserState {
  loggedIn: boolean;
  userName: string;
  currentPage: string;
}

export interface ParkingSpotState {
  parkingSpotList: ParkingSpot [];
  snackBarMessage: string;
  
}

export interface IPerson {
  id: string;
  name: string;
  email: string;
  parkingSpot: number| null;
  admin: boolean;
  role: string;
  sessions: string [];
  reservationCount: number;
  ownedParkingSpots: ParkingSpot [];
  isEmailValidated?: boolean;

}

export interface PersonNameEmail {
  id: string;
  name: string;
  email: string;
}

export interface PersonsState {
  personList: IPerson [];
  selectedPerson: IPerson;
  snackBarMessage: string;

}

export interface ReservationsState {
  reservations: Reservation [];
  userReservations: UserReservations [];
}
export interface UserReservations {
  date: string;
  parkingSpot: ParkingSpot;

}
export interface Reservation {
  date: string;
  spacesReservedByUser: ParkingSpot [];

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
  ownerEmail: string | undefined;
}

export interface ModifyUserData {
  email: string;
  name: string;
  role: string;
}
