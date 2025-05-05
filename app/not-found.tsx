import Link from 'next/link';
import React from 'react';

const NotFound = () => {
	return (
		<main className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white'>
			<h1 className='text-9xl font-extrabold text-gray-300 drop-shadow-lg'>
				404
			</h1>



			<p className='mt-4 text-xl text-gray-400'>
				Oops! The page you’re looking for doesn’t exist.
			</p>
			<Link
				href='/'
				className='mt-6 px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105'
			>
				🏠 Go Home
			</Link>
			<p className='mt-4 text-gray-500 text-sm'>
				Or check if the URL is correct.
			</p>
		</main>
	);
};

export default NotFound;
