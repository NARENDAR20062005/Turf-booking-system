import React from 'react'

const Footer = () => {
	return (
		<div>
			<div className='flex flex-col lg:flex-row bg-gray-900 lg:h-60'>
				<div className='lg:w-1/2 ml-5 lg:ml-12 mt-5 lg:mt-10'>
					<p className='text-white text-2xl font-bold mb-3'>Book-Turf.com</p>
					<p className='text-white mb-5 w-96 lg:w-1/2 text-justify'>Book-Turf.com is an app where you can book grounds to play football and cricket with your friends and loved ones. Book a ground near you today! </p>
				</div>
				<div className='lg:w-1/4 mx-5 lg:ml-48 mt-5 lg:mt-10'>
					<p className='text-white text-lg font-bold mb-3'>Contact</p>
					<p className='text-white'>Email: <span className='text-blue-200 hover:text-blue-400 cursor-pointer'>Book-Turf@gmail.com</span></p>
				</div>
				<div className='lg:w-1/4 mx-5 lg:mr-10 mt-5 lg:mt-10'>
					<p className='text-white text-lg font-bold mb-3'>Links</p>
					<p className='text-blue-200 hover:text-blue-400 cursor-pointer mb-2'>FAQs</p>
					<p className='text-blue-200 hover:text-blue-400 cursor-pointer mb-2'>Facebook</p>
					<p className='text-blue-200 hover:text-blue-400 cursor-pointer mb-2'>Instagram</p>
					<p className='text-blue-200 hover:text-blue-400 cursor-pointer mb-2'>LinkedIn</p>
				</div>
			</div>

			
		</div>
	)
}

export default Footer;