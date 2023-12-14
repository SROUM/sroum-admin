export function mapToObject(map: Map<string, any>): IndexedObject {
  const obj: IndexedObject = {};
  map.forEach((value, key) => {
    obj[key] = value;
  });

  return obj;
}
