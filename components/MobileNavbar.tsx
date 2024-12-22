import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home2, Category, Save2, Setting } from "iconsax-react"

const menuItems = [
  { id: 1, icon: Home2, label: 'Home', href: '/' },
  { id: 2, icon: Save2, label: 'Save', href: '/favorites' },
  { id: 3, icon: Category, label: 'Category', href: '/category' },
  { id: 4, icon: Setting, label: 'Setting', href: '/settings' },
]

export function MobileNavbar() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className=''>
        <div className="menu flex justify-around items-center p-4">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.id}>
            <div className={`menu_item flex flex-col items-center transition-colors
              ${pathname === item.href ? 'text-[#2D3047]' : 'hover:text-[#2D3047]}'}`}>
              <item.icon 
                variant={pathname === item.href ? 'Bold' : 'Outline'}
                size="26" 
                color={pathname === item.href ? '#2D3047' : '#2D3047'} 
                className="transition-colors"
              />
              <span className={`text-xs mt-1 ${pathname === item.href ? 'font-medium' : ''}`}>
                {item.label}
              </span>
              {pathname === item.href}
            </div>
          </Link>
        ))}
      </div>

      </div>
    </div>
  )
}
