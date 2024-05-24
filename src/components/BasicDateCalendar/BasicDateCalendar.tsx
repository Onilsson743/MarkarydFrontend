'use client'


import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { GetAllBookings } from '@/scripts/BookingsFetch';
import { IBooking } from '@/models/IBooking';

dayjs.extend(isBetweenPlugin);

function areDatesEqual(date1 : Date, date2 : Date) {
    // Check if both dates have the same year, month, and day
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
    isSelected: boolean;
    isHovered: boolean;
    isbetween?: boolean;
    isbefore: boolean;
    isFirst?: boolean;
    isLast?: boolean;
}

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, isbetween, isbefore, isFirst, isLast}) => ({
    borderRadius: "50%",
    fontSize: "14px",
    border: "1px solid transparent",
    ...(isSelected && {
        backgroundColor: "rgba(25,118,210, 1) !important",
        color: theme.palette.primary.contrastText,
        '&:hover, &:focus': {
            backgroundColor: "rgba(25,118,210, 1) !important",
        },
    }),
    ...(isHovered && {
        border: "1px solid rgba(0, 0, 0, 0.6)",
        '&:hover, &:focus': {
            border: "1px solid rgba(0, 0, 0, 0.6) !important",
        },
    }),
    ...(isbetween && {
        borderRadius: 0,
        backgroundColor: "rgba(25, 118, 210, 0.12)",
    }),
    ...(isbefore && {
        color: "rgba(196, 196, 196, 1)"
    }),
    ...(isFirst && {

    }),

})) as React.ComponentType<CustomPickerDayProps>;

function Day(
    props: PickersDayProps<Dayjs> & {
        selectedDay?: Dayjs | null;
        hoveredDay?: Dayjs | null;
        firstDay?: Date | null;
        lastDay?: Date | null;
        booked?: Date[] | null;
    },
) {
    const { day, selectedDay, firstDay, lastDay, hoveredDay, booked, ...other } = props;

    const selected = (day.date() == dayjs(firstDay).date() && day.month() == dayjs(firstDay).month() || day.date() == dayjs(lastDay).date() && day.month() == dayjs(lastDay).month())
    const datesBetween = (day.toDate() > dayjs(firstDay!).toDate() && day.toDate() < dayjs(lastDay).toDate())
    let isBooked = false;
    let hover = false;
    let prevday = false;

    if (hoveredDay) {
        hover = areDatesEqual(day.toDate(), hoveredDay!.toDate())
    }

    if (day.toDate() < new Date()) {
        prevday = true
    }

    if (booked){
        // isBooked = booked.includes(day.toDate())
        for(let i = 0; i < booked?.length; i++){
            if (day.date() == dayjs(booked[i]).date() && day.month() == dayjs(booked[i]).month()){
                isBooked = true;
            }
        }
    }   
    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{ px: 2.2 }}
            disableMargin
            disabled={isBooked}
            selected={false}
            isSelected={selected}
            isHovered={hover}
            isbetween={datesBetween}
            isbefore={prevday}
        />
    );
}


interface props {
    setStartDate?: Dispatch<SetStateAction<Date>>
    setEndDate?: Dispatch<SetStateAction<Date | undefined>>
}

export default function BasicDateCalendar({setStartDate, setEndDate} : props) {
    const [hoveredDay, setHoveredDay] = React.useState<Dayjs | null>(null);
    const [firstDay, setFirstDay] = useState<Dayjs | null>();
    const [lastDay, setLastDay] = useState<Dayjs | null>();
    const [bookings, setBookings] = useState<Date[]>([]);

    const fetchBookings = async () => {
        var response : Response = await GetAllBookings();
        if (response.ok) {
            var data : IBooking[] = await response.json();
            var dates : Date[] = []
            data.map(booking => {
                const setDate = new Date(booking.beginDate)
                const endDate = new Date(booking.endDate)
                
                while (setDate <= endDate) {
                    dates.push(new Date(setDate));
                    setDate.setDate(setDate.getDate() + 1)
                }
            })
            setBookings(dates);
        }      
    }

    const GetNextBookedDate = () => {
        if(firstDay) {
            const afterBookings = bookings.filter(date => date > firstDay.toDate())
            return new Date(Math.min(...afterBookings.map(x => x.getTime())))
        }
    }

    useEffect(() => {
        fetchBookings();
    },[])


    const handleDateClick = (value : Dayjs) => { 

        if (value.toDate() > (new Date()))  {
            if (!firstDay) {
                setFirstDay(value)
                setStartDate && setStartDate(value.toDate())
            } else {
                if (value.toDate() < firstDay.toDate()) {
                    setFirstDay(value)
                    setStartDate && setStartDate(value.toDate())
                } else {
                    if (!lastDay) {
                        if(bookings) {
                            const nextBooking = GetNextBookedDate()
                            if (nextBooking && value.toDate() > nextBooking) {
                                
                            } else {
                                setLastDay(value)
                                setEndDate && setEndDate(value.toDate())
                            }
                        }
                    }
                    else {                        
                        if (value.toDate() > lastDay.toDate()) {
                            if(bookings) {
                                const nextBooking = GetNextBookedDate()
                                if (nextBooking && value.toDate() > nextBooking) {
                                    
                                } else {
                                    setLastDay(value)
                                    setEndDate && setEndDate(value.toDate())
                                }
                            }
                        }
                        else {
                            var middate = new Date((firstDay.toDate().getTime() + lastDay.toDate().getTime()) / 2)
                            if (value.toDate() <= middate) {
                                setFirstDay(value)
                                setStartDate && setStartDate(value.toDate())
                            } else {
                                setLastDay(value)
                                setEndDate && setEndDate(value.toDate())
                            }
                        }
                    }
                }
            }
        }        
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                onChange={(newValue) => handleDateClick(newValue)}
                slots={{ day: Day }}
                // showDaysOutsideCurrentMonth
                slotProps={{
                    day: (ownerState) =>
                        ({
                            hoveredDay,
                            firstDay: firstDay,
                            lastDay: lastDay,
                            booked: bookings,
                            onPointerEnter: () => setHoveredDay(ownerState.day),
                            onPointerLeave: () => setHoveredDay(null),
                        }) as any,
                }}
            />
        </LocalizationProvider>
    );
}