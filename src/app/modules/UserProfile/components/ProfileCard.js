/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { TextField } from '@material-ui/core'
import { makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AlertDialogSlide from './../../../common/components/AlertDialogSlide';
import { clubmember_update_dispatch } from './../../../../redux/clubmember/clubmember_update_profile';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from './../../../common/method/handleNotificationAlert';
import { clubmember_update_activation_dispatch } from './../../../../redux/clubmember/clubmember_update_activation';
import { actionTypes } from './../../../../redux/notificationAlert';
import { checkNationalCodeLegal, checkNationalCode } from '../../../common/method/nationalCode';
import { useDispatch } from 'react-redux';
import { seprateNumberFromComma } from './../../../common/method/seprateNumberFromComma';


const useStyles = makeStyles({
  btns: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
})

export function ProfileCard({ data, selectApiProfile, StateNational_id, setNational_id }) {

  const dispatch = useDispatch()

  let { national_id } = data[0].body

  let classes = useStyles();
  const [state, setState] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [roll, setRoll] = useState({ value: "", roll: "" });
  const user = useSelector(({ auth }) => auth.user, shallowEqual);
  const [openAlertActivation, setOpenAlertActivation] = useState(false);



  useEffect(() => {
    if (data[0].id) {
      setState(data[0]);
      setRoll(findRoll(data[0].body.category));
    }
  }, [data]); //eslint-disable-line  react-hooks/exhaustive-deps


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const findRoll = (key) => {
    switch (key) {
      case "ADMIN":
        return { value: "??????????", roll: "ADMIN" };
      case "OPERATOR":
        return { value: "??????????????", roll: "OPERATOR" };
      case "MEMBER":
        return { value: "?????????? ????????", roll: "MEMBER" };
      default:
        return { value: "-", roll: "-" };
    }
  };

  const handel_show_alert = (type) => {
    if (type !== data[0].body.category) {
      setRoll(findRoll(type));
      setOpenAlert(true);
    }
    setAnchorEl(null);
  };

  const apiUpdateRoll = () => {

    let obj = {
      _id: state.id,
      category: roll.roll
    }

    clubmember_update_dispatch(obj)
      .then(res => {
        handleNotificationAlertTryUpdate(res)
        selectApiProfile(national_id)
      })
      .catch(err => {
        handleNotificationAlertCatch()
      })

    setOpenAlert(false);
  };

  const apiUpdateActivation = (method_type, id) => {

    clubmember_update_activation_dispatch(method_type, id)
      .then(res => {
        handleNotificationAlertTryUpdate(res)
        selectApiProfile(national_id)
      })
      .catch(err => {
        handleNotificationAlertCatch()
      })
  }

  const handel_Submit_activation = () => {
    let { id } = data[0];

    if (state.body.is_active === "TRUE") {
      let method_type = "deactivate_club_member";
      apiUpdateActivation(method_type, id);
    } else if (state.body.is_active === "FALSE") {
      let method_type = "activate_club_member";
      apiUpdateActivation(method_type, id);
    } else {
      alert("???????? ?????????? ?????????? ???????? ???? ????????.");
    }

    setOpenAlertActivation(false);
  };

  const handleSubmitApiProfile = (value) => {

    if (value.length === 0) {
      dispatch({
        type: actionTypes.warning,
        textAlert: "???????? ???? ?????? ???????? ?????? ???? ???? ????????????"
      });
      return
    }

    let isOkCode = checkNationalCode(value)
    let isOkLegal = checkNationalCodeLegal(value)

    if (isOkCode || isOkLegal) {
      selectApiProfile(value)
      return
    } else {
      let textError = '???????? ???? ?????? ???? ???? ?????????? ???????? ????????????'
      dispatch({
        type: actionTypes.warning,
        textAlert: textError
      })
      return
    }

  }



  return (
    <>
      {user && (
        <div
          className="flex-row-auto offcanvas-mobile w-250px w-xxl-350px"
          id="kt_profile_aside"
        >
          <div className="card card-custom card-stretch">
            {/* begin::Body */}
            <div className="card-body pt-4">
              {/* begin::User */}
              <div className="d-flex align-items-center">
                <div className="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center">
                  <div
                    className="symbol-label"
                    style={{ backgroundImage: `url(${'/media/common/profile.jpg'})` }}
                  ></div>
                  <i className="symbol-badge bg-success"></i>
                </div>
                <div>
                  {/* <a
                    href="#"
                    className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
                  > */}
                  <div className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary d-flex">
                    <span>
                      {data[0].body.first_name}
                    </span>
                    <span className={'ml-2'}>
                      {data[0].body.last_name}
                    </span>
                  </div>
                  {/* </a> */}
                  <div className="text-muted">{user.occupation}</div>
                  <div className="mt-2">
                    <div >
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        className="btnsGreen"
                      >
                        {/* {roll.value} */}
                        {findRoll(data[0].body.category).value}
                      </Button>

                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handel_show_alert("MEMBER")}>
                          {" "}
                         ?????????? ????????
                        </MenuItem>
                        <MenuItem onClick={() => handel_show_alert("OPERATOR")}>
                          ??????????????
                        </MenuItem>
                        <MenuItem onClick={() => handel_show_alert("ADMIN")}>
                          ??????????
                        </MenuItem>
                      </Menu>
                    </div>

                    {openAlert && (
                      <AlertDialogSlide
                        flagShow={openAlert}
                        handleCloseAlert={setOpenAlert}
                        handleOkAlert={apiUpdateRoll}
                        data={{
                          title: "????????????",
                          description: `?????? ???????????????? ?????????? ???? ???? ${roll.value} ?????????? ??????????`,
                        }}
                      />
                    )}

                  </div>
                </div>
              </div>
              {/* end::User */}
              {/* begin::Contact */}
              <div className="py-9">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">???? ??????:</span>
                  <span className="text-muted">{data[0].body.national_id}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">????????:</span>
                  <span className="text-muted">{data[0].body.phone}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">??????????:</span>
                  <span className="text-muted text-hover-primary">
                    {data[0].body.email}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">???????????? ???????? ??????????????:</span>
                  <span className=" text-hover-primary font-weight-bolder " style={{ color: '#1BC5BD' }}>
                    {seprateNumberFromComma(data[0].body.available_bonus)}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">???????????? ???????? ??????:</span>
                  <span className=" text-hover-primary font-weight-bolder" style={{ color: '#FFA800' }} >
                    {data[0].body.reserved_bonus}
                  </span>
                </div>

              </div>
              {/* end::Contact */}
              {/* begin::Nav */}
              <div className="navi navi-bold navi-hover navi-active navi-link-rounded">

                <div className="navi-item mb-2 w-100">
                  <TextField
                    label="???? ??????"
                    variant="outlined"
                    value={StateNational_id}
                    onChange={(e) => setNational_id(e.target.value)}
                    className={'w-100'}
                    onKeyDown={(event) => event.keyCode === 13 ? handleSubmitApiProfile(StateNational_id) : ''}
                  />
                  {/* selectApiProfile */}
                </div>

                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/personal-information"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/General/User.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">
                      ?????????????? ????????
                    </span>
                  </NavLink>
                </div>
                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/profile-overview"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Design/Layers.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">
                      ???????? ???????? ?????? ???? ?? ????????
                    </span>
                  </NavLink>
                </div>
                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/change-password"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Shield-user.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">
                      ?????????? ?????? ????????
                    </span>
                    <span className="navi-label">
                      {/* <span className="label label-light-danger label-rounded font-weight-bold">
                        5
                      </span> */}
                    </span>
                  </NavLink>
                </div>
                <div className="navi-item mb-2">
                  {
                    (data[0].body.automation_id=== null || data[0].body.automation_id === 'null') && (
                      <NavLink
                        to="/user-profile/sejam"
                        className="navi-link py-4"
                        activeClassName="active"
                      >
                        <span className="navi-icon mr-2">
                          <span className="svg-icon">
                            <SVG
                              src={toAbsoluteUrl(
                                "/media/svg/icons/Communication/Shield-user.svg"
                              )}
                            ></SVG>{" "}
                          </span>
                        </span>
                        <span className="navi-text font-size-lg">
                          ???????????????? ?????????????? ???? ????????
                    </span>
                        <span className="navi-label">
                          {/* <span className="label label-light-danger label-rounded font-weight-bold">
                        5
                      </span> */}
                        </span>
                      </NavLink>
                    )
                  }
                </div>
                <br /><br />
                <div className={classes['btns']}>
                  <button
                    className={
                      data[0].body.is_active === "TRUE"
                        ? "btnsRedBackground"
                        : "btnsGreenBackground"

                    }
                    onClick={() => setOpenAlertActivation(true)}
                  >
                    {`???????? ???????????? ${
                      data[0].body.is_active === "TRUE" ? "??????" : ""
                      } ???????? ??????`}
                  </button>
                  {
                    openAlertActivation && (
                      <AlertDialogSlide
                        flagShow={openAlertActivation}
                        handleCloseAlert={setOpenAlertActivation}
                        handleOkAlert={handel_Submit_activation}
                        data={{
                          title: "????????????",
                          description: `?????? ???????????????? ???????? ???????????? ${
                            data[0].body.is_active === "TRUE" ? "?????? ????????" : "????????"
                            } ????????`,
                        }}
                      />
                    )
                  }
                </div>
              </div>
              {/* end::Nav */}
            </div>
            {/* end::Body */}
          </div>
        </div>
      )}
    </>
  );
}
