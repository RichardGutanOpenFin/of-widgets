import { init } from "@openfin/workspace-platform";
import { useEffect } from "react";

import createBrowserWindow from './util/createBrowserWindow';
import getWindowBounds from './util/getWindowBounds';
import getAnimationControls from './util/getAnimationControls'

function App() {
    useEffect(() => {
        initializePlatform();
    }, []);

    return null;
}

export default App;


async function initializePlatform() {
    const windowBounds = await getWindowBounds();
    const platformWindow = fin.Window.getCurrentSync();
    platformWindow.resizeTo(3, windowBounds.defaultHeight, 'top-left')
    platformWindow.moveTo(windowBounds.defaultLeft - 3, 0);

    await init({ browser: {} });

    const browserWindow = await createBrowserWindow();
    let { animationPromise, fadeIn, fadeOut } = await getAnimationControls(browserWindow);
    const helperWindow = await fin.Window.create({ 
        name: 'fade-out-helper',
        frame: false,
        showTaskbarIcon: false,
        smallWindow: true,
        resizable: false,
        alwaysOnTop: true,
        defaultHeight: windowBounds.defaultHeight, 
        defaultWidth: windowBounds.defaultLeft - windowBounds.defaultWidth, 
        defaultTop: 0, 
        defaultLeft: -windowBounds.defaultLeft,
        opacity: 0.01,
        backgroundColor: '#000',
        saveWindowState: false
    });
    

    const fadeInListener =  async () => {
        if (!animationPromise) {
            animationPromise = fadeIn();
            await animationPromise;
            animationPromise = null;      
            
            await helperWindow.moveTo(0, 0);
        }
    };
    window.addEventListener('mouseover', fadeInListener);

    const fadeOutListener = async () => {
        if (!animationPromise) {
            await helperWindow.moveTo(-windowBounds.defaultLeft, 0);
            animationPromise = fadeOut();
            await animationPromise;
            animationPromise = null;
        }
    }
    helperWindow.getWebWindow().addEventListener('mousemove', fadeOutListener);
}