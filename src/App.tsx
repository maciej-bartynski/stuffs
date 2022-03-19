import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import STYLED_COMPONENTS_THEME, { GlobalStyle } from 'consts/styledCompontentsTheme';
import StatusColumns from 'components/StatusColumns';
import AddStatusForm from 'components/AddStatusForm';

const App: React.FC = () => {
    return (
        <>
            <ThemeProvider theme={STYLED_COMPONENTS_THEME}>
                <div className="App">
                    <StatusColumns />
                </div>
                <AddStatusForm/>
                <div data-selector="portal-draggable"/>
                <GlobalStyle />
            </ThemeProvider>
        </>
    );
};

export default App;
