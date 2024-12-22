import { Book } from '@/types/book'
import Link from 'next/link'

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/bookpage/${book.id}`}>
      <div className="embla__slide book_slide flex flex-col items-center flex-shrink-0 w-[130px] md:w-auto">
        <div>
          <img 
            className='rounded-xl shadow-gray-400 shadow-lg' 
            src={book.image} 
            alt={book.title} 
            width={130} 
            height={230} 
          />
        </div>
        <div className='my-4 flex flex-col items-center w-[130px]'>
          <p className='text-xl font-medium truncate w-full text-center'>
            {book.title}
          </p>
          <p className='text-gray-400 truncate w-full text-center'>
            {book.author}
          </p>
        </div>
      </div>
    </Link>
  )
}
