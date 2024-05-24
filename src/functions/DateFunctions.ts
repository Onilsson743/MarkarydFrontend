export const GetMonthName = (day: number) => {
  switch (day) {
    case 0:
      return "Januari"
    case 1:
      return "Februari"
    case 2:
      return "Mars"
    case 3:
      return "April"
    case 4:
      return "Maj"
    case 5:
      return "Juni"
    case 6:
      return "Juli"
    case 7:
      return "Augusti"
    case 8:
      return "September"
    case 9:
      return "Oktober"
    case 10:
      return "November"
    case 11:
      return "December"
  }
}

export const FormatDate = (date : Date) => {

  const newDate = new Date(date)
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
  const day = String(newDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}