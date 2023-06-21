import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import { camera } from "ionicons/icons";
  import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
  import { useState } from "react";
  import StoriesService from "../services/StoriesService";
  import { Filesystem, Directory } from '@capacitor/filesystem';
import { Geolocation } from "@capacitor/geolocation";

  
  const TakePhoto: React.FC = () => {
    const [photo, setPhoto] = useState<string>("");

    const base64ToUint8Array = (base64: string) => {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    };
    
    const takePhoto = async () => {
      try {
        const photoResult = await Camera.getPhoto({
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera,
          quality: 90,
        });
    
        const uint8Array = base64ToUint8Array(photoResult.base64String!);
        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    
        setPhoto(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    };
    
    
  
    const updateStory = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
    
        // Convert the photo URL back to a Blob
        const response = await fetch(photo);
        const blob = await response.blob();
    
        await StoriesService.postStory(blob, "Description", coordinates.coords.latitude, coordinates.coords.longitude);
        setPhoto("");
        // Navigate back to the previous screen or show a success message
      } catch (error) {
        console.error("Error updating story:", error);
      }
    };
    
    
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Take Photo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <img src={photo} alt="Taken photo" />
          <IonButton onClick={takePhoto}>
            <IonIcon icon={camera} />
            Take Photo
          </IonButton>
          {photo && (
            <IonButton onClick={updateStory}>
              Update Story
            </IonButton>
          )}
        </IonContent>
      </IonPage>
    );
  };
  
  export default TakePhoto;
  