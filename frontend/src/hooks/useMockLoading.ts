import { useEffect, useState } from 'react'

export const useMockLoading = (
  initialLoading: boolean = false,
  delay: number = 5000
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isLoading, setIsLoading] = useState(initialLoading)

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, delay)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [isLoading, delay])
  return [isLoading, setIsLoading] as const
}
