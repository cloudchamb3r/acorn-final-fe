import { ChannelContext } from "@contexts/ChannelContext";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useState } from "react";

const CreateTopic = () => {
    const { currentChannel, setTopics } = useContext(ChannelContext);
    const [title, setTitle] = useState("");

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const createTopic = async () => {
        const { data } = await axiosClient.post(`/channel/${currentChannel?.id}/topic`, {
            title: title
        });
        setTopics(topics => [...topics, data]);
    };

    return (
        <div>
            <h3>토픽을 만들어보세요</h3>
            <input type="text" placeholder="토픽 이름" name="title" value={title} onChange={handleTitle} />
            <button onClick={createTopic}>생성</button>
        </div>
    );
};
export { CreateTopic };