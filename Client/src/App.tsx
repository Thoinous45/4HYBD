import {Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

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
import Login from "./pages/Login";
import Tabs from "./pages/Tabs";
import PrivateRoute from "./utils/PrivateRoute";
import Messages from "./pages/Messages";
import Register from "./pages/Register";
import IsAuthRoute from "./utils/IsAuthRoute";
import TakePhoto from './pages/TakePhoto';

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <IsAuthRoute exact path="/" component={Login}/>
                <IsAuthRoute exact path="/register" component={Register}/>
                <PrivateRoute exact path="/messages/:id" component={Messages}/>
                <PrivateRoute path="/app" component={Tabs}/>
                <PrivateRoute path="/take-photo" component={TakePhoto} exact />
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
