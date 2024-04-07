import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'
import reduxThunk from 'redux-thunk'
import { rootReducer } from './reducer'

const {
  _REDUX_DEVTOOLS_EXTENSION_: devTool,
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: devCompose,
} = window

const composeEnhancers =
  typeof window === 'object' && devCompose ? devCompose({}) : compose

if (import.meta.env.MODE === 'production') {
  // 生产环境逻辑
}
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
)

export default store
