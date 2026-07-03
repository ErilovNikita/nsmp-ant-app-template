export const compareVersions = (localVersion: string, remoteVersion: string): -1 | 0 | 1 => {
  const parse = (v: string) => v.split('.').map(n => parseInt(n, 10))

  for (let i = 0; i < 3; i++) {
    const localNum = parse(localVersion)[i] ?? 0
    const remoteNum = parse(remoteVersion)[i] ?? 0

    if (localNum < remoteNum) return -1
    if (localNum > remoteNum) return 1
  }

  return 0
}