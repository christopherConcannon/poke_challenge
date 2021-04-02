import { typeColors } from '../styles/typeColors'

export const getTypeColor = (typeName) => {
  // loop over typeColors object keys and find the key corresponding to the type name of this particular button
  const colorKey = Object.keys(typeColors).find((typeKey) => typeKey === typeName)
  // return the color value in the typeColors object at the found key 
  return typeColors[colorKey]
}