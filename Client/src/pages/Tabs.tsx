import {IonIcon, IonLabel, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import React from "react";
import Amis from "./Amis";
import Discussions from "./Discussions";
import Reglages from "./Reglages";
import {chatbubblesOutline, cogOutline, peopleOutline} from "ionicons/icons";
import {Redirect, Route} from "react-router-dom";
import Informations from "./Informations";
import Messages from "./Messages";
import Stories from "./Stories";

const Tabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/app"><Redirect to={"/app/discussions"}/></Route>
                <Route exact path="/app/friends" component={Amis}/>
                <Route exact path="/app/discussions" component={Discussions}/>
                <Route path="/app/reglages" component={Reglages}/>
                <Route path="/app/informations" component={Informations}/>
                <Route path="/messages/:id" component={Messages}/>
                <Route path="/app/stories" component={Stories}/>
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
                <IonTabButton tab="stories" href="/app/stories">
                    <IonIcon icon={chatbubblesOutline}/>
                    <IonLabel>Stories</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Tabs;
