import { MyPage } from "@components/MyPage/MyPage";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { HeadsetMic, HeadsetOff, Mic, MicOff, Settings } from "@mui/icons-material";
import { Avatar, Badge, IconButton, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const ChannelNavMyStatusContainer = styled.div`
    flex-grow: 0; 
    flex-shrink: 0;
    background-color: #ebedef;
    height: 53px;
    display: flex;
`;


const MyInfoGroup = styled.div`
    width: 122px;
    margin: 6px;
    border-radius: 8px;
    display: flex;  


    &:hover {
        background-color: #d2d4d8;
        transition: background-color 0.18s linear;
    }
`;

const MySettingGroup = styled.div`
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const AvatarBadge = styled(Badge)`
    margin: 6px;
    & .MuiBadge-badge {
        background-color: #44b700;
        color: #44b700;
    }
`;

const NickStatusBox = styled.div`

`;

const NicknameContainer = styled.div`
    width: 75px;
    font-size: 0.8em;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StatusContainer = styled.div`
    font-size: 0.8em;
`;


const ChannelNavMyStatus = () => {
    const { nickname, status, micEnabled, soundEnabled, setMicEnabled, setSoundEnabled } = useContext(MemberContext);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                handleClose();
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    });

    return (
        <ChannelNavMyStatusContainer>
            <MyInfoGroup>
                <AvatarBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                    <Avatar sx={{ width: "32px", height: "32px" }} />
                </AvatarBadge>
                <NickStatusBox>
                    <NicknameContainer>{nickname}</NicknameContainer>
                    <StatusContainer>{status}</StatusContainer>
                </NickStatusBox>
            </MyInfoGroup>
            <MySettingGroup>
                <IconButton size="small" sx={{ borderRadius: "2px" }} onClick={() => setMicEnabled(!micEnabled)}>
                    {micEnabled ? <Mic /> : <MicOff />}
                </IconButton>
                <IconButton size="small" sx={{ borderRadius: "2px" }} onClick={() => setSoundEnabled(!soundEnabled)}>
                    {soundEnabled ? <HeadsetMic /> : <HeadsetOff />}
                </IconButton>
                <IconButton size="small" sx={{ borderRadius: "2px" }} onClick={() => setOpen(true)}>
                    <Settings />
                </IconButton>
            </MySettingGroup>
            <Modal open={open} onClose={handleClose}>
                <>
                    {/** TODO: MyPage가 아닌 다른 이름으로 변경 필요 */}
                    <MyPage />
                </>
            </Modal>
        </ChannelNavMyStatusContainer>
    );
};

export { ChannelNavMyStatus };