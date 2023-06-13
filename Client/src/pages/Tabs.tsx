import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import React from "react";
import {chatbubblesOutline, cogOutline, peopleOutline} from "ionicons/icons";
import {Redirect, Route} from "react-router-dom";
import Messages from "./Messages";
import Amis from "./Amis";
import Discussions from "./Discussions";
import Reglages from "./Reglages";

const Tabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/app">
                    <Redirect to={"/app/discussions"}/>
                </Route>
                <Route path="/app/messages" component={Messages}/>
                <Route exact path="/app/friends" component={Amis}/>
                <Route exact path="/app/discussions" component={Discussions}/>
                <Route path="/app/reglages" component={Reglages}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="friends" href="/app/friends">
                    <IonIcon icon={peopleOutline}/>
                    <IonLabel>Amis</IonLabel>
                </IonTabButton>
                <IonTabButton tab="discussions" href="/app/discussions">
                    <IonIcon icon={chatbubblesOutline}/>
                    <IonLabel>Discussions</IonLabel>
                </IonTabButton>
                <IonTabButton tab="reglages" href="/app/reglages">
                    <IonIcon icon={cogOutline}/>
                    <IonLabel>Réglages</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Tabs;
