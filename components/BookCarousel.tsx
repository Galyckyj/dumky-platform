import useEmblaCarousel from 'embla-carousel-react'
import { BookCard } from './BookCard'
import { useEffect } from 'react'
import { Book } from '@/types/book'

export function BookCarousel({ books }: { books: Book[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
  })

  return (
    <div className='embla book_carousel my-7 overflow-hidden' ref={emblaRef}>
      <div className="embla__container book_slider flex gap-4 md:gap-8">
        {books.map((book) => (
          <BookCard 
            key={book.id}
            book={book}
          />
        ))}
      </div>
    </div>
  )
}
