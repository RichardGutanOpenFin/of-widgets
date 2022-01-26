export const loadGoogleScript = () =>
    new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.async = false;
        script.onload = () => {
            resolve();
        };
        script.onerror = () => {
            reject();
        };
        document.body.appendChild(script);
    });

export type GApi = {
    auth?: gapi.auth2.GoogleAuth;
    calendar?: typeof gapi.client.calendar;
};

export const initGoogleApi = async (): Promise<GApi> => {
    await new Promise((resolve) => gapi.load('client:auth2', resolve));
    await gapi.client.init({
        apiKey: 'AIzaSyC6Bq7KpbWJ_tA6SMr9EBOCqEw4jcp1blE',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        clientId: '574341518046-7qe2d4lbi4sse3qll6i8momeil76aiha.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/calendar.readonly'
    });
    const auth = gapi.auth2.getAuthInstance();
    const calendar = gapi.client.calendar;
    return { auth, calendar };
};
