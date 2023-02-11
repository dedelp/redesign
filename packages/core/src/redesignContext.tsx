import * as React from "react";
import { getValueByPath } from "./util/getValueByPath";
import { Block, BlockLibrary, BlockViewer, BlockViewerProps } from "./block";
import { ParsedComponent } from "./component/parsedComponent";
import {
  ComponentLibrary,
  ComponentViewer,
  ComponentViewerProps,
} from "./component";
import { PageViewer, PageViewerProps } from "./page";
import {
  ContentFragmentViewer,
  ContentFragmentViewerProps,
} from "./content/ContentFragmentViewer";

type SelectComponentAction = {
  type: "select_component";
  component: ParsedComponent | undefined;
};
type UpdateDoc = { type: "update_doc"; doc?: Block[] };

type Action = SelectComponentAction | UpdateDoc;
type Dispatch = (action: Action) => void;

type State = {
  selectedComponent?: ParsedComponent;
  doc?: Block[];
  contexts?: React.FC<{ children: React.ReactNode }>[];
  componentLibrary: ComponentLibrary;
  blockLibrary: BlockLibrary;
  blockViewer: React.FC<BlockViewerProps>;
  contentFragmentViewer: React.FC<ContentFragmentViewerProps>;
  componentViewer: React.FC<ComponentViewerProps>;
  pageViewer: React.FC<PageViewerProps>;
};
type RedesignProviderProps = {
  contexts?: React.FC<{ children: React.ReactNode }>[];
  children: React.ReactNode;
  componentLibrary: ComponentLibrary;
  blockLibrary: BlockLibrary;
  blockViewer?: React.FC<BlockViewerProps>;
  componentViewer?: React.FC<ComponentViewerProps>;
  contentFragmentViewer?: React.FC<ContentFragmentViewerProps>;
  pageViewer?: React.FC<PageViewerProps>;
};

const RedesignStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function redesignReducer(state: State, action: Action) {
  let newState = { ...state };
  switch (action.type) {
    case "update_doc": {
      let selectedComponent = newState.selectedComponent;
      if (selectedComponent && action.doc) {
        state.selectedComponent = getValueByPath(
          action.doc as any,
          selectedComponent.path
        ) as ParsedComponent;
      }
      newState = { ...state, doc: action.doc };
      break;
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
  //state.contexts?.forEach(c => c.)
  return newState;
}

function RedesignProvider({
  children,
  componentLibrary,
  blockLibrary,
  blockViewer,
  componentViewer,
  contentFragmentViewer,
  pageViewer,
  contexts,
}: RedesignProviderProps) {
  const [state, dispatch] = React.useReducer(redesignReducer, {
    selectedComponent: undefined,
    doc: undefined,
    contexts,
    componentLibrary,
    blockLibrary,
    blockViewer: blockViewer ?? BlockViewer,
    contentFragmentViewer: contentFragmentViewer ?? ContentFragmentViewer,
    componentViewer: componentViewer ?? ComponentViewer,
    pageViewer: pageViewer ?? PageViewer,
  });
  return (
    <RedesignStateContext.Provider
      value={React.useMemo(() => ({ state, dispatch }), [state, dispatch])}
    >
      {contexts?.reverse().reduce((res, CurrContext) => {
        return <CurrContext>{res}</CurrContext>;
      }, children) ?? children}
    </RedesignStateContext.Provider>
  );
}

function useRedesignContext() {
  const context = React.useContext(RedesignStateContext);
  if (context === undefined) {
    throw new Error(
      "useRedesignContext must be used within a RedesignProvider"
    );
  }
  return context;
}

export { RedesignProvider, useRedesignContext };
