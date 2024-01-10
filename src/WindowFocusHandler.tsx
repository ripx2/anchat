import { useEffect, useState } from "react";

const WindowFocusHandler = () => {
    const [windowVisibility, setWindowVisibility] = useState<boolean>(true)
    // User has switched back to the tab
    const onFocus = () => {
        setWindowVisibility(true)
        console.log("Tab is in focus");
    };
    // User has switched away from the tab (AKA tab is hidden)
    const onBlur = () => {
        setWindowVisibility(false)
        console.log("Tab is blurred");
    };

    useEffect(() => {
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
    }, []);

    return windowVisibility;
};

export default WindowFocusHandler;