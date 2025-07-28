"use client";
import { useEffect, useRef } from "react";

const Banner = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        const handleUserInteraction = () => {
            if (video) {
                video.play().catch((error) => {
                    console.error("Autoplay failed:", error);
                });
            }
        };

        document.addEventListener("click", handleUserInteraction, { once: true });
        return () => {
            document.removeEventListener("click", handleUserInteraction);
        };
    }, []);

    return (              
        <div className="relative w-full h-[calc(100vh)] overflow-hidden">
            <video 
            ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                // muted
                playsInline
            >
                <source
                    src="https://res.cloudinary.com/dd0giqouc/video/upload/v1753682323/MicrosoftTeams-video_1_tv8yym.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>

        </div>
    );
};

export default Banner;