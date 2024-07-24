export function buildRoutePath(path) {
  const routeParametersPath = /:([a-zA-Z]+)/g
  const pathWithParams = path.replace(routeParametersPath, '(?<$1>[a-z0-9\-_]+)')
  const regexPath = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return regexPath
}