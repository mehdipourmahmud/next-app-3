import { footerLinks } from '@/constants';
import Link from 'next/link';
import Image from 'next/image'; // Make sure to import the Image component from 'next/image'
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-light-white mx-auto max-w-8xl sm:px-6 lg:p-6'>
      <div className='py-5'>
        <Image src='/logo-purple.svg' height={100} width={100} alt='logo' />
        <p className='text-start text-sm font-normal mt-5 max-w-xs'>
        Flexibble is the world&apos;s leading community for creatives to share, grow, and get hired.

        </p>
      </div>
      <div className='mt-10' >
        {/* Mapping over the footerLinks array */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {footerLinks.map((linkGroup) => (
            <ul key={linkGroup.title}>
              {/* Displaying the main title link */}
              <li>
                <Link href={linkGroup.links[0]} className='block font-bold text-left sm:mb-5'>
                  {/* Assuming the first link is the main link */}
                  {linkGroup.title}
                </Link>
              </li>
              {/* Displaying sublinks if available */}
              {linkGroup.links.slice(1).map((sublink, index) => (
                <li key={index} className='text-left'>
                  <Link href={sublink}>
                    {sublink}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
