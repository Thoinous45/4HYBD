import React, {FC} from 'react';
import {IonActionSheet, useIonRouter} from "@ionic/react";
import ChatService from "../services/ChatService";

interface ActionSheetProps {
    isOpen: any;
    onDidDismiss: () => void;
    title: string;
    id: any;
}

const ActionSheetComponent: FC<ActionSheetProps> = ({isOpen, onDidDismiss, title, id}) => {

    console.log(id)

    const navigate = useIonRouter();
    const handleOpenInformationGroupes = () => {
        navigate.push('/app/informations', 'forward', 'push')
    };

    const deleteChatRoom = () => {
        ChatService.deleteChatRoom(id)
    }

    return (
        <IonActionSheet
            isOpen={isOpen}
            header={title}
            buttons={[
                {
                    text: 'Infos du groupe',
                    handler: () => {
                        handleOpenInformationGroupes();
                    },
                },
                {
                    text: 'Quitter le groupe',
                    role: 'destructive',
                    data: {
                        handler: () => {
                            deleteChatRoom();
                        },
                    },
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    data: {
                        action: 'cancel',
                    },
                },
            ]}
            onDidDismiss={onDidDismiss}
        />
    )
}

export default ActionSheetComponent;
