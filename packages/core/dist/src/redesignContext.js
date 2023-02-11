import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { getValueByPath } from "./util/getValueByPath";
import { BlockViewer } from "./block";
import { ComponentViewer, } from "./component";
import { PageViewer } from "./page";
import { ContentFragmentViewer, } from "./content/ContentFragmentViewer";
const RedesignStateContext = React.createContext(undefined);
function redesignReducer(state, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "update_doc": {
            let selectedComponent = newState.selectedComponent;
            if (selectedComponent && action.doc) {
                state.selectedComponent = getValueByPath(action.doc, selectedComponent.path);
            }
            newState = Object.assign(Object.assign({}, state), { doc: action.doc });
            break;
        }
        default: {
            throw new Error(`Unhandled action type: ${action}`);
        }
    }
    //state.contexts?.forEach(c => c.)
    return newState;
}
function RedesignProvider({ children, componentLibrary, blockLibrary, blockViewer, componentViewer, contentFragmentViewer, pageViewer, contexts, }) {
    var _a;
    const [state, dispatch] = React.useReducer(redesignReducer, {
        selectedComponent: undefined,
        doc: undefined,
        contexts,
        componentLibrary,
        blockLibrary,
        blockViewer: blockViewer !== null && blockViewer !== void 0 ? blockViewer : BlockViewer,
        contentFragmentViewer: contentFragmentViewer !== null && contentFragmentViewer !== void 0 ? contentFragmentViewer : ContentFragmentViewer,
        componentViewer: componentViewer !== null && componentViewer !== void 0 ? componentViewer : ComponentViewer,
        pageViewer: pageViewer !== null && pageViewer !== void 0 ? pageViewer : PageViewer,
    });
    return (_jsx(RedesignStateContext.Provider, Object.assign({ value: React.useMemo(() => ({ state, dispatch }), [state, dispatch]) }, { children: (_a = contexts === null || contexts === void 0 ? void 0 : contexts.reverse().reduce((res, CurrContext) => {
            return _jsx(CurrContext, { children: res });
        }, children)) !== null && _a !== void 0 ? _a : children })));
}
function useRedesignContext() {
    const context = React.useContext(RedesignStateContext);
    if (context === undefined) {
        throw new Error("useRedesignContext must be used within a RedesignProvider");
    }
    return context;
}
export { RedesignProvider, useRedesignContext };
