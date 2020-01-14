import { WindowWidthContext } from 'components/WindowWidthProvider'
import { useContext } from 'react'

const useWindowWidth = () => useContext(WindowWidthContext)

export default useWindowWidth
