'use client';

import { navItems } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	fullName: string;
	avatar: string;
	email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
	const pathname = usePathname();

	return (
		<aside className='sidebar'>
			<Link href='/'>
				<Image
					src='/icons/logo-full-brand.svg'
					width={160}
					height={150}
					alt='Logo'
					className='hidden h-auto lg:block'
				/>
				<Image
					src='/icons/logo-brand.svg'
					width={52}
					height={52}
					alt='Logo'
					className='lg:hidden'
				/>
			</Link>
			<nav className='sidebar-nav'>
				<ul className='flex flex-1 flex-col gap-6'>
					{navItems.map(({ url, name, icon }) => (
						<Link href={url} key={url} className='lg:w-full'>
							<li
								className={cn(
									'sidebar-nav-item',
									pathname === url && 'shad-active'
								)}
							>
								<Image
									src={icon}
									alt={name}
									width={24}
									height={24}
									className={cn(
										'nav-icon',
										pathname === url && 'nav-icon-active'
									)}
								/>
								<p className='hidden lg:block'>{name}</p>
							</li>
						</Link>
					))}
				</ul>
			</nav>
			<Image
				src='/images/files-2.png'
				alt='Logo'
				width={506}
				height={418}
				className='w-full'
			/>
			<div className='sidebar-user-info'>
				<Image
					src={avatar}
					alt='Profile'
					width={44}
					height={44}
					className='sidebar-user-avatar'
				/>
				<div className='hidden lg:block'>
					<p className='subtitle-2 capitalize'>{fullName}</p>
					<p className='caption'>{email}</p>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
