import getWindowBounds from './getWindowBounds';

export default async function getAnimationControls(win: OpenFin.Window): Promise<{ 
    animationPromise: Promise<void> | null; 
    fadeIn: () => Promise<void>; 
    fadeOut: () => Promise<void> 
}> {
    const windowBounds = await getWindowBounds();

    let animationPromise: Promise<void> | null = null;

    const fadeIn = async () => {
        await win.animate({ 
            position: { 
                duration: 250, 
                top: windowBounds.defaultTop,
                left: windowBounds.defaultLeft - windowBounds.defaultWidth
            }
        }, { interrupt: true, tween: 'ease-in' });
        await win.focus();
    }

    const fadeOut = async () => {
        await win.animate({ 
            position: { 
                duration: 250, 
                top: windowBounds.defaultTop,
                left: windowBounds.defaultLeft
            }
        }, { interrupt: true, tween: 'ease-out' });
    }

    return { animationPromise, fadeIn, fadeOut };
}