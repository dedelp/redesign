export function setValueByPath(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const dot = path.indexOf('.');
  if (dot === -1) {
    obj[path] = value;
    return obj;
  } else {
    const childName = path.substring(0, dot);
    if (!obj[childName]) obj[childName] = {};
    setValueByPath(obj[childName] as Record<string, unknown>, path.substring(dot + 1), value);
    return obj;
  }
}
