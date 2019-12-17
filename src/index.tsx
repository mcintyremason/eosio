import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/scss/app.scss';

import HomePage from './components/HomePage/index';
import { MuiThemeProvider } from 'material-ui/styles';

export default class App extends React.Component {
  render() {
    return(
      <MuiThemeProvider>
        <HomePage/>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));