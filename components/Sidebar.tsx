import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from 'react';
import { Home2, Category, Save2, Setting, ArrowRight2 } from "iconsax-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo } from 'react'

import { books } from "@/constants/books";
import { Book } from "@/types/book";


const menuItems = [
  { id: 1, icon: Home2, label: 'Головна', href: '/' },
  { id: 2, icon: Save2, label: 'Збереження', href: '/favorites' },
  { id: 3, icon: Category, label: 'Категорії', href: '/category' },
  { id: 4, icon: Setting, label: 'Налаштування', href: '/settings' },
]

export const Sidebar = memo(() => {
  const pathname = usePathname();
  const [bookOfDay, setBookOfDay] = useState<Book | null>(null);

  useEffect(() => {
    const getRandomBook = () => {
      const randomIndex = Math.floor(Math.random() * books.length);
      return books[randomIndex];
    };
    setBookOfDay(getRandomBook());
  }, []);

  
  return (
    <div className="hidden md:block bg-[#f4f4f6] max-w-96 p-12 min-h-screen flex-shrink-0">
      <div className="header_profile flex">
        <div className="profile flex justify-between items-center gap-5">
          <Avatar className='w-14 h-14'>
            <AvatarImage src="https://github.com/shadcn.png"/>
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
          <div className="profile_inf text-[#353535]">
            <div className="profile_name font-mono font-bold">John Doe</div>
            <div className="profile_email font-mono text-gray-400">simplemail@gmail.com</div>
          </div>
        </div>
      </div>

      <div className="menu flex flex-col bg-white rounded-2xl divide-y my-16">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.id}>
            <div className={`menu_item flex gap-5 p-3 items-center justify-between transition-colors cursor-pointer
              ${pathname === item.href ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
              <div className='flex gap-5 p-1 items-center group'>
                <div className="menu_item_icon transition-colors">
                  <item.icon 
                    variant={pathname === item.href ? 'Bold' : 'Outline'}
                    size="26" 
                    color={pathname === item.href ? '#2D3047' : '#2D3047'} 
                    className="group-hover:text-[#2D3047]"
                  />
                </div>
                <div className={`menu_item_text transition-colors
                  ${pathname === item.href ? 'text-[#2D3047] font-medium' : 'group-hover:text-[#2a2637]'}`}>
                  {item.label}
                </div>
              </div>
              <ArrowRight2 
                size="18" 
                color={pathname === item.href ? '#2D3047' : '#2D3047'} 
                className={`transition-transform duration-200
                  ${pathname === item.href ? 'translate-x-1' : ''} 
                  group-hover:text-blue-600`}
              />
            </div>
          </Link>
        ))}
      </div>

        <div className="book_reading">
          <div className='text-gray-400 text-center'>Сьогоднішня книга дня</div>
          {bookOfDay && (
          <div className="flex gap-4 my-10 bg-white p-4 shadow-sm rounded-xl items-center">
            <div className="w-[600px]"><img className="rounded-xl" src={bookOfDay.image} alt={bookOfDay.title} /></div>
            <div className="flex flex-col gap-2">
              <div className="text-base font-semibold text-[#2D3047]">{bookOfDay.title}</div>
              <div className="text-sm text-gray-500">{bookOfDay.description}</div>
            </div>
          </div>
        )}

        </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';
