import { useAppDispatch } from 'app/providers/StoreProvider';
import { ArticleList, type ArticleView } from 'enteties/Article';
import { ArticleCategories, getChosenCategory } from 'features/ArticleCategories';
import { ArticleSortFields, getArticleSort, getArticleSortOrder } from 'features/ArticleSortFields';
import { ArticlesSearch, getArticlesSearchQ } from 'features/ArticlesSearch';
import { ToggleArticlesView } from 'features/ToggleArticlesView';
import { useDebounce } from 'shared/hooks/useDebounce';
import { type ReducersList, useDinamycModuleLoader } from 'shared/hooks/useDinamycModuleLoader';
import { useInititalEffect } from 'shared/hooks/useInititalEffect';
import cn from 'shared/lib/classNames/cn';
import { Page } from 'widgets/Page/Page';

import { type FC, memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
	getArticlesHasMore,
	getArticlesInited,
	getArticlesLoading,
	getArticlesPage,
	getArticlesView,
} from '../model/selectors/articlesSelectors';
import { articlesActions, articlesReducer, getArticles } from '../model/slices/articlesSlice';
import { fetchArticles } from '../services/fetchArticles';
import styles from './ArticlesPage.module.scss';

interface ArticlePageProps {
	className?: string;
}

const reducers: ReducersList = {
	articles: articlesReducer,
};

const ArticlesPage: FC<ArticlePageProps> = (props) => {
	const { className } = props;

	useDinamycModuleLoader(reducers, false);

	const dispatch = useAppDispatch();

	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesLoading);
	const view = useSelector(getArticlesView);
	const page = useSelector(getArticlesPage);
	const hasMore = useSelector(getArticlesHasMore);
	const inited = useSelector(getArticlesInited);

	const sortKey = useSelector(getArticleSort);
	const order = useSelector(getArticleSortOrder);
	const search = useSelector(getArticlesSearchQ);
	const category = useSelector(getChosenCategory);

	useInititalEffect(() => {
		if (!inited) {
			dispatch(articlesActions.init());
			dispatch(fetchArticles({}));
		}
	});

	/* Fetch Logic */
	const fetchWithReplace = useCallback(() => {
		dispatch(fetchArticles({ replace: true }));
	}, [dispatch]);

	const fetchDataWithDebounce = useDebounce(fetchWithReplace, 500);

	const nextPageFetch = useCallback(() => {
		if (!isLoading && hasMore) {
			dispatch(articlesActions.setPage(page + 1));
			dispatch(fetchArticles({}));
		}
	}, [dispatch, hasMore, isLoading, page]);

	/* Observe filters change */
	useEffect(() => {
		dispatch(articlesActions.setPage(1));
		fetchWithReplace();
	}, [dispatch, fetchWithReplace, order, sortKey, category]);

	useEffect(() => {
		dispatch(articlesActions.setPage(1));
		fetchDataWithDebounce();
	}, [dispatch, fetchDataWithDebounce, search]);

	/* Handlers */
	const viewClickHandler = (view: ArticleView) => {
		dispatch(articlesActions.setView(view));
	};

	return (
		<Page onScrollEnd={nextPageFetch}>
			<div className={cn(styles.articlesPage, {}, className)}>
				<div className={styles.header}>
					<ArticleSortFields />
					<ToggleArticlesView onClick={viewClickHandler} selected={view} />
				</div>
				<ArticlesSearch />
				<ArticleCategories />
				<ArticleList articles={articles} view={view} isLoading={isLoading} />
			</div>
		</Page>
	);
};

export default memo(ArticlesPage);