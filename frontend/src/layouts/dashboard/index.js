import React, {useEffect} from "react";
import {Stack} from "@mui/material";
import {Navigate, Outlet} from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import SideNav from "./SideNav";
import {useDispatch, useSelector} from "react-redux";
import {
    AddNotification,
    FetchProfilePicture,
    FetchUserProfile, RemoveNotification,
    SelectConversation,
    SetClient,
    showSnackbar, UpdateLastBlocker, UpdateLastEndedFriendship, UpdateLastUnblocker
} from "../../redux/slices/app";
import {socket, connectSocket, createStompClient, client} from "../../socket";
import {
    UpdateDirectConversation,
    AddDirectConversation,
    AddDirectMessage,
} from "../../redux/slices/conversation";
import AudioCallNotification from "../../sections/Dashboard/Audio/CallNotification";
import VideoCallNotification from "../../sections/Dashboard/video/CallNotification";
import {
    PushToAudioCallQueue,
    UpdateAudioCallDialog,
} from "../../redux/slices/audioCall";
import AudioCallDialog from "../../sections/Dashboard/Audio/CallDialog";
import VideoCallDialog from "../../sections/Dashboard/video/CallDialog";
import {PushToVideoCallQueue, UpdateVideoCallDialog} from "../../redux/slices/videoCall";
import {ROUTE_LOGIN} from "../../routes";
import {binaryBodyToJSON} from "../../utils/BinaryBodyToJSON";

const DashboardLayout = () => {
    const isDesktop = useResponsive("up", "md");
    const dispatch = useDispatch();
    const {user_id, isLoggedIn} = useSelector((state) => state.auth);
    const {user, isUserUpdated, notifications} = useSelector((state) => state.app);

    const {conversations, current_conversation} = useSelector(
        (state) => state.conversation.direct_chat
    );



    async function fetch() {
        await dispatch(FetchUserProfile());
        //await dispatch(FetchProfilePicture(user_id, 800, 800));
    }

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        console.log("NOTIFICATIONS UPDATED");
        console.log(notifications);
    }, [notifications]);


    const handleCloseAudioDialog = () => {
        dispatch(UpdateAudioCallDialog({state: false}));
    };
    const handleCloseVideoDialog = () => {
        dispatch(UpdateVideoCallDialog({state: false}));
    };


    useEffect(() => {

        const subscribeClient = async () => {
            if (isLoggedIn && isUserUpdated) {
                window.onload = function () {
                    if (!window.location.hash) {
                        window.location = window.location + "#loaded";
                    }
                };

                window.onload();


                createStompClient(user).onConnect =  (frame) => {
                    client.subscribe(`/user/${user.id}/queue/private-messages`, (msg) => {
                        console.log(msg);
                        const message = JSON.parse(msg.body)
                        //updateContactsWithMessage(message.receiverContactId, message);
                    });

                    client.subscribe(`/user/${user.id}/queue/notification/friendship-solicitation`, (obj) => {
                        binaryBodyToJSON(obj).then(async (notification) => {
                            dispatch(
                                showSnackbar({
                                    severity: "success",
                                    message: "New friend request received",
                                })
                            );
                            console.log("NOTIFICATION");
                            console.log(notification);
                            dispatch(AddNotification(notification));
                        });
                    });

                    client.subscribe(`/user/${user.id}/queue/notification/delete`, (obj) => {
                        console.log(obj);
                        binaryBodyToJSON(obj).then((notificationId) => {
                            console.log(notificationId);
                            dispatch(RemoveNotification(notificationId));
                        });
                    });

                    client.subscribe(`/user/${user.id}/queue/friendship-ended`, (obj) => {
                        console.log(obj);
                        binaryBodyToJSON(obj).then((lastFriendshipEnded) => {
                            console.log(lastFriendshipEnded);
                            dispatch(UpdateLastEndedFriendship(lastFriendshipEnded));
                        });
                    });

                    client.subscribe(`/user/${user.id}/queue/blocked`, (obj) => {
                        console.log(obj);
                        binaryBodyToJSON(obj).then((lastBlocker) => {
                            console.log(lastBlocker);
                            dispatch(UpdateLastBlocker(lastBlocker));

                        });
                    });

                    client.subscribe(`/user/${user.id}/queue/unblocked`, (obj) => {
                        console.log(obj);
                        binaryBodyToJSON(obj).then((lastUnblocker) => {
                            console.log(lastUnblocker);
                            dispatch(UpdateLastUnblocker(lastUnblocker));
                        });
                    });
                };

                client.activate();



                /*socket.on("audio_call_notification", (data) => {
                    // TODO => dispatch an action to add this in call_queue
                    dispatch(PushToAudioCallQueue(data));
                });

                socket.on("video_call_notification", (data) => {
                    // TODO => dispatch an action to add this in call_queue
                    dispatch(PushToVideoCallQueue(data));
                });

                socket.on("new_message", (data) => {
                    const message = data.message;
                    console.log(current_conversation, data);
                    // check if msg we got is from currently selected conversation
                    if (current_conversation?.id === data.conversation_id) {
                        dispatch(
                            AddDirectMessage({
                                id: message._id,
                                type: "msg",
                                subtype: message.type,
                                message: message.text,
                                incoming: message.to === user_id,
                                outgoing: message.from === user_id,
                            })
                        );
                    }
                });

                socket.on("start_chat", (data) => {
                    console.log(data);
                    // add / update to conversation list
                    const existing_conversation = conversations.find(
                        (el) => el?.id === data._id
                    );
                    if (existing_conversation) {
                        // update direct conversation
                        dispatch(UpdateDirectConversation({conversation: data}));
                    } else {
                        // add direct conversation
                        dispatch(AddDirectConversation({conversation: data}));
                    }
                    dispatch(SelectConversation({room_id: data._id}));
                });

                socket.on("new_friend_request", (data) => {
                    dispatch(
                        showSnackbar({
                            severity: "success",
                            message: "New friend request received",
                        })
                    );
                });

                socket.on("request_accepted", (data) => {
                    dispatch(
                        showSnackbar({
                            severity: "success",
                            message: "Friend Request Accepted",
                        })
                    );
                });

                socket.on("request_sent", (data) => {
                    dispatch(showSnackbar({severity: "success", message: data.message}));
                });*/
            }

            // Remove event listener on component unmount
            return () => {
                socket?.off("new_friend_request");
                socket?.off("request_accepted");
                socket?.off("request_sent");
                socket?.off("start_chat");
                socket?.off("new_message");
                socket?.off("audio_call_notification");
            };

        }

        subscribeClient();

    }, [isLoggedIn, socket, isUserUpdated]);


    if (!isLoggedIn) {
        return <Navigate to={"/auth/login"}/>;
    }

    return (
        <>
            <Stack direction="row">
                {isDesktop && (
                    // SideBar
                    <SideNav/>
                )}

                <Outlet/>
            </Stack>
            {/*{open_audio_notification_dialog && (
                <AudioCallNotification open={open_audio_notification_dialog}/>
            )}
            {open_audio_dialog && (
                <AudioCallDialog
                    open={open_audio_dialog}
                    handleClose={handleCloseAudioDialog}
                />
            )}
            {open_video_notification_dialog && (
                <VideoCallNotification open={open_video_notification_dialog}/>
            )}
            {open_video_dialog && (
                <VideoCallDialog
                    open={open_video_dialog}
                    handleClose={handleCloseVideoDialog}
                />
            )}*/}
        </>
    );
};

export default DashboardLayout;
