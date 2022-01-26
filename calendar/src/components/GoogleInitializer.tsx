import useGoogleApi from '../hooks/useGoogleApi';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function GoogleInitializer({ children }: PropsWithChildren<{}>) {
    const { auth } = useGoogleApi();
    const googleSignedIn = auth?.isSignedIn.get();
    const [signedIn, setSignedIn] = useState(false);
    const isSignedIn = googleSignedIn || signedIn;

    useEffect(() => {
        if (!googleSignedIn) {
            auth?.signIn().then((signed) => {
                setSignedIn(signed.isSignedIn());
            });
        }
    }, [googleSignedIn]);

    return <>{isSignedIn && children}</>;
}
