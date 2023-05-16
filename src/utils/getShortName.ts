export function getShortName(name: string) {
  const splittedName = name.trim().toUpperCase().split(' ')

  if (splittedName.length > 1) {
    return `${splittedName[0][0]}${splittedName[splittedName.length - 1][0]}`
  }

  return `${splittedName[0][0]}`
}
