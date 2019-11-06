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

export interface AppState {
  user: UserState;
}

export interface UserState {
  loggedIn: boolean;
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
  name?: string;
}
