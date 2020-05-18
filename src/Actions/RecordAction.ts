import axios from 'axios';
import API from "./ApiList";

export async function recordStart(param: recordStartParam) {
  await axios.post(API.UrlBase + API.Record.Start, param)
}

export async function recordClear(){
  await axios.delete(API.UrlBase + API.Record.Start)
}

export async function recordStartGet() {
  const response = await axios.get<recordStartGetResponce>(API.UrlBase + API.Record.Start)
  if (response.status !== 200) {
    throw new Error("APIへの送信がエラーになりました");
  }
  return response.data
}

export async function recordEnd() {
  await axios.post(API.UrlBase + API.Record.End)
}

export async function recordGet(path: string, day: number){
  const params = {params: {path: path, day: day}}
  const response = await axios.get<recordData>(API.UrlBase + API.Record.Get, params)
  if (response.status !== 200) {
    throw new Error("APIへの送信がエラーになりました");
  }
  return response.data
}

export async function recordEdit(param: recordEditParam) {
  await axios.post(API.UrlBase + API.Record.Edit, param)
}
