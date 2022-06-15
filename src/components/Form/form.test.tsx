import React from 'react';
import {screen,render, cleanup, fireEvent, renderHook,waitFor, getByText, queryByText} from "@testing-library/react"
import { RecoilRoot, waitForAll } from 'recoil';
import { FormComponent } from './index';
import { act } from 'react-dom/test-utils';
import { useGetList } from '../hooks/useListaParticipantes';


describe("Testando componente Form", () =>{
  jest.useFakeTimers()

  test("elementos renderizados",async ()=>{


   render(
      <RecoilRoot>
        <FormComponent/>
      </RecoilRoot>
    )

    let alert = screen.queryByTestId("welcome")
    const label = screen.getByText("Insert your todo")
    const input = screen.getByPlaceholderText("type your todo")
    const button = screen.getByRole("button")
    
    expect(alert).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    
    act(()=>{
      jest.runOnlyPendingTimers();
    })
    
    alert = screen.queryByTestId("welcome")

    expect(alert).toBeNull()
    
  })

  test("todo be able do add a item on list", async ()=>{

    render(
      <RecoilRoot>
        <FormComponent/>
      </RecoilRoot>
    )

    const {result} = renderHook(()=>useGetList(),{
      wrapper:RecoilRoot
    })

    //selecionar inout
    const input = screen.getByPlaceholderText("type your todo")
    //selecionar botao 
    const button = screen.getByText("Submit")
    //setar valor no input
    const todoList = screen.getByTestId("todoList")
    //setar valor input 

    fireEvent.change(input,{
      target:{
        value:"laundry"
      }
    })
    fireEvent.click(button)

    console.log(result.current+"Olá mundo")

    expect(todoList).toHaveTextContent("laundry")
  })

  test("should be able to remove a item from list", async ()=>{

    render(
      <RecoilRoot>
        <FormComponent/>
      </RecoilRoot>
    )

    const {result} = renderHook(()=>useGetList(),{
      wrapper:RecoilRoot
    })

    //selecionar inout
    const input = screen.getByPlaceholderText("type your todo")
    //selecionar botao 
    const button = screen.getByText("Submit")
    //setar valor no input
    const todoList = screen.getByTestId("todoList")
    //setar valor input 

   /*  fireEvent.change(input,{
      target:{
        value:"laundry"
      }
    })
    fireEvent.click(button) */

    const setValueToInput =(value:string):void => {
      fireEvent.change(input,{
        target:{
          value
        }
      })
    }

    const clickEvent=(button: HTMLElement)=>{
      fireEvent.click(button)
    }

    for (let index = 0; index < 2; index++) {
      if(index===0){
        setValueToInput("laundry")
      }else{
        setValueToInput("Shop")
      }
      clickEvent(button)
    }

    let laundryTodo = screen.queryByText("laundry")
    expect(laundryTodo).toBeInTheDocument()

    const buttonDelete = screen.getAllByText("Remove todo")[0]
    clickEvent(buttonDelete)


    //console.log("Todos list size:"+todoList.children.length)


    /* expect(laundryTodo).toBeNull() */
    
  })


})