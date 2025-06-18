import React from "react"
import type { Story } from "../../utils/app.interface.ts"

const StoryList: React.FC<{
    stories: Story[];
    onStoryClick: (index: number) => void
}> = ({ onStoryClick, stories }) => {

    return (
        <div className=" flex  gap-4 p-4 overflow-x-auto scrollbar-hide  bg-black">
            {
                stories.map((story, index) => (

                    <div
                        key={story.id}
                        className="flex-shrink-0 cursor-pointer"
                        onClick={() => onStoryClick(index)}
                    >


                        <div className="relative">
                            <div className="w-16 h-16  rounded-full bg-gradient-to-tr from-yellow-400  via-red-500 to-pink-500 p-0.5">
                                <img
                                    src={story.profilePic}
                                    className="w-full h-full rounded-full border-2 border-black object-cover"
                                    alt="" />

                            </div>

                        </div>
                        <p className="text-white text-xs text-center mt-1 truncate w-16" >
                            {
                                story.username
                            }
                        </p>
                    </div>

                ))
            }

        </div>
    )
}