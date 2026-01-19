export interface ITask {
  title: string
  content: string
  status: string
}

export interface IStatus {
  status: string
}

export interface ITag {
  tag: string
}

export interface IFilterTask {
  keyword: string
  status: string
}
