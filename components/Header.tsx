import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchNormal } from "iconsax-react"

export function Header() {
  return (
    <div className='header flex flex-col justify-between md:flex-row md:items-center gap-10 md:gap-8'>
      <div className='font-bold text-3xl md:text-[60px]'>Explore</div>
      <div className="flex w-full md:max-w-md items-center space-x-2">
        <Input 
          type="text" 
          placeholder="Find the book" 
          className="h-10 md:h-12"
        />
        <Button 
          type="submit" 
          className="h-10 md:h-12 px-3 md:px-4"
        >
          <SearchNormal size="24" color="#fff"/>
        </Button>
      </div>
    </div>
  )
}
