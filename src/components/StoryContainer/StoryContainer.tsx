import type React from "react";
import { useCallback, useEffect, useState } from "react";
import type { Story } from "../../utils/app.interface";
import StoryViewer from "../StoryViewer/StoryViewer";
import StoryList from "../StoryList/StoryList";
import { mockStories } from "../../utils/app.constants";
const StoryContainer: React.FC = () => {

    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true)
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null)

    useEffect(() => {
        const fetchStories = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000))
                setStories(mockStories)
            } catch (error) {
                console.error('Failed To Fetch Stories : ', error);

            }
            finally {
                setLoading(false)
            }
        }


        fetchStories()
    }, [])

    const handleStoryClick = useCallback((index: number) => {
        setSelectedStoryIndex(index)

    }, [])

    const handleStoryClose = useCallback(() => {
        setSelectedStoryIndex(null)
    }, [])


    if (loading) {
        return (
            <div className="h-screen w-screen bg-black  flex items-center justify-center font-sans">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white "></div>
            </div>
        )
    }


    return (
        <div className="h-screen w-screen  bg-black overflow-hidden font-sans">

            <div className="h-full flex flex-col">
                <div className="flex-none">
                    {/* StoryList */}
                    <StoryList
                        stories={stories}
                        onStoryClick={handleStoryClick}
                    />

                </div>
            </div>

            {
                selectedStoryIndex != null && (
                    // StoryViewr
                    <StoryViewer
                        stories={stories}
                        initialIndex={selectedStoryIndex}
                        onClose={handleStoryClose}
                    />
                )
            }
        </div>

    )

}

export default StoryContainer