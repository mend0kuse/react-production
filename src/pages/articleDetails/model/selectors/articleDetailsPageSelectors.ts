import { type StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { getArticleData } from 'entities/Article';
import { getUserAuthData } from 'entities/User';

import { createSelector } from '@reduxjs/toolkit';

export const getArticleCommentsError = (state: StateSchema) => state.articleDetailsPage?.comments?.error;
export const getArticleCommentsisLoading = (state: StateSchema) => state.articleDetailsPage?.comments?.isLoading;

export const getCanEditArticle = createSelector(getUserAuthData, getArticleData, (user, article) => {
	return user?.id === article?.user.id;
});
