import axios from 'axios';
import API from "./ApiList";

export async function dailyCalc(query: calcDataParam): Promise<string> {
  const response = await axios.get<calcDataResponce>(API.UrlBase + API.Calc.Daily, {params: query})
  if (response.status !== 200) {
    throw new Error("APIへの送信がエラーになりました");
  }
  return response.data.str
}

export async function save(query: saveFigParam): Promise<string> {
  const response = await axios.get<saveFigResponce>(API.UrlBase + API.Calc.Save, {params: query})
  if (response.status !== 200) {
    throw new Error("APIへの送信がエラーになりました");
  }
  return API.UrlBase + "/" + response.data.path
}
