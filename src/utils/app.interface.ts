// For all global interface and strutures 
export interface StorySegments {
    id:string;
    image:string;
    timestamp:string;
}

export interface Story{
    id:string,
    username:string;
    profilePic:string;
    segments: StorySegments[];
}