import {atom} from "recoil"

export const todoList = atom<string[]>({
  key:"listaParticipantes",
  default:[]
})