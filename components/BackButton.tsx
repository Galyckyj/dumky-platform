'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft2 } from 'iconsax-react'

export function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center mb-10 gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
    >
      <ArrowLeft2 
        size={24}
        color='#333'
        className="transition-transform group-hover:-translate-x-1"
      />
      <span>Назад</span>
    </button>
  )
}