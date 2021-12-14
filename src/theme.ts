import { createMakeStyles } from 'tss-react';

export const theme = {
    background: '#333333',
    color: '#ffffff',
    linkColor: '#a8ceff',

    borderRadiusSmall: 3,
    borderRadiusMedium: 5,

    bodyFontFamily: 'Lato',
    bodyFontSize: 16,

    headerHeight: 32,
    headerBackground: '#222222',
    headerColor: '#eeeeee',
    headerButtonHover: '#444444',
    headerButtonPress: '#666666',
    headerCloseHover: '#ff5a35',
    headerClosePress: '#d62700',

    frameMenuBackground: 'rgba(51, 51, 51, 0.75)',
    frameMenuBackgroundPeek: 'rgba(51, 51, 51, 0.5)',
    frameMenuColor: '#ffffff',

    toolbarBackground: '#333333',
    toolbarColor: '#ffffff',
    toolbarBackdropFilter: 'blur(5px)',
    toolbarTransparentBackground: 'rgba(51, 51, 51, 0.67)',

    buttonColor: '#ffffff',
    buttonBackground: 'transparent',
    buttonBackgroundHover: 'rgba(255, 255, 255, 0.25)',
    buttonBackgroundPress: 'rgba(255, 255, 255, 0.33)',
    buttonBorderColor: 'rgba(255, 255, 255, 0.75)',
    buttonBorderColorHover: '#ffffff',
    buttonBorderColorPress: '#ffffff',

    textboxBorderColor: '#ffffff',
    textboxBackground: '#333333',
    textboxColor: '#ffffff',
    textboxHoverBackground: '#444444',
    textboxFocusBackground: '#ffffff',
    textboxFocusColor: '#111111',

    scrollbarColor: '#ffffff',
    detailsBoxBorderColor: 'rgba(255, 255, 255, 0.5)',

    spacing: (...spacings: number[]) => spacings.map(s => `${s * 10}px`).join(' '),
} as const;

function useTheme() {
    return theme;
}

export const makeStyles = createMakeStyles({
    useTheme,
}).makeStyles;
