import React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

// Needed for onTouchTap (http://stackoverflow.com/a/34015469/988941)
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey700 } from 'material-ui/styles/colors';

import Primary from './layouts/Primary';

// Needed for onTouchTap (http://stackoverflow.com/a/34015469/988941)
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#23afff',
    textColor: grey700,
  },
});


@observer
class App extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme} >
          <Primary store={this.props.store} />
        </MuiThemeProvider>
        <DevTools />
      </div>
    );
  }
}

export default App;
