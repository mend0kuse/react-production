import { LangSwitcher } from 'features/LangSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import cn from 'shared/lib/classNames/cn';
import { SidebarItemsList } from 'widgets/Sidebar/model/items';

import {
	type FC,
	type HTMLAttributes,
	memo,
	useCallback,
	useState,
} from 'react';

import { SidebarHamburger } from '../SidebarHamburger/SidebarHamburger';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import styles from './Sidebar.module.scss';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> { }

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	const [collapsed, setCollapsed] = useState(false);

	const onToggle = useCallback(() => {
		setCollapsed((prev) => !prev);
	}, []);

	return (
		<aside
			data-testid='Sidebar'
			className={cn(
				styles.Sidebar,
				{ [styles.collapsed]: collapsed },
				className,
			)}
		>
			{/* hamburger */}
			<SidebarHamburger onToggle={onToggle} collapsed={collapsed} />

			{/* Links */}
			<nav className={styles.links}>
				{SidebarItemsList.map((item) => (
					<SidebarItem
						key={item.path}
						collapsed={collapsed}
						item={item}
					/>
				))}
			</nav>

			{/* switchers */}
			<div className={styles.swithers}>
				<ThemeSwitcher />
				<LangSwitcher short={collapsed} />
			</div>
		</aside>
	);
});

Sidebar.displayName = 'Sidebar';
