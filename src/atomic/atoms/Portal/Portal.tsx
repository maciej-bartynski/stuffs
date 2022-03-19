import { createRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal: React.FC = ({ children }) => {

    const [element, setElement ] = useState<Element | null>(null);
    
    useEffect(() => {
        const portalContainerNode = document.querySelector('[data-selector="portal-draggable"]');
        setElement(portalContainerNode);
    }, [setElement]);

    return element && createPortal(
        children,
        element
      );
}

export default Portal;