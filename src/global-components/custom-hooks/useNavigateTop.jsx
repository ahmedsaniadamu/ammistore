import { useLayoutEffect } from 'react'

// a custom hook that navigate a user back to top on initial render
export const useNavigateTop = () => {
    useLayoutEffect( () => window.scrollTo({ top : 0 , behavior : 'auto' }) , [])
}