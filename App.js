import React, { Component } from 'react'

import MainNavigator from './src/Routes/MainNavigator'

import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux'
import { Text } from 'native-base'
import { store, persistor } from './redux/store/store'

// class App extends Component {
//   render () {
//     return (
      
//     )
//   }
// }

export default App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>wait</Text>}
      persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  )
}
