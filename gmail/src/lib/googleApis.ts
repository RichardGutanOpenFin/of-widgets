export const loadGoogleScript = () =>
    new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.async = false;
        script.onload = () => {
            resolve();
        };
        script.onerror = () => {
            reject();
        };
        document.body.appendChild(script);
    });

export type GApi = { auth?: gapi.auth2.GoogleAuth };
export const initGoogleApi = async () => {
    await new Promise((resolve) => gapi.load("client:auth2", resolve));
    await gapi.client.init({
        apiKey: "AIzaSyC6Bq7KpbWJ_tA6SMr9EBOCqEw4jcp1blE",
        discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
        ],
        clientId:
            "574341518046-7qe2d4lbi4sse3qll6i8momeil76aiha.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/gmail.readonly",
    });

    const auth = gapi.auth2.getAuthInstance();
    return { auth };
};
