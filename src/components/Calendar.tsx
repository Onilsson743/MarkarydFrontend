'use client'


import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

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
        
    })

})) as React.ComponentType<CustomPickerDayProps>;

function Day(
    props: PickersDayProps<Dayjs> & {
        selectedDay?: Dayjs | null;
        hoveredDay?: Dayjs | null;
        firstDay?: Date | null;
        lastDay?: Date | null;
        booked?: Date | null;
    },
) {
    const { day, selectedDay, firstDay, lastDay, hoveredDay, ...other } = props;

    const selected = (day.date() == dayjs(firstDay).date() || day.date() == dayjs(lastDay).date())
    const datesBetween = (day.toDate() > dayjs(firstDay!).toDate() && day.toDate() < dayjs(lastDay).toDate())
    
    let hover = false;
    if (hoveredDay) {
        hover = areDatesEqual(day.toDate(), hoveredDay!.toDate())
    }
    let prevday = false;
    if (day.toDate() < new Date) {
        prevday = true
    }
    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{ px: 2.2 }}
            disableMargin
            selected={false}
            isSelected={selected}
            isHovered={hover}
            isbetween={datesBetween}
            isbefore={prevday}
        />
    );
}



export default function BasicDateCalendar() {
    const [hoveredDay, setHoveredDay] = React.useState<Dayjs | null>(null);
    const [firstDay, setFirstDay] = useState<Dayjs | null>();
    const [lastDay, setLastDay] = useState<Dayjs | null>();
    const [chosenDate, setChosenDate] = useState<boolean>();

    const handleDateClick = (value : Dayjs) => {  
        if (value.toDate() > (new Date()))  {
            if (!firstDay) {
                setFirstDay(value)
            } else {
                if (!lastDay) {
                    setLastDay(value)
                } else {
                    if (!chosenDate ) {
                        setFirstDay(value)
                        setChosenDate(!chosenDate)
                    } else {
                        setLastDay(value)
                        setChosenDate(!chosenDate)
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
                showDaysOutsideCurrentMonth
                slotProps={{
                    day: (ownerState) =>
                        ({
                            hoveredDay,
                            firstDay: firstDay,
                            lastDay: lastDay,
                            onPointerEnter: () => setHoveredDay(ownerState.day),
                            onPointerLeave: () => setHoveredDay(null),
                        }) as any,
                }}
            />
        </LocalizationProvider>
    );
}