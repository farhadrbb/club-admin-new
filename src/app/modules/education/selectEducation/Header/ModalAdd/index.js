import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "./../../../../../common/components/datePickerWithError";
import { education_insert_newCourse } from "../../../../../../redux/education/education_insert-Newcourse";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../../common/method/handleNotificationAlert";
import { convertDigitToEnglish } from "../../../../../common/method/convertDigitToEnglish";
import { useDispatch } from "react-redux";
import { actionTypes as coursesSelect } from "../../../../../../redux/education/education_course_select/index";

const useStyles = makeStyles(theme => ({
  ModalAdd: {
    width: 930,
    borderRadius: 8,
    padding: 15,
    backgroundColor: "white",
    maxHeight: 797,
    minWidth: 600,
    overflow: "auto"
  },
  root: {
    padding: "0px 0",
    display: "flex",
    flexWrap: "wrap",
    width: "85%",
    margin: "auto",
    "& .MuiBox-root": {
      margin: "2px 1%"
    }
  },
  btns: {
    margin: "10px 0 10px 0",
    textAlign: "right",
    width: "95%"
  }
}));

export default function Index({ setNewButton, apiCoursesInsert }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setstate] = useState({
    Name: "",
    is_active: "TRUE",
    holding_days: "",
    start_date: null,
    end_date: null,
    registration_start_date: null,
    registration_end_date: null,
    holding_time: "",
    category: "",
    hours: null,
    teacher_name: "",
    explanations: "",
    external_links: "",
    cost: null,
    required_bonus: null,
    min_participants: null,
    max_participants: null,
    location: "",
    remained_capacity: null
  });
  const [date, setDate] = useState();
  useEffect(() => {
    let days = new Date();
    days.setDate(days.getDate() + 1);
    setDate(days);
  }, []);

  const handelCHnage = (data, type) => {
    let value = data;

    setstate(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handelSubmit = () => {
    let obj = {};
    Object.keys(state).forEach(element => {
      if (state[element] && state[element] !== " " && state[element] !== "  ") {
        obj[element] = state[element];
      }
    });

    education_insert_newCourse(state)
      .then(result => {
        let isOK = handleNotificationAlertTryUpdate(result);
        if (!isOK) {
          return;
        }

        setTimeout(() => {
          dispatch({ type: coursesSelect.educationCourseSelectAsync });
        }, 1000);
      })
      .catch(err => {
        handleNotificationAlertCatch();
      });
    // apiCoursesInsert(state)
    setNewButton(false);
  };
  return (
    <div className={classes["ModalAdd"]}>
      <div className={classes["root"]}>
        <Box width="100%">
          <TextField
            value={state.Name}
            label="?????????? ???????? ????????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            onChange={event => handelCHnage(event.target.value, "Name")}
            required
            error={
              state.Name !== "" && state.Name !== " " && state.Name !== "  "
                ? false
                : true
            }
            helperText={
              state.Name !== "" && state.Name !== " " && state.Name !== "  "
                ? null
                : " ???? ???????? ?????? ???????? ???????????? ??????"
            }
          />
        </Box>

        <Box width="30%">
          <TextField
            // value={state.is_active}
            id="standard-select-currency"
            select
            label={"?????????? ????????"}
            value={state.is_active}
            // onChange={handleChange}
            helperText=""
            size="small"
            fullWidth
            variant="outlined"
            margin="dense"
            onChange={event => handelCHnage(event.target.value, "is_active")}
          >
            <MenuItem value="TRUE">????????</MenuItem>
            <MenuItem value="FALSE">?????? ????????</MenuItem>
          </TextField>
        </Box>

        <Box width="66%">
          <TextField
            value={state.holding_days}
            label="???????????? ??????????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            onChange={event => handelCHnage(event.target.value, "holding_days")}
          />
        </Box>

        <Box width="23%">
          {/*<DatePicker*/}
          {/*  minDate={new Date()}*/}
          {/*  label="?????????? ???????? ????????"*/}
          {/*  value={*/}
          {/*    state.start_date?.includes("undefined") ? null : state.start_date*/}
          {/*  }*/}
          {/*  required*/}
          {/*  error={*/}
          {/*    state.start_date !== "" &&*/}
          {/*    state.start_date !== " " &&*/}
          {/*    state.start_date !== "  " &&*/}
          {/*    state.start_date !== null &&*/}
          {/*    !state.start_date?.includes("undefined")*/}
          {/*      ? false*/}
          {/*      : true*/}
          {/*  }*/}
          {/*  helperText={*/}
          {/*    state.start_date !== "" &&*/}
          {/*    state.start_date !== " " &&*/}
          {/*    state.start_date !== "  " &&*/}
          {/*    state.start_date !== null &&*/}
          {/*    !state.start_date?.includes("undefined")*/}
          {/*      ? null*/}
          {/*      : " ???? ???????? ?????? ???????? ???????????? ??????"*/}
          {/*  }*/}
          {/*  setValue={data =>*/}
          {/*    handelCHnage(*/}
          {/*      `${convertDigitToEnglish(*/}
          {/*        data?.format("YYYY/MM/DD")*/}
          {/*      )} 00:00:00.000000`,*/}
          {/*      "start_date"*/}
          {/*    )*/}
          {/*  }*/}
          {/*>*/}
          {/*  /!* {data => handelCHnage(`${data}` , 'start_date')} *!/*/}
          {/*</DatePicker>*/}
          <TextField
            value={state.start_date}
            label="?????????? ???????? ????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            required
            error={
              state.start_date !== "" &&
              state.start_date !== " " &&
              state.start_date !== "  " &&
              state.start_date !== null &&
              !state.start_date?.includes("undefined")
                ? false
                : true
            }
            helperText={
              state.start_date !== "" &&
              state.start_date !== " " &&
              state.start_date !== "  " &&
              state.start_date !== null &&
              !state.start_date?.includes("undefined")
                ? null
                : " ???? ???????? ?????? ???????? ???????????? ??????"
            }
            onChange={event => handelCHnage(event.target.value, "start_date")}
          />
        </Box>

        <Box width="23%">
          {/*<DatePicker*/}
          {/*  minDate={new Date()}*/}
          {/*  label="?????????? ?????????? ????????"*/}
          {/*  value={*/}
          {/*    state.end_date?.includes("undefined") ? null : state.end_date*/}
          {/*  }*/}
          {/*  required*/}
          {/*  error={*/}
          {/*    state.end_date !== "" &&*/}
          {/*    state.end_date !== " " &&*/}
          {/*    state.end_date !== "  " &&*/}
          {/*    state.end_date !== null &&*/}
          {/*    !state.end_date?.includes("undefined")*/}
          {/*      ? false*/}
          {/*      : true*/}
          {/*  }*/}
          {/*  helperText={*/}
          {/*    state.end_date !== "" &&*/}
          {/*    state.end_date !== " " &&*/}
          {/*    state.end_date !== "  " &&*/}
          {/*    state.end_date !== null &&*/}
          {/*    !state.end_date?.includes("undefined")*/}
          {/*      ? null*/}
          {/*      : " ???? ???????? ?????? ???????? ???????????? ??????"*/}
          {/*  }*/}
          {/*  setValue={data =>*/}
          {/*    handelCHnage(*/}
          {/*      `${convertDigitToEnglish(*/}
          {/*        data?.format("YYYY/MM/DD")*/}
          {/*      )} 00:00:00.000000`,*/}
          {/*      "end_date"*/}
          {/*    )*/}
          {/*  }*/}
          {/*>*/}
          {/*  /!* {(data) => handelCHnage(`${data}`, "end_date")} *!/*/}
          {/*</DatePicker>*/}
          <TextField
            value={state.end_date}
            label="?????????? ?????????? ????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            required
            error={
              state.end_date !== "" &&
              state.end_date !== " " &&
              state.end_date !== "  " &&
              state.end_date !== null &&
              !state.end_date?.includes("undefined")
                ? false
                : true
            }
            helperText={
              state.end_date !== "" &&
              state.end_date !== " " &&
              state.end_date !== "  " &&
              state.end_date !== null &&
              !state.end_date?.includes("undefined")
                ? null
                : " ???? ???????? ?????? ???????? ???????????? ??????"
            }
            margin="dense"
            onChange={event => handelCHnage(event.target.value, "end_date")}
          />
        </Box>

        <Box width="23%">
          <DatePicker
            minDate={new Date()}
            label="?????????? ???????? ?????? ??????"
            value={
              state.registration_start_date?.includes("undefined")
                ? null
                : state.registration_start_date
            }
            required
            error={
              state.registration_start_date !== "" &&
              state.registration_start_date !== " " &&
              state.registration_start_date !== "  " &&
              state.registration_start_date !== null &&
              !state.registration_start_date?.includes("undefined")
                ? false
                : true
            }
            helperText={
              state.registration_start_date !== "" &&
              state.registration_start_date !== " " &&
              state.registration_start_date !== "  " &&
              state.registration_start_date !== null &&
              !state.registration_start_date?.includes("undefined")
                ? null
                : " ???? ???????? ?????? ???????? ???????????? ??????"
            }
            setValue={data =>
              handelCHnage(
                `${convertDigitToEnglish(
                  data?.format("YYYY/MM/DD")
                )} 00:00:00.000000`,
                "registration_start_date"
              )
            }
          >
            {/* {(data) =>
              handelCHnage(
                `${dateMiladi(data)} ${"00:00:00.000000"}`,
                "registration_start_date"
              )
            } */}
          </DatePicker>
        </Box>

        <Box width="23%">
          <DatePicker
            label="?????????? ?????????? ?????? ??????"
            minDate={date}
            value={
              state.registration_end_date?.includes("undefined")
                ? null
                : state.registration_end_date
            }
            required
            error={
              state.registration_end_date !== "" &&
              state.registration_end_date !== " " &&
              state.registration_end_date !== "  " &&
              state.registration_end_date !== null &&
              !state.registration_end_date?.includes("undefined")
                ? false
                : true
            }
            helperText={
              state.registration_end_date !== "" &&
              state.registration_end_date !== " " &&
              state.registration_end_date !== "  " &&
              state.registration_end_date !== null &&
              !state.registration_end_date?.includes("undefined")
                ? null
                : " ???? ???????? ?????? ???????? ???????????? ??????"
            }
            setValue={data =>
              handelCHnage(
                `${convertDigitToEnglish(
                  data?.format("YYYY/MM/DD")
                )} 23:59:59.000000`,
                "registration_end_date"
              )
            }
          >
            {/* {(data) =>
              handelCHnage(
                `${dateMiladi(data)} ${"23:59:59.000000"}`,
                "registration_end_date"
              )
            } */}
          </DatePicker>
        </Box>

        <Box width="48%">
          <TextField
            value={state.holding_time}
            label="?????????? ??????????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            required
            error={
              state.holding_time !== "" &&
              state.holding_time !== " " &&
              state.holding_time !== "  "
                ? false
                : true
            }
            helperText={
              state.holding_time !== "" &&
              state.holding_time !== " " &&
              state.holding_time !== "  "
                ? null
                : " ???? ???????? ?????? ???????? ???????????? ??????"
            }
            onChange={event => handelCHnage(event.target.value, "holding_time")}
          />
        </Box>

        <Box width="48%">
          <TextField
            value={state.category}
            label="???????? ????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            // disabled
            margin="dense"
            required
            error={
              state.category !== "" &&
              state.category !== " " &&
              state.category !== "  "
                ? false
                : true
            }
            helperText={
              state.category !== "" &&
              state.category !== " " &&
              state.category !== "  "
                ? null
                : " ???? ???????? ?????? ???????? ???????????? ??????"
            }
            onChange={event => handelCHnage(event.target.value, "category")}
          />
        </Box>
        <Box width="31%">
          <TextField
            value={state.hours}
            label="?????????? ????????"
            id="titleNewButton"
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            margin="dense"
            required
            error={
              state.hours !== "" &&
              state.hours !== " " &&
              state.hours !== 0 &&
              state.hours !== null
                ? false
                : true
            }
            helperText={
              state.hours !== "" &&
              state.hours !== " " &&
              state.hours !== 0 &&
              state.hours !== null
                ? null
                : " ???? ???????? ?????? ???????? ???????????? ??????"
            }
            onChange={event =>
              handelCHnage(Number(event.target.value), "hours")
            }
          />
        </Box>

        <Box width="65%">
          <TextField
            value={state.teacher_name}
            label="?????? ????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            required
            error={
              state.teacher_name !== "" &&
              state.teacher_name !== " " &&
              state.teacher_name !== "  "
                ? false
                : true
            }
            helperText={
              state.teacher_name !== "" &&
              state.teacher_name !== " " &&
              state.teacher_name !== "  "
                ? null
                : " ???? ???????? ?????? ???????? ???????????? ??????"
            }
            onChange={event => handelCHnage(event.target.value, "teacher_name")}
          />
        </Box>

        <Box
          width="98%"
          height={120}
          style={{ marginBottom: "25px" }}
          // style={{ backgroundColor: 'gray' }}
        >
          <TextareaAutosize
            // rowsMax={4}
            value={state.explanations}
            aria-label="maximum height"
            placeholder="??????????????"
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #ccc",
              padding: 10,
              backgroundColor: "transparent",
              borderRadius: 10
            }}
            onChange={event => handelCHnage(event.target.value, "explanations")}
            // defaultValue="????????"
          />
        </Box>

        <Box width="98%">
          <TextField
            value={state.external_links}
            label="???????? ?????? ??????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            onChange={event =>
              handelCHnage(event.target.value, "external_links")
            }
            helperText="???? ???????? ???????? ???????? ?????? ?????????? ???????? ???? ???? ???? ????????( , ) ???? ???? ?????? ????????"
          />
        </Box>

        <Box width="48%">
          <TextField
            value={state.cost}
            label="?????????? ????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            type="number"
            onChange={event => handelCHnage(Number(event.target.value), "cost")}
          />
        </Box>

        <Box width="48%">
          <TextField
            value={state.required_bonus}
            label="???????????? ???????? ???????? ???????? ???? ????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            type="number"
            required
            error={
              state.required_bonus !== "" &&
              state.required_bonus !== " " &&
              state.required_bonus !== null
                ? false
                : true
            }
            helperText={
              state.required_bonus !== "" &&
              state.required_bonus !== " " &&
              state.required_bonus !== null
                ? null
                : " ???? ???????? ?????? ???????? ???????????? ??????"
            }
            onChange={event =>
              handelCHnage(Number(event.target.value), "required_bonus")
            }
          />
        </Box>

        <Box width="48%">
          <TextField
            value={state.min_participants}
            label="???????????? ???????? ??????????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            type="number"
            onChange={event =>
              handelCHnage(Number(event.target.value), "min_participants")
            }
          />
        </Box>

        <Box width="48%">
          <TextField
            value={state.max_participants}
            label="?????????????? ???????? ??????????????"
            id="titleNewButton"
            defaultValue=""
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            type="number"
            required
            error={
              state.max_participants !== "" &&
              state.max_participants !== " " &&
              state.max_participants !== 0 &&
              state.max_participants !== null
                ? false
                : true
            }
            helperText={
              state.max_participants !== "" &&
              state.max_participants !== " " &&
              state.max_participants !== 0 &&
              state.max_participants !== null
                ? null
                : " ???? ???????? ?????? ???????? ???????????? ??????"
            }
            onChange={event =>
              handelCHnage(Number(event.target.value), "max_participants")
            }
          />
        </Box>

        <Box
          width="98%"
          height={120}
          style={{ marginBottom: "25px" }}
          // style={{ backgroundColor: 'gray' }}
        >
          <TextareaAutosize
            // rowsMax={4}
            value={state.location}
            aria-label="maximum height"
            placeholder="????????"
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #ccc",
              padding: 10,
              backgroundColor: "transparent",
              borderRadius: 10
            }}
            onChange={event => handelCHnage(event.target.value, "location")}

            // defaultValue="????????"
          />
        </Box>
      </div>

      <div className={classes["btns"]}>
        <button className={"btnsGreen"} onClick={() => handelSubmit()}>
          ??????????{" "}
        </button>
        <button className={"btnsRed"} onClick={() => setNewButton(false)}>
          ????????????{" "}
        </button>
      </div>
    </div>
  );
}
