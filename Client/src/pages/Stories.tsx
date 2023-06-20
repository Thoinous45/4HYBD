import { GoogleMap } from "@capacitor/google-maps";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useRef } from "react";

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;

  useIonViewDidEnter(() => {
    createMap();
  });

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: "my-cool-map",
      element: mapRef.current,
      apiKey: "AIzaSyC1YaQQECG6ZYTX2rxsKYHv7682Q4isIDw",
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }

  async function createStory() {}

  return (
    <IonPage>
      <IonHeader mode="md">
        <IonToolbar>
          <IonTitle size="large">Stories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <capacitor-google-map ref={mapRef} style={{
        width: '100vw',
        height: '100vh'
      }}></capacitor-google-map> */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={createStory}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MyMap;
