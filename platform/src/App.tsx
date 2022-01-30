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
    

    window.addEventListener('mouseover', async () => {
        if (!animationPromise) {
            const helperWindow = await fin.Window.create({ 
                name: 'fade-out-helper',
                frame: false,
                showTaskbarIcon: false,
                smallWindow: true,
                resizable: false,
                alwaysOnTop: true,
                defaultHeight: windowBounds.defaultHeight, 
                defaultWidth: 3, 
                defaultTop: 0, 
                defaultLeft: -100,
                opacity: 0.05,
                saveWindowState: false
            });

            animationPromise = fadeIn();
            await animationPromise;
            animationPromise = null;      
            
            await helperWindow.resizeTo(5, windowBounds.defaultHeight, 'top-left')
            await helperWindow.moveTo(windowBounds.defaultLeft - windowBounds.defaultWidth - 5, 0);
            helperWindow.getWebWindow().addEventListener('mousemove', async () => {
                if (!animationPromise) {
                    await helperWindow.close();
                    animationPromise = fadeOut();
                    await animationPromise;
                    animationPromise = null;
                }
            });
        }
    });
}