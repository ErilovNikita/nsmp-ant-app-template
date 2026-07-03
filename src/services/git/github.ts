export const getLastReleaseTag = async (
  owner: string,
  repo: string
): Promise<string> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`)

    if (!response.ok) throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    const data:any[] = await response.json()
    const releases = data.filter((item: any) => item.prerelease === false)

    if (!releases) throw new Error('Некорректный ответ GitHub API: отсутствует tag_name')
    if (!releases[0]) throw new Error('Релизы отсутствуют')

    return releases[0].tag_name
  } catch (error) {
    throw new Error(`Не удалось получить последнюю версию: ${(error as Error).message}`)
  }
}