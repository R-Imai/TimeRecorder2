import axios from 'axios';
import API from "./ApiList";

export async function recordPathSet(param: settingPathSetParam) {
  await axios.post(API.UrlBase + API.Setting.RecordPath, param)
}

export async function recordPathGet() {
  const response = await axios.get<settingPathGetResponce>(API.UrlBase + API.Setting.RecordPath)
  if (response.status !== 200) {
    throw new Error("APIへの送信がエラーになりました");
  }
  return response.data.path
}

export async function getActiveSubject() {
  const response = await axios.get<subject[]>(API.UrlBase + API.Setting.Subject)
  if (response.status !== 200) {
    throw new Error("APIへの送信がエラーになりました");
  }
  const data = response.data.filter((v) => {
    return v.is_active
  }).sort((a, b) => {
    return a.sort_val - b.sort_val
  }).map((v) => {
    return v.name
  })
  return data
}

export async function getSubjectColor() {
  const response = await axios.get<subject[]>(API.UrlBase + API.Setting.Subject)
  if (response.status !== 200) {
    throw new Error("APIへの送信がエラーになりました");
  }
  const actvData = response.data.filter((v) => {
    return v.is_active
  }).sort((a, b) => {
    return a.sort_val - b.sort_val
  })
  const noteData = response.data.filter((v) => {
    return !v.is_active
  }).sort((a, b) => {
    return a.sort_val - b.sort_val
  })
  return {active: actvData, note: noteData}
}

export async function sendSubjectColor(val: subject[]) {
  await axios.put(API.UrlBase + API.Setting.Subject, val)
}
