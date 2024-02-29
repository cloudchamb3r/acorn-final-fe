import { ChannelPage } from "@pages/ChannelPage";
import { InvitePage } from "@pages/InvitePage";
import { LoginPage } from "@pages/LoginPage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { RtcTestPage } from "@pages/RtcTestPage";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/invite/:inviteId" element={<InvitePage />} />
                <Route path="/channel/:channelId/topic/:topicId" element={<ChannelPage />} />
                <Route path="/rtc" element={<RtcTestPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/channel/1/topic/1" />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
