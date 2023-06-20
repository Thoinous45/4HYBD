import React, {useRef} from 'react';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel, IonIcon, IonSearchbar,
} from '@ionic/react';
import {closeCircleSharp} from "ionicons/icons";

interface ModalComponentProps {
    isOpen: boolean;
    closeModal: () => void;
}

const ModalNewGroup: React.FC<ModalComponentProps> = ({isOpen, closeModal}) => {

    const modal = useRef<HTMLIonModalElement>(null);


    return (
        <IonContent>
            <IonModal isOpen={isOpen} breakpoints={[0.95]}  initialBreakpoint={0.95} backdropBreakpoint={0.8} onDidDismiss={closeModal}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Nouv. Discussion</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={closeModal}>
                                <IonIcon slot="end" icon={closeCircleSharp} color={"medium"}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonSearchbar placeholder="Search"></IonSearchbar>
                    <IonList>
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonImg src="https://i.pravatar.cc/300?u=b"/>
                            </IonAvatar>
                            <IonLabel>
                                <h2>Connor Smith</h2>
                                <p>Sales Rep</p>
                            </IonLabel>
                        </IonItem>
                        {/* Ajoutez ici les autres éléments de la liste */}
                    </IonList>
                </IonContent>
            </IonModal>
        </IonContent>
    );
};

export default ModalNewGroup;
