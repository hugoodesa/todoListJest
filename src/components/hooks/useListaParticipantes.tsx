import {SetterOrUpdater, useRecoilState, useRecoilValue} from "recoil"
import { todoList } from '../../state/index';

export const useTodoList = ():[string[],SetterOrUpdater<string[]>] => {
  const [list,setTodoList] = useRecoilState<string[]>(todoList)
  return [list,setTodoList];
}

export const useGetList = ():string[] => {
  const [list,setTodoList] = useRecoilState<string[]>(todoList)
  return list
}