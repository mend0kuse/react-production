import { type AxiosInstance } from 'axios';
import { type ArticleSchema } from 'enteties/Article';
import { type CounterSchema } from 'enteties/Counter';
import { type UserSchema } from 'enteties/User';
import { type LoginSchema } from 'features/AuthByUserName';
import { type ProfileSchema } from 'features/EditableProfileCard';

import { type AnyAction, type CombinedState, type Reducer, type ReducersMapObject } from '@reduxjs/toolkit';
import { type ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

import { type ArticleDetailsCommentsSchema } from './../../../../pages/articleDetails/model/types/articleDetails';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;

	// Async
	profile?: ProfileSchema;
	login?: LoginSchema;
	articleDetails?: ArticleSchema;
	articleDetailsComments?: ArticleDetailsCommentsSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
	reducerManager: ReducerManager;
}

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface AsyncThunkExtra {
	api: AxiosInstance;
}

export interface AsyncThunkConfig<T> {
	extra: AsyncThunkExtra;
	rejectValue: T;
	state: StateSchema;
}
