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
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 90,
        });
    
        const fileResponse = await Filesystem.readFile({
          path: photoResult.path!,
          directory: Directory.Data
        });
    
        const uint8Array = base64ToUint8Array(fileResponse.data);
        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    
        setPhoto(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    };
    
  
    const updateStory = async () => {
      try {
        await StoriesService.postStory(
          photo,
          "Test story",
          0,
          0,
        );
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
  