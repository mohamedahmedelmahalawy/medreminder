import React from "react";
import Link from "next/link";
import Image from "next/image";
// import medlogo from "Medlogo.png";

function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className='bg-[#000D44] text-white/90'>
			<div className='mx-auto max-w-screen-xl px-6 sm:px-8 md:px-12 lg:px-16 py-8'>
				<div className='flex flex-col md:flex-row md:justify-between md:items-start gap-10'>
					<div className='flex flex-col space-y-5 max-w-xs'>
						<Link href='/' className='flex items-center gap-3'>
							<Image
								src='/Medlogo.png'
								alt='MedReminder Logo'
								width={100}
								height={90}
								className='h-12 w-12 rounded-xl'
							/>
							<span className='text-xl font-semibold tracking-wide text-white'>
								MedReminder
							</span>
						</Link>
						<p className='text-gray-200 leading-relaxed'>
							Enhancing medical crew schedules & patient safety through smart
							medication management solutions.
						</p>
						<div className='flex gap-2'>
							<Social href='#' label='Facebook' icon='/facebooklogo.svg' />
							<Social href='#' label='Instagram' icon='/instagramlogo.svg' />
							<Social href='#' label='TikTok' icon='/tiktoklogo.svg' />
							<Social href='#' label='X' icon='/twitterlogo.svg' />
						</div>
					</div>
					<div className='space-y-3'>
						<h4 className='text-xl font-semibold tracking-wide text-white'>CARE</h4>
						<ul className='space-y-2 text-gray-200 text-sm md:text-base'>
							<li><span className="text-[12px]">📞</span> +20 127 847 4336</li>
							<li><span className="text-[12px]">📧 </span>MedReminder@gmail.com</li>
							<li><span className="text-[12px]">📍</span> Alexandria, Egypt</li>
						</ul>
					</div>
					<div className='space-y-3 max-w-sm'>
						<h4 className='text-xl font-semibold tracking-wide text-white'>TRUST</h4>
						<p className='text-gray-300 text-sm'>
							Subscribe for the latest updates & insights.
						</p>
						<div className='flex w-full'>
							<input
								id='footer-email'
								type='email'
								placeholder='Enter your email'
								className='flex-1 rounded-l-xl bg-white text-gray-900 placeholder:text-gray-500
                           px-4 py-3 shadow-sm focus:outline-none
                           focus:ring-2 focus:ring-sky-400'
							/>
							<button
								type='button'
								className='rounded-r-xl px-6 py-3 bg-blue-600 text-white font-medium
                           shadow-md hover:bg-blue-700 transition'
							>
								Subscribe
							</button>
						</div>
					</div>
				</div>
				<div className="mt-8 border-t border-white/10 pt-6">
					<p className="text-xs text-gray-400 text-center md:text-right">
						© {year} MedReminder. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

function Social({
	href,
	label,
	icon,
}: {
	href: string;
	label: string;
	icon: string;
}) {
	return (
		<Link
			href={href}
			aria-label={label}
			className='rounded-full bg-white/20 hover:bg-white/30 transition p-2 flex items-center justify-center'
		>
			<img src={icon} alt={label} className='h-4 w-4 md:h-5 md:w-5' />
		</Link>
	);
}

export default Footer;
