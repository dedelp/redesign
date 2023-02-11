import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useRedesignContext } from "../redesignContext";
export const ContentFragmentViewer = ({ fragment, }) => {
    const { state: { componentViewer: ComponentViewer }, } = useRedesignContext();
    if (Array.isArray(fragment))
        return (_jsx(_Fragment, { children: fragment.map((f, ix) => (_jsx(ContentFragmentViewer, { fragment: f }, ix))) }));
    if (typeof fragment == "string")
        return _jsx(_Fragment, { children: fragment });
    return _jsx(ComponentViewer, { component: fragment });
};
