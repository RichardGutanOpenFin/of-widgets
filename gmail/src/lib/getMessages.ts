const stripText = (str?: string) => {
    if (!str) return "";

    const strArray = str.split(" ");
    strArray.pop();
    return strArray.join(" ");
};

export type Message = {
    id?: string;
    from?: string;
    subject?: string;
    snippet?: string;
    unread?: boolean;
    date: number
};
export default async function getMessages(): Promise<Message[]> {
    const gmail = window.gapi?.client?.gmail;
    if (gmail) {
        const {
            result: { messages },
        } = await gmail.users.messages.list({
            userId: "me",
            maxResults: 30,
        });

        const map = messages?.reduce((acc, curr) => {
            if (curr.threadId && curr.id && !acc.threads[curr.threadId]) {
                acc.threads[curr.threadId] = curr.threadId;
                acc.messageIds.push(curr.id);
            }
            return acc
        }, { threads: {} as Record<string, string>, messageIds: [] as string[] })

        const messagePromises = map?.messageIds.map((id) => gmail.users.messages.get({ userId: "me", id })) || [];
        const messageObjects = await Promise.all(messagePromises);

        return messageObjects.map(({ result }) => ({
            from: stripText(
                result.payload?.headers?.find((h) => h.name === "From")?.value
            ),
            subject: result.payload?.headers?.find((h) => h.name === "Subject")
                ?.value,
            snippet: result.snippet,
            unread: result.labelIds?.includes("UNREAD"),
            id: result.id,
            date: Number(result.internalDate)
        }));
    }
    return [];
}
