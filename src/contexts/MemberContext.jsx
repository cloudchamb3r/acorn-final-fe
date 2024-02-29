import { axiosClient } from "@configs/AxiosClient";
import { getWsBaseUrl } from "@configs/env";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const MemberContext = createContext({
    channels: [],
    nickname: null,
    hashtag: null,
    email: null,
    micEnabled: true,
    soundEnabled: true,
    status: null,
    pingWebSocket: null,
    setChannels: () => { },
    setNickname: () => { },
    setHashtag: () => { },
    setEmail: () => { },
    setMicEnabled: () => { },
    setSoundEnabled: () => { },
    setStatus: () => { },
});

const MemberContextProvider = ({ children }) => {
    /**
     * array of channels
     * 
     * channels {
     *  id: number
     *  name: string
     *  thumbnail: string
     * }
     */
    const [channels, setChannels] = useState([]);
    const [nickname, setNickname] = useState("admin");
    const [hashtag, setHashtag] = useState(7777);
    const [email, setEmail] = useState("admin@gmail.com");
    const [micEnabled, setMicEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [status, setStatus] = useState("온라인");
    const pingWebSocket = useWebSocket(getWsBaseUrl() + "/connection/ping");


    // initialize ping - pong websocket connection 
    useEffect(() => {
        pingWebSocket.sendJsonMessage({
            email,
            nickname,
            hashtag,
        });
    }, [email, nickname, hashtag, pingWebSocket]);

    // initialize user channels 
    useEffect(() => {
        (async () => {
            const { data } = await axiosClient.get("/member/@me/channel");
            setChannels(data);
        })();
    }, [setChannels]);


    return (
        <MemberContext.Provider value={{
            channels,
            nickname,
            hashtag,
            email,
            micEnabled,
            soundEnabled,
            status,
            setChannels,
            setNickname,
            setHashtag,
            setEmail,
            setMicEnabled,
            setSoundEnabled,
            setStatus,
            pingWebSocket,
        }}>
            {children}
        </MemberContext.Provider>
    );

};

MemberContextProvider.propTypes = {
    children: PropTypes.element,
};

export { MemberContext, MemberContextProvider };