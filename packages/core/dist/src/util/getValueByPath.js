export function getValueByPath(obj, path) {
    if (!obj || !path)
        return undefined;
    const dot = path.indexOf(".");
    if (dot === -1)
        return obj[path];
    return getValueByPath(obj[path.substring(0, dot)], path.substring(dot + 1));
}
