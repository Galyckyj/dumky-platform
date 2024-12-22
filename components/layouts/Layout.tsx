import { Sidebar } from '../Sidebar'
import { MobileNavbar } from '../MobileNavbar'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen'>
      <div className='flex flex-col md:flex-row font-mono'>
        <Sidebar />
        <div className='main_content flex-1 p-4 md:p-14 w-full overflow-x-hidden pb-24 md:pb-0'>
          {children}
        </div>
      </div>
      <MobileNavbar />
    </div>
  )
}
