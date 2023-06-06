import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {chatbubblesOutline, cogOutline, ellipse, peopleOutline} from 'ionicons/icons';
import Discussions from './pages/Discussions/Discussions';
import Amis from './pages/Amis/Amis';
import Reglages from './pages/Reglages/Reglages';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from "react";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/friends">
            <Amis />
          </Route>
          <Route exact path="/discussions">
            <Discussions />
          </Route>
          <Route path="/reglages">
            <Reglages />
          </Route>
          <Route exact path="/">
            <Redirect to="/discussions" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/friends">
            <IonIcon aria-hidden="true" icon={peopleOutline} />
            <IonLabel>Amis</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/discussions">
            <IonIcon aria-hidden="true" icon={chatbubblesOutline} />
            <IonLabel>Discussions</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/reglages">
            <IonIcon aria-hidden="true" icon={cogOutline} />
            <IonLabel>Réglages</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
