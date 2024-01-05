import React from "react";
import {useTheme} from "@mui/material/styles";
import {Box, Stack, Typography} from "@mui/material";

import {Link, useSearchParams} from "react-router-dom";
import ChatComponent from "./Conversation";
import Chats from "./Chats";
import Contact from "../../sections/Dashboard/Contact";
import NoChat from "../../assets/Illustration/NoChat";
import {useSelector} from "react-redux";
import StarredMessages from "../../sections/Dashboard/StarredMessages";
import Media from "../../sections/Dashboard/SharedMessages";

const GeneralApp = () => {


    const [searchParams] = useSearchParams();

    const theme = useTheme();

    const {sideBar, room_id, chat_type, isUserUpdated} = useSelector((state) => state.app);
    const {user_id} = useSelector((state) => state.auth);
    const {current_conversation_fake} = useSelector((state) => state.conversation.direct_chat);

    return (
        <>
            {console.log("USEEEEER IIIIIIIIIIDDDDDDDDDDDDD: " + user_id)}
            {user_id && localStorage.getItem("user_id") && isUserUpdated && (
                <Stack direction="row" sx={{width: "100%"}}>
                    <Chats/>
                    <Box
                        sx={{
                            height: "100%",
                            width: sideBar.open
                                ? `calc(100vw - 740px )`
                                : "calc(100vw - 420px )",
                            backgroundColor:
                                theme.palette.mode === "light"
                                    ? "#FFF"
                                    : theme.palette.background.paper,
                            borderBottom:
                                searchParams.get("type") === "individual-chat" &&
                                searchParams.get("id")
                                    ? "0px"
                                    : "6px solid #0162C4",
                        }}
                    >
                        {/*(chat_type === "individual") &&*/}
                        {(room_id !== null || current_conversation_fake !== null)? (

                            <ChatComponent current_conversation_fake={current_conversation_fake ? current_conversation_fake : null}/>
                        ) : (
                            <Stack
                                spacing={2}
                                sx={{height: "100%", width: "100%"}}
                                alignItems="center"
                                justifyContent={"center"}
                            >
                                <NoChat/>
                                <Typography variant="subtitle2">
                                    Selectione uma conversa ou comece uma {" "}
                                    <Link
                                        style={{
                                            color: theme.palette.primary.main,
                                            textDecoration: "none",
                                        }}
                                        to="/"
                                    >
                                        nova
                                    </Link>
                                </Typography>
                            </Stack>
                        )}
                    </Box>
                    {sideBar.open &&
                        (() => {
                            switch (sideBar.type) {
                                case "CONTACT":
                                    return <Contact/>;

                                case "STARRED":
                                    return <StarredMessages/>;

                                case "SHARED":
                                    return <Media/>;

                                default:
                                    break;
                            }
                        })()}
                </Stack>)}
        </>
    );
};

export default GeneralApp;
