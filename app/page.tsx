'use client'
import { Header } from '@/components/Header'
import { BookCarousel } from '@/components/BookCarousel'
import { Feedback } from '@/components/Feedback'
import { MessageList } from '@/components/Coments'
import { books } from '@/constants/books' // Перемістіть масив книг у окремий файл
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="popular my-11">
        <div className='titleh flex justify-between items-center'>
          <h2 className='font-semibold text-xl'>Популярні книги</h2>
          <Link href='/popular'>Більше</Link>
        </div>
        <BookCarousel books={books} />
      </div>
      <Feedback />
      </div>
  )
}
