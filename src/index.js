import 'babel-polyfill' // ie
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { AppContainer } from 'react-hot-loader'

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component></Component>
        </AppContainer>,
        document.getElementById('root')
    )
}

render(App)

if(module.hot) {
    module.hot.accept('./App',() => {
        render(App);
    });
}


registerServiceWorker()
