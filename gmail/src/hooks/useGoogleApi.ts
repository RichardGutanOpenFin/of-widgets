import { useEffect, useState } from "react";
import { loadGoogleScript, initGoogleApi, GApi } from "../lib/googleApis";

const useGoogleApi = () => {
    const [state, setState] = useState<GApi>({});
    useEffect(() => {
        const init = async () => {
            await loadGoogleScript();
            const googleApi = await initGoogleApi();
            setState(googleApi);
        };
        init();
    }, []);

    return state;
};

export default useGoogleApi;
