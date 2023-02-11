import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useCallback, useState, } from "react";
import { useRedesignContext } from "../redesignContext";
import { setValueByPath } from "../util/setValueByPath";
export function renderChildren(value, props) {
    if (!value || typeof value === "string")
        return value;
    if (!Array.isArray(value))
        value = [value];
    return value === null || value === void 0 ? void 0 : value.map((x, i) => typeof x === "string" ? (_jsx(Fragment, { children: x }, i)) : (_jsx(ComponentViewer, Object.assign({}, Object.assign(Object.assign({}, props), { component: x })), i)));
}
export const componentClasses = {
    h1: "mb-4 text-2xl",
    h2: "mb-2 text-xl",
    p: "mb-2",
};
export const getComponentTypeName = (elm, Components) => {
    return elm.type; //Object.keys(Components).reduce((r, c) => (elm[c as keyof typeof elm] ? c : r), undefined as string | undefined) as keyof Component | undefined;
};
export const getComponentType = (type, Components) => {
    return Components[type];
};
export function ComponentWrapper({ children, component, }) {
    const [hover, setHover] = useState(false);
    const { state: { selectedComponent }, dispatch, } = useRedesignContext();
    const elementType = component.type;
    return (_jsxs("div", Object.assign({ onMouseEnter: (e) => {
            e.preventDefault();
            e.stopPropagation();
            setHover(true);
        }, onMouseOut: (e) => {
            e.preventDefault();
            e.stopPropagation();
            setHover(false);
        }, onClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            dispatch({ type: "select_component", component });
        }, 
        //className={(component.type == 'column' && getWidth((component.props as any).width)) || 'grow'}
        style: {
            boxShadow: elementType == "visible"
                ? "1px 1px 10px gray"
                : selectedComponent == component
                    ? "1px 1px 3px green"
                    : hover
                        ? "1px 1px 3px black"
                        : "none",
            position: "relative",
            display: elementType == "link" ? "inline-block" : "block",
            margin: selectedComponent == component || hover || elementType == "visible"
                ? 10
                : 0,
        } }, { children: [_jsx("div", { style: {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    background: hover ? "rgba(255,255,255,0.6)" : "transparent",
                } }), _jsx("div", Object.assign({ style: {
                    display: hover || elementType == "visible" ? "block" : "none",
                    background: "white",
                    border: "1px solid black",
                } }, { children: _jsx("div", Object.assign({ style: { paddingLeft: 10 } }, { children: elementType == "visible"
                        ? "if(" + component.props.expression + ")"
                        : elementType })) })), children] })));
}
export function ComponentViewer(props) {
    const { setData, component } = props;
    const { state: { componentLibrary }, } = useRedesignContext();
    const ComponentType = getComponentType(component.type, componentLibrary !== null && componentLibrary !== void 0 ? componentLibrary : {});
    const handleChange = useCallback((e) => {
        const { currentTarget } = e;
        const { name, value: _value } = currentTarget;
        let value = _value;
        if ("checked" in currentTarget) {
            if (currentTarget.type === "radio" && !currentTarget.checked)
                return;
            if (currentTarget.type === "checkbox")
                value = currentTarget.checked;
        }
        setData === null || setData === void 0 ? void 0 : setData((prev) => { var _a; return setValueByPath((_a = Object.assign({}, prev)) !== null && _a !== void 0 ? _a : {}, name, value); });
    }, [setData]);
    if (!component) {
        return null;
    }
    return (_jsx(ComponentType, Object.assign({}, Object.assign(Object.assign({}, props), component.props), { handleChange: handleChange })));
}
