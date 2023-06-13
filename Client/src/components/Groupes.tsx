import React from "react";
import {
    IonButton, IonCheckbox,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList, IonNav, IonNavLink,
    IonText
} from "@ionic/react";
import {
    addCircle, alertCircleOutline, checkmarkCircle,
    ellipsisHorizontal, star,
    trash
} from "ionicons/icons";
import Messages from "../pages/Messages";


const AllContacts = [
    {
        id: 1,
        name: "Groupe mercredi soir",
        time: "18h30",
        lastMessage: "Salut les gars, vous êtes chauds pour ce soir ?",
    },
    {
        id: 2,
        name: "Groupe jeudi soir",
        time: "18h30",
        lastMessage: "Salut les gars, vous êtes chauds pour ce soir ?",
    },
    {
        id: 3,
        name: "Groupe vendredi soir",
        time: "18h30",
        lastMessage: "Salut les gars, vous êtes chauds pour ce soir ?",
    },
    {
        id: 4,
        name: "Groupe samedi soir",
        time: "18h30",
        lastMessage: "Salut les gars, vous êtes chauds pour ce soir ?",
    }
];

const Groupes: React.FC = () => {
    return (
        <>
            <IonList>
                {AllContacts.map((contact) => (
                        <IonItem key={contact.id}>
                            <IonItemSliding>
                                <IonNavLink routerDirection={"forward"} component={() => <Messages/>}>


                                <IonItem button>
                                    <IonCheckbox></IonCheckbox>
                                    <IonLabel>
                                        <IonText color={"primary"}>
                                            {contact.name}
                                        </IonText>
                                        <p>{contact.lastMessage}</p>
                                    </IonLabel>
                                </IonItem>
                                <IonItemOptions side="end">
                                    <IonItemOption color="medium">
                                        <IonIcon slot="icon-only" icon={ellipsisHorizontal}>Options</IonIcon>
                                    </IonItemOption>
                                    <IonItemOption color="danger">
                                        <IonIcon slot="icon-only" icon={trash}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                                </IonNavLink>
                            </IonItemSliding>
                        </IonItem>
                ))}
            </IonList>

        </>
    )
}


export default Groupes;
