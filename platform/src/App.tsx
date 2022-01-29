import { init, getCurrentSync } from "@openfin/workspace-platform";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        test();
    }, []);
    return <div>
        Playground<br />
        <button onClick={testCreateWindow}>Create Window</button>
        <button onClick={testCreateView}>Create View</button>
        <button onClick={testLaunchApp}>Launch App</button>
        </div>;
}

export default App;

async function test() {
    await init({
        browser: {
            defaultWindowOptions: {
                workspacePlatform: {
                    pages: [],
                    title: 'Test'
                }
            }
        },
        licenseKey: '',
    });
}

function testCreateWindow() {
    const platform = getCurrentSync();
    platform.createWindow({});
}

function testCreateView() {
  const platform = getCurrentSync();
  platform.createView({ manifestUrl: "https://openfin-iex.experolabs.com/openfin/manifests/asia-market-overview.json", url: '', target: null } as any)
}

function testLaunchApp() {
    const platform = getCurrentSync();
    // platform.launchApp({ app:  {
    //     appId: "iex-demo-expero-asia-market-overview",
    //     title: "Asia Market Overview",
    //     manifestType: "view",
    //     publisher: "IEX",
    //     description:
    //       "Proin eget lectus mattis, luctus nisi ac, volutpat ex. In volutpat tempus semper. Morbi orci lectus, mattis ut finibus vehicula, sodales non ipsum. Fusce consectetur sem vel eros tempus, vel vehicula leo pulvinar. Aliquam erat volutpat.",
    //     manifest:
    //       "https://openfin-iex.experolabs.com/openfin/manifests/asia-market-overview.json",
    //     contactEmail: "info@openfin.co",
    //     supportEmail: "info@openfin.co",
    //     icons: [
    //       {
    //         src: "https://iexcloud.io/images/favicon.ico",
    //         type: "ico",
    //       },
    //     ],
    //     tags: ["Finance", "News"]
    //   }})
    platform.launchApp({ app: { appId: '', title: '', icons: [], publisher: '', manifestType:'view', manifest: "https://openfin-iex.experolabs.com/openfin/manifests/asia-market-overview.json"} })
}