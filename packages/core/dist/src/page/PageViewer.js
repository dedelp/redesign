import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRedesignContext } from "../..";
export const PageViewer = ({ page }) => {
    var _a;
    const { state: { blockViewer: BlockViewer, blockLibrary }, } = useRedesignContext();
    return (_jsxs(_Fragment, { children: ["Page", (_a = page.blocks) === null || _a === void 0 ? void 0 : _a.map((name, ix) => {
                const block = blockLibrary === null || blockLibrary === void 0 ? void 0 : blockLibrary[name];
                return block ? (_jsx(BlockViewer, { block: block }, ix)) : (_jsxs(_Fragment, { children: ["Cannot find ", name] }));
            })] }));
};
