import React, { useEffect, useState } from "react";
import { IonModal, IonButton, IonContent } from "@ionic/react";
import { UserStory } from "../../models/Story.model";

interface StoryDetailsModalProps {
  isOpen: boolean;
  story: UserStory | undefined;
  onClose: () => void;
}

const StoryDetailsModal: React.FC<StoryDetailsModalProps> = ({
  isOpen,
  story,
  onClose,
}) => {
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (story && story.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUrl(reader.result as string);
      };
      reader.readAsDataURL(story.image);
    }
  }, [story]);

  if (!story) return null;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      {/* show the photo in fullscreen with the description having a black transparent background full-width centered vertically : */}
      <IonContent
        onClick={onClose}
        style={{
          backgroundColor: "black",
        }}
      >
        {imageDataUrl && (
          <img
            src={imageDataUrl}
            alt={story.story.description}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              margin: "0 auto",
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "relative",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}
        <p
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            padding: "1rem",
            textAlign: "center",
            position: "relative",
          }}
        >
          {story.story.description}
        </p>
      </IonContent>
    </IonModal>
  );
};

export default StoryDetailsModal;
