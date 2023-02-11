import {
  ChangeEvent,
  FormEvent,
  Fragment,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import { ComponentLibrary } from ".";
import { ContentFragment } from "../content";
import { useRedesignContext } from "../redesignContext";
import { setValueByPath } from "../util/setValueByPath";
import { ParsedComponent } from "./parsedComponent";

export type ComponentViewerProps = {
  errors?: Record<string, string | undefined>;
  onSubmit?: any; //(e: MouseEvent<HTMLButtonElement>) => void;
  setData?: any; //Dispatch<SetStateAction<Record<string, unknown>>>;
  component: ParsedComponent;
};

export type HasChildren = { children?: ContentFragment };

export function renderChildren(value: ContentFragment | undefined, props: any) {
  if (!value || typeof value === "string") return value;
  if (!Array.isArray(value)) value = [value as unknown as ParsedComponent];
  return value?.map((x, i) =>
    typeof x === "string" ? (
      <Fragment key={i}>{x}</Fragment>
    ) : (
      <ComponentViewer key={i} {...({ ...props, component: x } as any)} />
    )
  );
}

export const componentClasses: Record<string, string> = {
  h1: "mb-4 text-2xl",
  h2: "mb-2 text-xl",
  p: "mb-2",
};

export const getComponentTypeName = (
  elm: ParsedComponent,
  Components: ComponentLibrary
) => {
  return elm.type; //Object.keys(Components).reduce((r, c) => (elm[c as keyof typeof elm] ? c : r), undefined as string | undefined) as keyof Component | undefined;
};
export const getComponentType = (
  type: string,
  Components: ComponentLibrary
) => {
  return Components[type as keyof typeof Components];
};

export function ComponentWrapper({
  children,
  component,
}: {
  children: React.ReactNode;
  component: ParsedComponent;
}) {
  const [hover, setHover] = useState(false);
  const {
    state: { selectedComponent },
    dispatch,
  } = useRedesignContext();
  const elementType = component.type;
  return (
    <div
      onMouseEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setHover(true);
      }}
      onMouseOut={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setHover(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ type: "select_component", component });
      }}
      //className={(component.type == 'column' && getWidth((component.props as any).width)) || 'grow'}
      style={{
        boxShadow:
          elementType == "visible"
            ? "1px 1px 10px gray"
            : selectedComponent == component
            ? "1px 1px 3px green"
            : hover
            ? "1px 1px 3px black"
            : "none",
        position: "relative",
        display: elementType == "link" ? "inline-block" : "block",
        margin:
          selectedComponent == component || hover || elementType == "visible"
            ? 10
            : 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          background: hover ? "rgba(255,255,255,0.6)" : "transparent",
        }}
      ></div>
      <div
        style={{
          display: hover || elementType == "visible" ? "block" : "none",
          background: "white",
          border: "1px solid black",
        }}
      >
        <div style={{ paddingLeft: 10 }}>
          {elementType == "visible"
            ? "if(" + (component.props as any).expression + ")"
            : elementType}
        </div>
      </div>
      {children}
    </div>
  );
}

export function ComponentViewer(props: ComponentViewerProps) {
  const { setData, component } = props;
  const {
    state: { componentLibrary },
  } = useRedesignContext();
  const ComponentType = getComponentType(
    component.type,
    componentLibrary ?? {}
  ) as any;

  const handleChange = useCallback(
    (
      e:
        | ChangeEvent<HTMLSelectElement>
        | FormEvent<HTMLInputElement>
        | MouseEvent<HTMLInputElement>
    ) => {
      const { currentTarget } = e;
      const { name, value: _value } = currentTarget;
      let value: string | boolean | undefined = _value;
      if ("checked" in currentTarget) {
        if (currentTarget.type === "radio" && !currentTarget.checked) return;
        if (currentTarget.type === "checkbox") value = currentTarget.checked;
      }
      setData?.((prev: Record<string, unknown>) =>
        setValueByPath({ ...prev } ?? {}, name, value)
      );
    },
    [setData]
  );
  if (!component) {
    return null;
  }
  return (
    <ComponentType
      {...{ ...props, ...component.props }}
      handleChange={handleChange}
    />
  );
}
