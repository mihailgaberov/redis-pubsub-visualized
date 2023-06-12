
interface InitialState {
    channelName: string;
    icon: string;
    text: string;
}

export const initialState: InitialState = {
    channelName: "",
    icon: "",
    text: "",
};

export function PrepareNewsDataReducer(
    state: InitialState,
    action: { data: {}; type: string }
) {
    console.log(">>> reducer action: ", action)
    const data = action.data;

    switch (action.type) {
        case "UPDATE":
            const channelName = Object.getOwnPropertyNames(data)[0];

            return {
                channelName,
                icon: data[channelName].icon,
                text: data[channelName].text,
            };
        default:
            return state;
    }
}
