import "../App.css";
import { useState, useEffect } from "react";
import moment from "moment";





const Colander = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(null)
    const [events, setEvents] = useState({})

    const startofMonth = currentDate.clone().startOf("month");
    const endofMonth = currentDate.clone().endOf("month");
    const startDate = startofMonth.clone().startOf("week").isoWeekday(1);



    const genrateCalender = () => {
        const day = startDate.clone();
        const calender = [];

        while (day.isBefore(endofMonth.clone().endOf('week').isoWeekday(7))) {
            calender.push(
                Array(7)
                    .fill(0)
                    .map(() => day.add(1, 'day').clone())
            )
        }
        return calender;
    }



    const isTooday = (day) => day.isSame(moment(), 'day');
    const isSelected = (day) => selectedDate && day.isSame(selectedDate, 'day');

    const handlePrevMonth = () => setCurrentDate(currentDate.clone().subtract(1, 'month'));
    const handleNextMonth = () => setCurrentDate(currentDate.clone().add(1, 'month'));
    const handleSelectDate = (day) => selectedDate(day);

    const handleEventChange = (e) => {
        if (selectedDate) {
            setEvents({
                ...events,
                [selectedDate.format('YYYY-MM-DD')]: e.target.value,
            })
        }
    }

    const calender = genrateCalender();
    return (
        <div className="calender-container p-4 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth}>&lt;</button>
                <h2 className="text-xl font-bold">
                    {currentDate.format('MMMM YYYY')}
                </h2>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>

            <div className="grid grid-cols-7 text-center font-semibold">
                {['MON', 'TUE', 'WED', 'THU', 'FRI', "SAT", 'SUN'].map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 text-center">
                {
calender.map((week , i)=>(
    <React.Fragment key={i}>
        {week.map((day,ind)=(
            <div key={ind} onClick={()=> handleSelectDate(day)} className={'p-2 m-1 rounded cursor-pointer ${isToday(day) ? '}>

            </div>
        ))}
    </React.Fragment>
))
                }
            </div>
        </div>
    )
}
export default Colander;