import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Post = {
  password?: string
}

export interface IPostState {
  data: { [slug: string]: Post | undefined }
}

const initialState: IPostState = {
  data: {},
}

export const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<{ slug: string; password: string }>) => {
      const { slug, password } = action.payload
      if (slug) {
        state.data[slug] = { password }
      }
    },
  },
})

export const { setPassword } = slice.actions
export const postReducer = slice.reducer
