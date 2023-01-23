import dayjs from "dayjs";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"

interface SummaryTableProps {
  summary: {
    id: string;
    date: string;
    completed: number;
    amount: number;
  }[]
}

export function SummaryTable({ summary }: SummaryTableProps) {

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const summaryDates = generateDatesFromYearBeginning()

  const minimumSummaryDatesSize = 18 * 7 // 18 weeks
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

  return (
    <div className="w-full flex">
      <ul className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((dayWeek, index) => (
          <li
            key={`${weekDays[index]}-${index}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {dayWeek}
          </li>
        ))}
      </ul>

      <div className="grid grid-rows-7 grid-flow-col gap-3">

        {
          summary.length && summaryDates.map(date => {

            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day')
            })

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            )
          })
        }

        {amountOfDaysToFill && Array.from({ length: amountOfDaysToFill }).map((_, index) => (
          <div key={index} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
        ))}

      </div>
    </div>
  )
}