// For all global interface and strutures 
export interface StorySlides {
    id: string;
    image: string;
    timestamp: string;
}

export interface Story {
    id: string,
    username: string;
    profilePic: string;
    slides: StorySlides[];
}