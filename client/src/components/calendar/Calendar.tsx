import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { tr } from "date-fns/locale";
import "./calendar.scss";

interface Meeting {
  id: number;
  name: string;
  imageUrl: string;
  startDatetime: string;
  endDatetime: string;
}

const meetings: Meeting[] = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-10-11T13:00",
    endDatetime: "2023-10-11T14:30",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-10-20T09:00",
    endDatetime: "2023-10-20T11:30",
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-10-20T17:00",
    endDatetime: "2023-10-20T18:30",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-06-09T13:00",
    endDatetime: "2022-06-09T14:30",
  },
  {
    id: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-10-13T14:00",
    endDatetime: "2023-10-13T14:30",
  },
];

function Calendar() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(today, "MMM-yyyy")
  );
  const firstDayCurrentMonth = parse(
    currentMonth,
    "MMM-yyyy",
    new Date()
  );

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );

  const classNames = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" ");

  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} className="md:pr-14">
            <div className="flex items-center">
              <Typography
                variant="h5"
                className="flex-auto font-semibold text-gray-900"
              >
                {format(firstDayCurrentMonth, "MMMM yyyy", { locale: tr })}
              </Typography>
              <IconButton
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={nextMonth}
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
            <Grid container justifyContent="center">
              {dayLabels.map((label, index) => (
                <Grid key={index} item className="py-1.5">
                  <Typography>{label}</Typography>
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={0} className="grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <Grid
                  key={day.toString()}
                  item
                  className={classNames(
                    "col-start-1",
                    "col-span-1",
                    "py-1.5"
                  )}
                >
                  <Button
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-red-500",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time
                      dateTime={format(day, "yyyy-MM-dd", { locale: tr })}
                    >
                      {format(day, "d", { locale: tr })}
                    </time>
                  </Button>

                  <div className="w-1 h-1 mx-auto mt-1">
                    {meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} className="mt-12 md:mt-0 md:pl-14">
            <Typography variant="h6">
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "dd MMMM yyy", { locale: tr })}
              </time>{" "}
              için Program
            </Typography>
            <List className="mt-4">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <MeetingListItem meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary="Bugün yapmanız gereken bir şey yok."
                    className="text-gray-600"
                  />
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

interface MeetingListItemProps {
  meeting: Meeting;
}

function MeetingListItem({ meeting }: MeetingListItemProps) {
  const startDateTime = parseISO(meeting.startDatetime);
  const endDateTime = parseISO(meeting.endDatetime);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={meeting.name} src={meeting.imageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={meeting.name}
        secondary={
          <>
            <time dateTime={format(startDateTime, "HH:mm")}>
              {format(startDateTime, "HH:mm")}
            </time>
            {" - "}
            <time dateTime={format(endDateTime, "HH:mm")}>
              {format(endDateTime, "HH:mm")}
            </time>
          </>
        }
      />
      <MeetingMenu />
    </ListItem>
  );
}

function MeetingMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Cancel</MenuItem>
      </Menu>
    </>
  );
}

const dayLabels = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export default Calendar;
