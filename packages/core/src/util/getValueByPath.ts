export function getValueByPath(
  obj: Record<string, unknown> | undefined,
  path: string
): unknown {
  if (!obj || !path) return undefined;
  const dot = path.indexOf(".");
  if (dot === -1) return obj[path];
  return getValueByPath(
    obj[path.substring(0, dot)] as Record<string, undefined>,
    path.substring(dot + 1)
  );
}
