'use client'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function usePullToRefresh() {
  const router = useRouter()

  const handleRefresh = useCallback(() => {
    router.refresh()
  }, [router])

  useEffect(() => {
    if ('standalone' in window.navigator && window.navigator.standalone) {
      let touchStartY = 0
      
      const touchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY
      }

      const touchMove = (e: TouchEvent) => {
        const touchY = e.touches[0].clientY
        const touchDiff = touchY - touchStartY
        
        if (touchDiff > 100 && window.scrollY === 0) {
          handleRefresh()
        }
      }

      document.addEventListener('touchstart', touchStart)
      document.addEventListener('touchmove', touchMove)

      return () => {
        document.removeEventListener('touchstart', touchStart)
        document.removeEventListener('touchmove', touchMove)
      }
    }
  }, [handleRefresh])
}