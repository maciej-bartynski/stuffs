import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import STYLED_COMPONENTS_THEME, { GlobalStyle } from 'consts/styledCompontentsTheme';
import StatusColumns from 'components/StatusColumns';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={STYLED_COMPONENTS_THEME}>
            <div className="App">
                <StatusColumns />
            </div>
            <GlobalStyle />
        </ThemeProvider>
    );
};

export default App;
