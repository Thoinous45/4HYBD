export interface UserStory {
    _id: string;
    firstname: string;
    lastname: string;
    story : {
        name: string;
        description: string;
        size: number;
        type: string;
        location: {
            longitude: number;
            latitude: number;
        };
        createdAt: Date;
        updatedAt: Date;
    };
    imageUrl?: string;
}