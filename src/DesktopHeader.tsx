import { OWWindow } from '@overwolf/overwolf-api-ts/dist';
import clsx from 'clsx';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from './contexts/AppContext';
import { globalLayers } from './globalLayers';
import CloseIcon from './Icons/CloseIcon';
import MaximizeIcon from './Icons/MaximizeIcon';
import Minimizeicon from './Icons/MinimizeIcon';
import RestoreIcon from './Icons/RestoreIcon';
import { getBackgroundController } from './OverwolfWindows/background/background';
import { windowNames } from './OverwolfWindows/consts';
import { desktopAppTitle } from './OverwolfWindows/desktop/desktop';
import { makeStyles } from './theme';

const useStyles = makeStyles()(theme => ({
    root: {
        display: 'flex',
        background: theme.headerBackground,
        color: theme.headerColor,
        height: theme.headerHeight,
        flexShrink: 0,
        overflow: 'hidden',
        zIndex: globalLayers.header,
    },
    transparent: {
        background: 'transparent !important',
    },
    hidden: {
        display: 'none !important',
    },
    draggable: {
        flexGrow: 1,

        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        minWidth: 0,

        '& > *': {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
    },
    buttons: {
        flexShrink: 0,
    },
    controlButton: {
        width: 42,
        background: 'transparent',
        border: 'none',
        color: '#fff',

        outline: 'none',

        '&:hover': {
            background: theme.headerButtonHover,
        },

        '&:active': {
            background: theme.headerButtonPress,
        },

        '&:focus': {
            outline: 'none',
        },

        '& > svg': {
            width: 30,
            height: 30,
            marginLeft: "6px"
        },
    },
    close: {
        '&:hover': {
            background: theme.headerCloseHover,
        },
        '&:active': {
            background: theme.headerClosePress,
        },
    },
}));

const backgroundController = getBackgroundController();
export default function DesktopHeader() {
    const context = useContext(AppContext);
    console.log(context);

    const { classes } = useStyles();
    const { t } = useTranslation();

    const [desktopWindow] = useState(() => {
        return new OWWindow(windowNames.desktop);
    });

    const draggable = useRef<HTMLDivElement | null>(null);
    const [maximized, setMaximized] = useState(false);


    useEffect(() => {
        if (draggable.current) {
            desktopWindow.dragMove(draggable.current);
        }
    }, [draggable.current]);

    useEffect(() => {
        async function handleResize() {
            const windowState = await desktopWindow.getWindowState();
            setMaximized(windowState.window_state === overwolf.windows.WindowStateEx.MAXIMIZED);
        }

        handleResize(); // to set the initial maximized icon
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function handleShowInGameWindow() {
        backgroundController.openWindow('inGame');
    }

    function handleMinimize() {
        desktopWindow.minimize();
    }

    function handleMaximizeRestore() {
        if (maximized) {
            desktopWindow.restore();
        } else {
            desktopWindow.maximize();
        }
        setMaximized(!maximized);
    }

    function handleClose() {
        backgroundController.closeWindow('desktop');
    }

    return (
        <header className={clsx(classes.root)}>
            <div
                ref={draggable}
                //  onDoubleClick={handleMaximizeRestore}
                className={classes.draggable}>
                <span>{desktopAppTitle}</span>
            </div>
            <div className={classes.buttons}>
                {/* {context.gameRunning && <button className={clsx(classes.controlButton)} onClick={handleShowInGameWindow} title={t('header.openInGame')}>
                <DesktopWindowIcon />
            </button>} */}
                {/* <button className={clsx(classes.controlButton)} onClick={context.toggleFrameMenu} title={t('header.settings')}>
                <SettingsIcon />
            </button> */}
                <button className={clsx(classes.controlButton)} onClick={handleMinimize}>
                    <Minimizeicon />
                </button>
                <button
                    // onClick={handleMaximizeRestore}
                    className={clsx(classes.controlButton)} >
                    {maximized
                        ? <RestoreIcon />
                        : <MaximizeIcon />
                    }
                </button>
                <button className={clsx(classes.controlButton, classes.close)} onClick={handleClose}>
                    <CloseIcon />
                </button>
            </div>
        </header>
    );
}
