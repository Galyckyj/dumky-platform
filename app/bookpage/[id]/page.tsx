'use client'

import { useParams } from 'next/navigation'
import { books } from '@/constants/books'
import { BackButton } from '@/components/BackButton'

export default function BookPage() {
  const { id } = useParams()
  const book = books.find(b => b.id === Number(id))

  if (!book) {
    return <div><BackButton/><div>Книгу не знайдено</div></div>
  }

  return (
    <div className="p-4 md:p-8">
      <div><BackButton/></div>

      <h1 className="text-2xl font-bold md:text-3xl lg:text-[60px]">{book.title}</h1>
      <div className="my-10 flex flex-col md:flex-row gap-4 md:gap-8">
        <img 
          src={book.image} 
          alt={book.title}
          className="rounded-xl shadow-lg w-full md:w-auto"
          width={300}
          height={450}
        />
        <div className="flex flex-col gap-4">
          <div className="text-xl font-semibold md:text-2xl">{book.title}</div>
          <div className="text-lg text-gray-600 md:text-xl">{book.author}</div>
          <p className="text-gray-700">{book.description}</p>
          <div className="flex items-center gap-2">
            <span className="font-medium">Рейтинг:</span>
            <span>{book.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Ціна:</span>
            <span>{book.price} грн</span>
          </div>
        </div>
      </div>
    </div>
  )
}