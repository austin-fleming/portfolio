type GenericObject = Record<string, unknown>;

export const objectsDeeplyEqual = (objectA: GenericObject, objectB: GenericObject) =>
	JSON.stringify(objectA) === JSON.stringify(objectB);
