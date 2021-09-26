type calcDataParam = {
  path: string,
  date: number
}

type calcDataResponce = {
  data: { [key: string]: string },
  str: string
}

type saveFigParam = {
  json_path: string,
  save_path: string
}

type saveFigResponce = {
  path: string
}

type recordStartParam = {
  subject: string,
  value: string
}

type currentJobInfo = {
  subject?: string|null,
  value?: string|null,
  startTime?: string|null
}

type recordStartGetResponce = {
  isDoing: boolean,
  jobInfo: currentJobInfo
}

type recordData = { [key: string]: {[key: string]: string }}

type recordEditParam = {
  val: recordData,
  day: number,
  path: string
}

type settingPathGetResponce = {
  path: string
}

type settingPathSetParam = {
  path: string
}

type subject = {
  name: string,
  color: string,
  sort_val: number,
  is_active: boolean
}
