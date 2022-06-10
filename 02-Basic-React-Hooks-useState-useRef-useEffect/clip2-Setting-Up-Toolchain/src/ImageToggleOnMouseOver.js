import React, {useRef} from "react";

function ImageToggleOnMouseOver({primaryImage, secondaryImage}) {

    const imageRef = useRef(null);

    return (
        <img onMouseOver={() => {
            imageRef.current.src = secondaryImage;
        }} onMouseOut={() => {
            imageRef.current.src = primaryImage;
        }}
             src={primaryImage}
             alt="" ref={imageRef}/>
    )
}

export default ImageToggleOnMouseOver;