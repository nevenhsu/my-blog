import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { postReducer } from './slices/post'
import storage from './customStorage'
import { logger } from './logger'

const userPersistConfig = {
  key: 'post',
  storage,
  version: 1,
}

const rootReducer = combineReducers({
  post: persistReducer(userPersistConfig, postReducer),
})

const store = configureStore({
  reducer: rootReducer,
  middleware: gDM => gDM({ serializableCheck: false }).concat(logger) as any,
})

const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
