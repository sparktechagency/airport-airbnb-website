"use client"
import { useRef } from "react";
import JoditEditor from 'jodit-react'; 

const RoomDetails = ({content , setContent}:{content:string , setContent:(content:string)=>void}) => {
    const editor = useRef(null);


    const config = {
        readonly: false,
        placeholder: 'Start typings...',
        style: {
            height: 400,
            background: 'white',
        },
    };
    return (
            <div>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={() => {}}
                />
            </div>
    );
};

export default RoomDetails;