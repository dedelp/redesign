import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useRedesignContext } from "../redesignContext";
export const BlockViewer = ({ block }) => {
    var _a;
    const { state: { contentFragmentViewer: ContentFragmentViewer }, } = useRedesignContext();
    return (_jsx(_Fragment, { children: block.type == "RedesignBlock"
            ? (_a = block.children) === null || _a === void 0 ? void 0 : _a.map((c, ix) => (_jsx(ContentFragmentViewer, { fragment: c }, ix)))
            : block.content }));
};
