import { FormEvent, useState } from "react";
import { Check } from "phosphor-react";

import * as Checkbox from "@radix-ui/react-checkbox";
import { api } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function NewHabitForm() {
  const [title, setTitle] = useState("")
  const [weekDays, setWeekDays] = useState<number[]>([])

  const availableWeekDays = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
    () => api.post('/habits', { title, weekDays }),
    {
      retry: false,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['summary'] })
        setTitle("")
        setWeekDays([])
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )

  const createNewHabit = async (event: FormEvent) => {
    event.preventDefault()
    mutate()
  }

  const handleToggleWeekDay = (weekDay: number) => {
    if (weekDays.includes(weekDay)) {
      setWeekDays(prevState => prevState.filter(day => day !== weekDay))
      return
    }
    setWeekDays(prevState => [...prevState, weekDay])
  }

  return (
    <form className="w-full flex flex-col mt-4" onSubmit={createNewHabit}>
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        name="title"
        className="p-2 text-1xl rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        placeholder="ex: Exercícios, dormir bem, etc..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        autoFocus
      />

      <label className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-3 mt-6">
        {availableWeekDays.map((dayWeek, index) => (
          <Checkbox.Root
            key={dayWeek}
            checked={weekDays.includes(index)}
            className='flex items-center gap-3 group'
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className='w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500'>
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className='text-white leading-tight'>
              {dayWeek}
            </span>
          </Checkbox.Root>
        ))}
      </div>

      <button type="submit" className="mt-4 rounded-lg p-2 flex items-center justify-center gap-3 font-semibold text-1xl bg-green-600 hover:bg-green-500">
        {isLoading ? 'Criando...' : (
          <>
            <Check size={18} weight="bold" />
            Confirmar
          </>
        )
        }
      </button>
    </form>
  )
}