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
};

export default async function createBrowserWindow() {
    const windowBounds = await getWindowBounds();
    const platform = getCurrentSync();
    const widgetsWindow = await platform.Browser.createWindow({ 
        ...windowBounds, 
        alwaysOnTop: true, 
        showTaskbarIcon: false,
        workspacePlatform: { pages: [page] }
    });
    return widgetsWindow.openfinWindow;
}