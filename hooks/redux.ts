import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/stores'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
