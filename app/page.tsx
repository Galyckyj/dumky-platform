'use client'
import { Layout } from '@/components/layouts/Layout'
import { Header } from '@/components/Header'
import { BookCarousel } from '@/components/BookCarousel'
import { TextareaWithButton } from '@/components/Feedback'
import { MessageList } from '@/components/Coments'
import { books } from '@/constants/books' // Перемістіть масив книг у окремий файл
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <Header />
      <div className="popular my-11">
        <div className='titleh flex justify-between items-center'>
          <h2 className='font-semibold text-xl'>Popular Books</h2>
          <Link href='/popular'>All</Link>
        </div>
        <BookCarousel books={books} />
      </div>
      <TextareaWithButton />
      {/* <MessageList /> */}
    </Layout>
  )
}
