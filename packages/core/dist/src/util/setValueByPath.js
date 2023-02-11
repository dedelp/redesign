export function setValueByPath(obj, path, value) {
    const dot = path.indexOf('.');
    if (dot === -1) {
        obj[path] = value;
        return obj;
    }
    else {
        const childName = path.substring(0, dot);
        if (!obj[childName])
            obj[childName] = {};
        setValueByPath(obj[childName], path.substring(dot + 1), value);
        return obj;
    }
}
