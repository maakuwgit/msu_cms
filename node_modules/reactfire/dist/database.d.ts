import firebase from 'firebase/app';
import { QueryChange } from 'rxfire/database';
import { ReactFireOptions, ObservableStatus } from './';
/**
 * Subscribe to a Realtime Database object
 *
 * @param ref - Reference to the DB object you want to listen to
 * @param options
 */
export declare function useDatabaseObject<T = unknown>(ref: firebase.database.Reference, options?: ReactFireOptions<T>): ObservableStatus<QueryChange | T>;
export declare function useDatabaseObjectData<T>(ref: firebase.database.Reference, options?: ReactFireOptions<T>): ObservableStatus<T>;
/**
 * Subscribe to a Realtime Database list
 *
 * @param ref - Reference to the DB List you want to listen to
 * @param options
 */
export declare function useDatabaseList<T = {
    [key: string]: unknown;
}>(ref: firebase.database.Reference | firebase.database.Query, options?: ReactFireOptions<T[]>): ObservableStatus<QueryChange[] | T[]>;
export declare function useDatabaseListData<T = {
    [key: string]: unknown;
}>(ref: firebase.database.Reference | firebase.database.Query, options?: ReactFireOptions<T[]>): ObservableStatus<T[]>;
