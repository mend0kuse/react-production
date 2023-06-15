import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page/Page';

const AdminPanelPage: FC = () => {
	const { t } = useTranslation('admin-panel');
	return <Page>{t('Admin panel')}</Page>;
};

export default AdminPanelPage;
