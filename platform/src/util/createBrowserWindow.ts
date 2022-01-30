import { getCurrentSync, Page } from "@openfin/workspace-platform";
import getWindowBounds from './getWindowBounds'

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
                            url: 'https://calendar-7es2y.ondigitalocean.app/',
                            isClosable: false,
                        }
                    },
                    {
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: 'gmail',
                            url: 'https://gmail-ef3sj.ondigitalocean.app',
                            isClosable: false,
                        }
                    }
                ]
            }
        ],
        dimensions: {
            headerHeight: 0
        },
        settings: {
            hasHeaders: false
        }
    } as any
};

export default async function createBrowserWindow() {
    const windowBounds = await getWindowBounds();
    const platform = getCurrentSync();
    const widgetsWindow = await platform.Browser.createWindow({ 
        ...windowBounds, 
        alwaysOnTop: true, 
        showTaskbarIcon: false,
        resizable: false,
        workspacePlatform: { pages: [page] }
    });
    return widgetsWindow.openfinWindow;
}