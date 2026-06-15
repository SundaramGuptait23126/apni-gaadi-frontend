import React from 'react';
import Link from 'next/link';
import { MdAutoAwesome, MdOutlineDirectionsCar, MdVpnKey, MdArticle } from 'react-icons/md';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-between items-center px-6 py-2">
        <Link href="/" className="flex flex-col items-center gap-1 text-[#eb512c] w-16">
          <MdAutoAwesome className="text-2xl" />
          <span className="text-[10px] font-semibold tracking-wide">Find Cars</span>
        </Link>
        
        <Link href="#" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors w-16">
          <MdOutlineDirectionsCar className="text-2xl" />
          <span className="text-[10px] font-medium">New</span>
        </Link>
        
        <Link href="#" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors w-16">
          <MdVpnKey className="text-2xl" />
          <span className="text-[10px] font-medium">Used</span>
        </Link>
        
        <Link href="#" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors w-16">
          <MdArticle className="text-2xl" />
          <span className="text-[10px] font-medium">News</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
