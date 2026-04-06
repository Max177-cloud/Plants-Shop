const LOCAL_KEY = 'greenshop_users'

export async function fetchAllUsers() {
  let remote = []
  try {
    const response = await fetch('/data.json')
    if (response.ok) {
      const data = await response.json()
      remote = Array.isArray(data.users) ? data.users : []
    }
  } catch {
    // offline
  }
  let local = []
  try {
    local = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
    if (!Array.isArray(local)) local = []
  } catch {
    local = []
  }
  return [...remote, ...local]
}

export function registerLocalUser(user) {
  const list = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
  if (!Array.isArray(list)) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify([user]))
    return
  }
  list.push(user)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list))
}
