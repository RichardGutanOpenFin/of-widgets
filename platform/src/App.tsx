import { init, getCurrentSync, Page } from "@openfin/workspace-platform";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        test();
    }, []);
    return <div>
        Playground<br />
        
        </div>;
}

export default App;


const page: Page = {
    title: 'Widgets',
    pageId: 'widgets',
    layout: {
        content: [
            {
                type: 'column',
                content: [
                    {
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: 'calendar',
                            url: 'https://examples.com'
                        }
                    },
                    {
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: 'gmail',
                            url: 'http://yahoo.com'
                        }
                    }
                ]
            }
        ]
    } as any
}

async function getWindowBounds() {
    const { primaryMonitor: { monitorRect }} = await fin.System.getMonitorInfo();

    return {
        defaultHeight: monitorRect.bottom,
        defaultWidth: 300,
        defaultLeft: monitorRect.right,
        defaultTop: 0
    }

}

async function test() {
    await init({
        browser: {

        }
    });

    

    const windowBounds = await getWindowBounds();

    const platform = getCurrentSync();
    const widgetsWindow = await platform.Browser.createWindow({ ...windowBounds, workspacePlatform: { pages: [page] }});
    const ofWidgetsWindow = widgetsWindow.openfinWindow;
   


    window.addEventListener('mouseover', () => {
        widgetsWindow.openfinWindow.animate({ position: { top: 0, duration: 100, left: 1300}}, { interrupt: false })
    })

}