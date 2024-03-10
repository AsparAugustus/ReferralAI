import { StyledSmallText } from "../Report/report.styles";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const isDigit = (number: number) => number < 10;
const getDateMinutes = (minute: number) =>
  isDigit(minute) ? `0${minute}` : minute;
const getWeekDayName = (day: number) => weekDays[day];
const getMonthName = (month: number) => monthNames[month];
const getClockTime = (date: Date) =>
  `${date.getHours()}:${getDateMinutes(date.getMinutes())}`;

const formatDateTime = (dateTime: number) => {
  const date = new Date(dateTime);
  const nameOfDay = getWeekDayName(date.getDay());
  const day = date.getDate();
  const nameOfMonth = getMonthName(date.getMonth());
  const time = getClockTime(date);
  return `${nameOfDay}, ${day} ${nameOfMonth} - ${time}`;
};

const DateTime: React.FC<{
  dateTime: number | undefined;
}> = ({ dateTime }) => {
  if (!dateTime) return null;

  return <StyledSmallText>{formatDateTime(dateTime)}</StyledSmallText>;
};

export default DateTime;
