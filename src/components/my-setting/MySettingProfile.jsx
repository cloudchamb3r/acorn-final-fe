import { AccountDeleteModal } from "@components/my-setting/AccountDeleteModal";
import { MemberContext } from "@contexts/MemberContext";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { axiosClient } from "@utils/axiosClient";
import { useContext, useState } from "react";



const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const TextfieldLabelContainer = styled.div`
    width: 300px;
    height: 30px;
    font-size: 18px;
    text-align: left;
    margin: 10px 5px 5px 5px ;
`;



const MySettingProfile = () => {
    const { myInfo, updateMyInfo } = useContext(MemberContext);
    const [newData, setNewData] = useState(myInfo);
    const [canSubmit, setCanSubmit] = useState(false);
    const [isHashInvalid, setHashInvalid] = useState(false);
    const [DeleteModalOpen, setDeleteModalOpen] = useState(false);


    const nicknameChange = (e) => {
        setNewData({
            ...newData,
            nickname: e.target.value
        });
        if (isHashInvalid === false) {
            setCanSubmit(true);
        }
    };

    const hashtagChange = (e) => {
        const hashtagRegex = /^\d{4}$/;
        if (hashtagRegex.test(e.target.value)) {
            setHashInvalid(false);
            setNewData({
                ...newData,
                hashtag: e.target.value
            });
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
            setHashInvalid(true);
        }
    };

    const updateSubmit = () => {
        axiosClient.put("/member/changeNick", newData)
            .then(_ => {
                updateMyInfo();
                setCanSubmit(false);
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handleOpen = () => {
        setDeleteModalOpen(true);
    };

    const handleClose = () => {
        setDeleteModalOpen(false);
    };

    return (
        <>
            <ProfileContainer>
                <div
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 15 }}
                >
                    <div
                        style={{
                            width: 300,
                            fontSize: 30,
                            fontWeight: "bold",
                            textAlign: "left",
                            margin: "30px 5px 30px 5px"
                        }}
                    >
                        나의 계정
                    </div>
                    <TextfieldLabelContainer>닉네임</TextfieldLabelContainer>
                    <TextField
                        defaultValue={myInfo.nickname}
                        size="small"
                        sx={{
                            marginBottom: 3,
                            width: 300
                        }}
                        onChange={nicknameChange}
                    />
                    <TextfieldLabelContainer>해시태그</TextfieldLabelContainer>
                    <TextField
                        defaultValue={myInfo.hashtag}
                        size="small"
                        sx={{
                            marginBottom: 3,
                            width: 300
                        }}
                        error={isHashInvalid}
                        helperText={isHashInvalid ? "4자리 숫자로 입력해주세요" : ""}
                        onChange={hashtagChange}
                    />
                </div>
                <Button
                    variant="contained"
                    color="success"
                    size="medium"
                    sx={{
                        width: 140,
                        height: 50,
                        fontSize: 16,
                        margin: "25px 0px 15px 320px",
                        fontWeight: "bold"
                    }}
                    disabled={!canSubmit}
                    onClick={updateSubmit}
                >
                    변경사항 저장
                </Button>
                <hr style={{
                    border: "1px dashed #d5d3d3",
                    width: 400,
                    textAlign: "center",
                    marginTop: 20,
                    marginBottom: 20
                }}
                />
                <div
                    style={{
                        height: 30,
                        textDecoration: "underline",
                        color: "#ff0000",
                        textAlign: "left",
                        marginLeft: 65,
                        cursor: "pointer"
                    }}
                    onClick={handleOpen}
                >
                    계정삭제
                </div>
                <div
                    style={{
                        height: 30,
                        color: "#707070",
                        textAlign: "left",
                        marginLeft: 65,
                        fontSize: "0.8rem"
                    }}
                >
                    계정 삭제 시 모든 계정 정보와 데이터가 영구적으로 삭제됩니다.
                </div>
            </ProfileContainer>
            <AccountDeleteModal open={DeleteModalOpen} close={handleClose} />
        </>
    );
};

export { MySettingProfile };