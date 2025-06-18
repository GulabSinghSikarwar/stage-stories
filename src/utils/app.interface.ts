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


export interface StoryViewerProps {
    stories: Story[];
    initialIndex: number;
    onClose: () => void;
}

export interface StoryProgressProps {
    totalSlides: number,
    currentSlide: number;
    progress: number;
}