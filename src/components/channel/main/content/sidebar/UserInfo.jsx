import { axiosClient } from "@components/AxiosClient";
import styled from "@emotion/styled";
import { Avatar, Badge, List, ListSubheader } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserInfoContainer = styled.div`
background-color: #f2f3f5;
    display: flex;
    flex-direction: column;
    background-color: #f2f3f5;
    width: 240px;
`;

const AvatarBadge = styled(Badge)`
    margin: 6px 0;
`;

const NicknameContainer = styled.div`
    width: auto;
    padding-left: 12px;
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const UserBox = styled.div`
    display: flex;
    align-items: center;    
    opacity: ${(props) => props.status === "offline" ? 0.5 : 1};
`;

const RList = styled(List)`
    height:94vh;
    &::-webkit-scrollbar{
        width:0px;
    }
`;

const handleStatusColor = (status) => {
    if (status === "online") return "success";
    if (status === "idle") return "secondary";
    if (status === "do not disturb") return "error";
    if (status === "invisible") return "info";
};

const UserInfo = () => {
    const { channelId } = useParams();
    const [memberList, setMemberList] = useState([]);
    useEffect(() => {
        (async () => {
            // const { data: memberList } = axiosClient.get(`/channel/${channelId}/member`);
            const { data: members } = await axiosClient.get(`/channel/${channelId}/member`);
            members.map(e => console.log(`members: ${members.length} || list: ${e.nickname} || status: ${e.status}`));
            setMemberList(members);
        })();
    }, [channelId, setMemberList]);

    return (
        <UserInfoContainer>
            <RList
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",

                    "& ul": { padding: 0 },
                }}
                subheader={<li />}
            >
                {["online", "offline"].map((isOnline, index) => (
                    <li key={`section-${index}`}>
                        <ul>
                            <ListSubheader>{`${isOnline} - ${memberList.filter((e) => index ? e.status === "offline" : e.status !== "offline").length}`}</ListSubheader>
                            {memberList.map((user, idx) => {
                                if ((isOnline !== "offline" && user.status !== "offline") || (isOnline === "offline" && user.status === "offline"))
                                    return (
                                        <UserBox key={`user-${idx}`} status={user.status}>
                                            <AvatarBadge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                variant="dot"
                                                color={handleStatusColor(user.status)}
                                            >
                                                <Avatar sx={{ width: "32px", height: "32px" }} />
                                            </AvatarBadge>
                                            <NicknameContainer>{user.nickname}</NicknameContainer>
                                        </UserBox>
                                    );
                            })}
                        </ul>
                    </li>
                ))}
            </RList>
        </UserInfoContainer >
    );
};

export { UserInfo };