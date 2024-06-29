import { useState } from "react";

const Tooltip = (
    { children, description, direction = "bottom", color = "black", className }
        :
        { children: React.ReactNode, description: string, direction?: "bottom" | "left" | "right" | "top", color?: string | "white" | "black", className?: string }) => {

    const [showDescription, setShowDescription] = useState<boolean>(false);

    return (
        <div className={`position-relative ${className}`} onMouseOver={_ => setShowDescription(true)} onMouseOut={_ => setShowDescription(false)}>
            {showDescription && <span style={{ color }} className={`position-absolute ${direction}-0 mb-3 p-2 min-w-160 bg-white rounded-pill fs-14`}>{description}</span>}
            {children}
        </div>
    );
}

export default Tooltip;