import React, { useState, FC, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import {
  Button,
  Typography,
  TextField,
  makeStyles,
  GridList,
  GridListTile,
  AppBar,
  Toolbar
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import {
  addDays,
  getDaysInMonth,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addMonths,
  format,
  isSameDay
} from "date-fns";
import clsx from "clsx";
import TodoDrawer from "./TodoDrawer";

var dateFormat = require("dateformat");

const useStyle = makeStyles(theme => ({
  mobile: {
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "red",
      display: "none"
    }
  },
  calendar: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5%",
      padding: "40px"
    }
  },
  gridList: {
    width: 550,
    height: 350
  },
  border: {
    [theme.breakpoints.up("sm")]: {
      border: 0,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      borderRadius: 1,
      padding: "10px",
      display: "flex"
    },
    display: "none"
  },
  textCenter: {
    justifyContent: "center"
  },
  paddingTop60px: {
    paddingTop: "60px"
  },
  paddingTop14: {
    padding: "14px"
  },
  arrowDown: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 30,
    borderRightWidth: "tomato",
    borderBottomWidth: 30,
    borderLeftWidth: 0,
    borderTopColor: "transparent",
    borderRightColor: "tomato",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    content: ""
  },
  mark: {
    position: "relative",
    [theme.breakpoints.up("xs")]: {
      "&::before ,&::after": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        borderColor: "transparent",
        borderStyle: "solid",
        display: "block"
      },
      "&::before": {
        content: "''",
        borderWidth: "7px",
        borderLeftColor: theme.palette.error.dark,
        borderTopColor: theme.palette.error.dark
      }
    },
    [theme.breakpoints.down("xs")]: {
      "&::before": {
        borderColor: "transparent"
      }
    }
  }
}));

interface dateList {
  date: Date;
  desc: string;
}
const CalendarTheme: React.FC = props => {
  var numberOfDay;
  const classes = useStyle(props);
  const [currentMonth, setCurrenMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todoDrawer, setTodoDrawer] = useState(false);
  const [marks, setMarks] = useState<dateList[]>([]);
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });


  const test = (descEvent: any) => {
    console.log("test ", descEvent, selectedDate);
    // let dateEvent = format(new Date(currentMonth), "dd mmmm yyyy")
    setMarks([...marks, { date: selectedDate, desc: descEvent }]);
  };

  const showPopup = (day: any) => {
    const updateDate = selectedDate;
    console.log("update : ", day);

    setTodoDrawer(true);
    setSelectedDate(day);
  };

  // const changeFormatTime = (time: any) => {
  //   const testTimeFormat = dateFormat(time, "dd mmmm yyyy");
  //   return testTimeFormat;
  // };

  const formatMonth = (date: any) => {
    const month = dateFormat(date, "mmmm yyyy");
    return month;
  };

  const handleSwitchMonth = (direction: string): void => {
    if (direction === "next") {
      setCurrenMonth(addMonths(currentMonth, 1));
    } else {
      setCurrenMonth(addMonths(currentMonth, -1));
    }
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.textCenter}>
          <IconButton
            disabled={currentMonth.getMonth() === 0}
            onClick={() => handleSwitchMonth("previous")}
          >
            {`<`}
          </IconButton>
          <Typography variant="h6">{formatMonth(currentMonth)}</Typography>
          <IconButton
            disabled={currentMonth.getMonth() === 11}
            onClick={() => handleSwitchMonth("next")}
          >
            {">"}
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className={clsx(classes.mobile, classes.paddingTop60px)}>
        {daysInMonth.map(day => {
          return (
            <TextField
              className={classes.paddingTop14}
              defaultValue={day.getDate()}
              onClick={() => showPopup(day)}
              fullWidth
            ></TextField>
          );
        })}
      </div>

      {/* desktop */}
      <div className={classes.calendar}>
        <GridList cellHeight={50} className={classes.gridList} cols={7}>
          {daysInMonth.map(day => {
            return (
              <GridListTile cols={1}>
                <TextField
                  defaultValue={day.getDate()}
                  className={clsx(classes.border)}
                  onClick={() => showPopup(day)}
                >
                </TextField>
              </GridListTile>
            );
          })}
        </GridList>
      </div>
      <TodoDrawer
        isOpen={todoDrawer}
        onClose={() => setTodoDrawer(false)}
        test={() => test("Hello")}
      />
    </div>
  );
};

export default CalendarTheme;
