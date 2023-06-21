import { Geolocation } from "@capacitor/geolocation";
import { GoogleMap } from "@capacitor/google-maps";
import { MarkerClickCallbackData } from "@capacitor/google-maps/dist/typings/definitions";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import StoryDetailsModal from "../components/stories/StoryDetailsModal";
import StoriesService from "../services/StoriesService";
import { UserStory } from "../models/Story.model";
import { useHistory } from "react-router";

const Stories: React.FC = () => {
  const key = "AIzaSyC1YaQQECG6ZYTX2rxsKYHv7682Q4isIDw";
  const newMap = useRef<GoogleMap | null>(null);
  const mapRef = useRef(null);

  const [selectedStory, setSelectedStory] = useState<UserStory>();
  const [stories, setStories] = useState<Array<UserStory>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchStories = async () => {
    try {
      const fetchedStories = await StoriesService.getStoriesInfos();
      setStories(fetchedStories);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    }
  };

  useEffect(() => {
    if (stories.length > 0) {
      createMap();
    }
  }, [stories]);

  const history = useHistory();

  const openTakePhoto = () => {
    history.push("/take-photo");
  };

  const onMarkerClick = async (marker: MarkerClickCallbackData) => {
    const story = stories.find(
      (story) =>
        story.story.location.latitude === marker.latitude &&
        story.story.location.longitude === marker.longitude
    );
    if (story) {
      try {
        const storyImage = await StoriesService.getStoryPhoto(story._id);
        setSelectedStory({ ...story, image: storyImage });
        setShowModal(true);
      } catch (error) {
        console.error("Failed to fetch story image:", error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addMarker = async (story: UserStory) => {
    await newMap.current?.addMarker({
      coordinate: {
        lat: story.story.location.latitude,
        lng: story.story.location.longitude,
      },
      title: story.story.description,
    });
  };

  const addMarkers = async () => {
    await Promise.all(
      stories.map((story) => {
        return addMarker(story);
      })
    );
  };

  const createMap = async () => {
    if (!mapRef.current) return;
    const coordinates = await Geolocation.getCurrentPosition();
  
    newMap.current = await GoogleMap.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: key,
      config: {
        zoom: 12,
        center: {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        },
        disableDefaultUI: true,
      },
    });
  
    newMap.current.setOnMarkerClickListener((marker) => onMarkerClick(marker));

    await addMarkers();
  };
  

  useIonViewDidEnter(async () => {
    await fetchStories();
  });

  return (
    (
      <IonPage>
        <IonHeader mode="md">
          <IonToolbar>
            <IonTitle size="large">Stories</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <capacitor-google-map
            ref={mapRef}
            style={{ display: "inline-block", width: "100%", height: "100%" }}
          ></capacitor-google-map>

          <IonFab
            vertical="bottom"
            horizontal="end"
            slot="fixed"
            onClick={openTakePhoto}
          >
            <IonFabButton>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        </IonContent>

        <StoryDetailsModal
          isOpen={showModal}
          story={selectedStory}
          onClose={closeModal}
        />
      </IonPage>
    )
  );
};

export default Stories;
