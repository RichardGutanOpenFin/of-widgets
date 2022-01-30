export default async function getWindowBounds() {
    const { primaryMonitor: { monitorRect }} = await fin.System.getMonitorInfo();

    return {
        defaultHeight: monitorRect.bottom || 0,
        defaultWidth: 300,
        defaultLeft: monitorRect.right || 0,
        defaultTop: 0
    };
}