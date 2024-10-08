import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import "react-quill/dist/quill.snow.css";


export default function CustomQuill() {
    const [content, setContent] = useState('')

    const handleQuillChange = useCallback((value : string)=> {
        setContent(value)
    },[])
    
    return (
        <div>
        <QuillNoSSRWrapper value={content} onChange={handleQuillChange} />
      </div>
    )
}