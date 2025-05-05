'use client';

import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Separator } from './ui/separator';
import { navItems } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';
import FileUploader from './FileUploader';
import { logOutUser } from '@/lib/actions/user.actions';

interface Props {
	fullName: string;
	avatar: string;
	email: string;
	$id: string;
	accountId: string;
}

const MobileNavigation = ({
	fullName,
	avatar,
	email,
	$id: ownerId,
	accountId,
}: Props) => {
	const [open, setOpen] = useState(false);

	const pathname = usePathname();
	return (
		<header className='mobile-header'>
			<Image
				src='/icons/logo-full-brand.svg'
				alt='Logo'
				width={120}
				height={52}
				className='h-auto'
			/>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger>
					<Image
						src='/icons/menu.svg'
						alt='Menu'
						width={28}
						height={28}
						className='h-auto'
					/>
				</SheetTrigger>
				<SheetContent className='shad-sheet h-screen px-3'>
					<SheetTitle>
						<div className='header-user'>
							<Image
								src={avatar}
								alt='Avatar'
								width={44}
								height={44}
								className='header-user-avatar'
							/>
							<div className='sm:hidden lg:block'>
								<p className='subtitle-2 capitalize'>{fullName}</p>
								<p className='caption'>{email}</p>
							</div>
						</div>
						<Separator className='mb-4 bg-light-200/20' />
					</SheetTitle>
					<nav className='mobile-nav'>
						<ul className='mobile-nav-list'>
							{navItems.map(({ url, name, icon }) => (
								<Link href={url} key={url} className='lg:w-full'>
									<li
										className={cn(
											'mobile-nav-item',
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
										<p>{name}</p>
									</li>
								</Link>
							))}
						</ul>
					</nav>
					<Separator className='my-5 bg-light-200/20' />
					<div className='flex flex-col justify-between gap-5 pb-5'>
						<FileUploader accountId={accountId} ownerId={ownerId} />
					</div>
					<Button
						type='submit'
						className='mobile-sign-out-button'
						onClick={async () => await logOutUser()}
					>
						<Image src='/icons/logout.svg' width={24} height={24} alt='logo' />
						<p>Logout</p>
					</Button>
				</SheetContent>
			</Sheet>
		</header>
	);
};

export default MobileNavigation;
