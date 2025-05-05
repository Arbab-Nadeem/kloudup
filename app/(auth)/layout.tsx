import Image from 'next/image';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='flex min-h-screen'>
			<section className='hidden w-1/2 lg:flex justify-center items-center bg-brand p-10 xl:w-2/5'>
				<div className='flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12'>
					<Image
						src='/logo.svg'
						width={160}
						height={70}
						alt='logo'
						className='h-auto'
					/>
					<div className='space-y-5 text-white'>
						<h1 className='h1'>Manage All of your files in best way</h1>
						<p className='body-1'>
							This is a place where you can all of your files
						</p>
					</div>
					<Image
						src='/images/files.png'
						alt='Files'
						width={342}
						height={342}
						className='transition-all hover:rotate-2 scale-105'
					/>
				</div>
			</section>
			<section className='flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0'>
				<div className='mb-16 lg:hidden'>
					<Image
						src='/icons/logo-full-brand.svg'
						width={224}
						height={82}
						alt='logo'
						className='h-auto w-[200px] lg:w-[250px]'
					/>
				</div>
				{children}
			</section>
		</div>
	);
};

export default layout;
