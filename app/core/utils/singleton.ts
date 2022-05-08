export const makeSingleton = <T>(define: () => T, name: string = "singleton") => {
  let val: T | undefined
  return () => {
    if (val === undefined) {
      val = define()
    }
    return val as T
  }
}
