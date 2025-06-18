import type React from "react";

import type { Story } from "../../utils/app.interface";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
const StoryViewer: React.FC<
    {
        stories: Story[];
        initialIndex: number;
        onClose: () => void;
    }
> = ({ stories, initialIndex, onClose }) => {

    const [currentUserIndex, setCurrentUserIndex] = useState(initialIndex)
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const currentStory = stories[currentUserIndex];
    const currentSegment = currentStory.slides[currentSegmentIndex]

    const startProgress = useCallback(() => {

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setProgress(0);

        const startTime = Date.now();
        const duration = 5000  // 5 sec for each  story slide or segment 

        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100)


            setProgress(newProgress);
            if (newProgress >= 100) {
                goToNext()
            }
        }, 50)


    }, [])

    const stopProgress = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [])


    const goToNext = useCallback(() => {
        stopProgress();

        if (currentSegmentIndex < currentStory.slides.length - 1) {
            setCurrentUserIndex(prev => prev + 1)
            setIsImageLoaded(false)
        }

        else if (currentUserIndex < stories.length - 1) {
            setCurrentUserIndex(prev => prev + 1)
            setCurrentSegmentIndex(0)
            setIsImageLoaded(false)
        } else {
            onClose()
        }

    }, [currentUserIndex, currentSegmentIndex, currentStory, stories.length, onClose, stopProgress])


    const goToPrev = useCallback(() => {
        stopProgress()


        if (currentSegmentIndex > 0) {
            setCurrentSegmentIndex(prev => prev - 1)
            setIsImageLoaded(false)
        } else if (currentUserIndex > 0) {
            const prevUserIndex = currentUserIndex - 1;
            const prevUser = stories[prevUserIndex]
            setCurrentUserIndex(prevUserIndex)
            setCurrentSegmentIndex(prevUser.slides.length - 1)
            setIsImageLoaded(false)
        }
        else {

        }

    }, [currentUserIndex, currentSegmentIndex, stories, stopProgress])


    const handleImageLoad = useCallback(() => {
        setIsImageLoaded(true)
    }, [])

    useEffect(() => {
        if (isImageLoaded) startProgress()
        else stopProgress()
        return () => stopProgress()
    }, [isImageLoaded, startProgress, stopProgress])

    useEffect(() => {
        if (!currentSegment) return;
        setIsImageLoaded(false)

        const img = new Image();
        img.onload = handleImageLoad
        img.onerror = () => {
            console.error('Failed to load image', currentSegment.image);
            goToNext();

        }
        img.src = currentSegment.image;


        return () => {
            img.onload = null;
            img.onerror = null;

        }
    }, [currentSegment.image, handleImageLoad, goToNext])



    const handleInteractionStart = useCallback(() => {
        stopProgress()
    }, [stopProgress])


    if (!currentStory || !currentSegment) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black z-50 flex flex-col font-sans">

                {/* Progress Bar  */}

                {/* Header With user info  */}

                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <img src={currentStory.profilePic} alt={currentStory.username}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-white text-sm font-semibold"> {currentStory.username}  </p>
                            <p className="text-gray-400 text-xs"> {currentSegment.timestamp}  </p>
                        </div>

                    </div>


                    <button onClick={onClose} className="text-white p-1 rounded-full hover:bg-grray-800  transition-colors"> <X size={24} /> </button>
                </div>

                <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                    {/* story content area  */}
                    {
                        !isImageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white">
                                </div>
                            </div>

                        )
                    }
                    {/* story image */}
                    <img src={currentSegment.image} alt="" />

                    {/* overlay for interaction  Left and Right resp */}
                    <div className="absolute inset-0 flex">
                        <div className=" flex-1 cursor-pointer"
                            onMouseDown={handleInteractionStart}
                            onMouseUp={goToPrev}
                            onTouchStart={handleInteractionStart}
                            onTouchEnd={goToPrev}
                        />
                        <div className=" flex-1 cursor-pointer"
                            onMouseDown={handleInteractionStart}
                            onMouseUp={goToNext}
                            onTouchStart={handleInteractionStart}
                            onTouchEnd={goToNext}
                        />

                    </div>

                </div>



            </div>
        </>
    )
}