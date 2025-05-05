import Image from 'next/image';
import { Button } from './ui/button';
import Search from './Search';
import FileUploader from './FileUploader';
import { logOutUser } from '@/lib/actions/user.actions';

const Header = ({
	userId,
	accountId,
}: {
	accountId: string;
	userId: string;
}) => {
	return (
		<header className='header'>
			<Search />
			<div className='header-wrapper'>
				<FileUploader ownerId={userId} accountId={accountId} />
				<form
					action={async () => {
						'use server';
						await logOutUser();
					}}
				>
					<Button type='submit' className='sign-out-button'>
						<Image
							src='/icons/logout.svg'
							width={24}
							height={24}
							alt='logo'
							className='w-6'
						/>
					</Button>
				</form>
			</div>
		</header>
	);
};

export default Header;
