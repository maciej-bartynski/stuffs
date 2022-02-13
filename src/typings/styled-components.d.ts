import {} from 'styled-components';
import STYLED_COMPONENTS_THEME from "consts/styledCompontentsTheme";

declare module 'styled-components' {
    type Theme = typeof STYLED_COMPONENTS_THEME;
    export interface DefaultTheme extends Theme {};
}