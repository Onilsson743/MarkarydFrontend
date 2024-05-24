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
import { IsDateBooked } from '@/functions/ValidateBookings';
import book from '@/app/book/page';

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
    isbefore: boolean ;
    isFirst?: boolean;
    isLast?: boolean;
}

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, isbetween, isbefore}) => ({
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
    })

})) as React.ComponentType<CustomPickerDayProps>;

function Day(
    props: PickersDayProps<Dayjs> & {
        selectedDay?: Dayjs | null;
        hoveredDay?: Dayjs | null;
        firstDay?: Date | null;
        lastDay?: Date | null;
        booked?: Date[] | null;
        bookings?: IBooking[];
    },
) {
    const { day, selectedDay, firstDay, lastDay, hoveredDay, booked, bookings, ...other } = props;
    let isBooked = false;
    let hover = false;
    let prevday : boolean = false;

    const selected : boolean = (day.date() == dayjs(firstDay).date() && day.month() == dayjs(firstDay).month() || day.date() == dayjs(lastDay).date() && day.month() == dayjs(lastDay).month())
    const datesBetween : boolean = (day.toDate() > dayjs(firstDay!).toDate() && day.toDate() < dayjs(lastDay).toDate())
    
    if(bookings) {
        isBooked = IsDateBooked(bookings, day.toDate())
    }

    if (hoveredDay) {
        hover = areDatesEqual(day.toDate(), hoveredDay!.toDate())
    }

    if (day.toDate() < new Date()) {
        prevday = true
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
    const [existingBookings, setExistingBookings] = useState<IBooking[]>();
    

    const fetchBookings = async () => {
        var response: Response = await GetAllBookings();
        if(response.ok) {
            var data = await response.json();
            setExistingBookings(data)
        }
    }
    
    const GetNextBookedDate = () => {
        if(firstDay && existingBookings && existingBookings.length > 0) {
            var futureBookings : Date[]= []
            existingBookings.map(booking => {
                const beginDate = new Date(booking.beginDate)
                if(beginDate > firstDay.toDate()) {
                    futureBookings.push(beginDate)
                }
            })
            return new Date(Math.min(...futureBookings.map(x => x.getTime())))
        }
    }
    const GetPrevBookedDate = () => {
        if(firstDay && existingBookings && existingBookings.length > 0) {
            var prevBookings : Date[]= []
            existingBookings.map(booking => {
                const beginDate = new Date(booking.beginDate)
                if(beginDate < firstDay.toDate()) {
                    prevBookings.push(beginDate)
                }
            })
            return new Date(Math.max(...prevBookings.map(x => x.getTime())))
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
                        if(existingBookings) {
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
                            if(existingBookings) {
                                const nextBooking = GetNextBookedDate()
                                if (nextBooking && value.toDate() > nextBooking) {
                                    setFirstDay(value)
                                    setStartDate && setStartDate(value.toDate())
                                    setLastDay(null)
                                    setEndDate && setEndDate(undefined)                                    
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
                            bookings: existingBookings,
                            onPointerEnter: () => setHoveredDay(ownerState.day),
                            onPointerLeave: () => setHoveredDay(null),
                        }) as any,
                }}
            />
        </LocalizationProvider>
    );
}