export const generateStringFromLastNames = (
  name1: string,
  name2: string
): string => {
  const lastName1 = name1.split(' ').pop() || ''
  const lastName2 = name2.split(' ').pop() || ''
  return `${lastName1}-${lastName2}`
}

// gen num from 1 to n
export const genArrayNumber = (count: number) => {
  return Array.from({ length: count }, (_, i) => i + 1)
}
