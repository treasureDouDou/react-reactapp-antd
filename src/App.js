import React, {Component} from 'react';
import Router from './routers/router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer  from './reducer/root'
import  './assets/theme/App.less'
const store = createStore(rootReducer)
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
