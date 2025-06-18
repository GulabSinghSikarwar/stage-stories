import type { StoryProgressProps } from "../../utils/app.interface";

export default function StoryProgress({ totalSlides, currentSlide, progress }: StoryProgressProps) {
    return (
        <div className="flex gap-1 px-4 py-2">
            {
                Array.from({ length: totalSlides }).map((_, index) => (
                    <div key={index} className="flex-1 h-0.5 bg-gray-500 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full"
                            style={
                                {
                                    width: index < currentSlide ? '100%' :
                                        index == currentSlide ? `${progress}%` : '0%'
                                }
                            }
                        />


                    </div>
                ))
            }

        </div>
    )
}

