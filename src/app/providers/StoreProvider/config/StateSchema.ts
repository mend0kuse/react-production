import { type CounterSchema } from 'enteties/Counter';
import { type ProfileSchema } from 'enteties/Profile';
import { type UserSchema } from 'enteties/User';
import { type LoginSchema } from 'features/AuthByUserName';

import {
	type AnyAction,
	type CombinedState,
	type Reducer,
	type ReducersMapObject,
} from '@reduxjs/toolkit';
import { type ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;

	// Async
	profile?: ProfileSchema;
	login?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
	reducerManager: ReducerManager;
}

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (
		state: StateSchema,
		action: AnyAction,
	) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}
