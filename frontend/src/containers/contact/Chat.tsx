import React, {useEffect, useState} from 'react';
import MessageComponent from "../../components/contact/MessageComponent";
import Grid from "@mui/material/Grid";
import {Contact} from "../../model/contact";
import {Message, MESSAGE_TYPE} from "../../model/message";
import {getLastMessages, sendMessage} from "../../api/user_requests/messageRequests";
import InfiniteScroll from "react-infinite-scroll-component";
import {Button, TextField, Typography} from "@mui/material";

interface ChatProps {
    contact: Contact;
    updateContactsWithMessage: (contactId: bigint, message: Message) => void;
}

const Chat: React.FC<ChatProps> = ({contact, updateContactsWithMessage}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [hasMoreItems, setHasMoreItems] = useState(true);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            const message: Message = {
                id: BigInt(0), //irrelevant
                date: new Date(),
                senderId: contact.user1Id,
                receiverId: contact.user2Id,
                viewed: false,
                messageType: MESSAGE_TYPE.TEXT,
                hashedImage: '',
                hashedAudio: '',
                hashedText: newMessage
            };
            updateContactsWithMessage(contact.user1Id, (await sendMessage(message)));
            setNewMessage('');
        }
    };

    const fetchMoreData = async () => {
        //the last message is the first one or the last one in the list? messages.length - 1
        const lastMessageDate = messages.length > 0 ? messages[0].date : new Date();
        const user1Id = contact.user1Id;
        const user2Id = contact.user2Id;

        const data: Message[] = await getLastMessages(lastMessageDate, user1Id, user2Id);
        if (data.length === 0) {
            setHasMoreItems(false);
        } else {
            setMessages(data);
        }
    };

    useEffect(() => {
        fetchMoreData();
    }, []);

    return (
        <Grid>
            <InfiniteScroll
                dataLength={messages.length}
                next={fetchMoreData}
                hasMore={hasMoreItems}
                loader={<Typography variant={'h4'}>Carregando...</Typography>}
                endMessage={
                    <Typography style={{textAlign: 'center'}}>
                        <b>Você não tem mais mensagens!</b>
                    </Typography>
                }
            >

                <Grid>
                    {/*{contact.messages.map((message) => (
                        <MessageComponent key={message.id.toString()} text={message.hashedText}/>
                    ))}*/}
                    {messages.map((message) => (
                        <MessageComponent key={message.id.toString()} text={message.hashedText}/>
                    ))}
                </Grid>
            </InfiniteScroll>
            <TextField
                value={newMessage}
                onChange={event => setNewMessage(event.target.value)}
            />
            <Button onClick={handleSendMessage}>Send</Button>
        </Grid>
    );
};

export default Chat;
