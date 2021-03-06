import { Box, TextField, CircularProgress, MenuItem, makeStyles, } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ModalCustom from "./../../../common/components/modal";
import Checkbox from '@material-ui/core/Checkbox';

let useStyles = makeStyles({
    root: {
        maxWidth: '100%'
    },
    content: {
        maxWidth: '100%',
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: '50%'
    }
})

export default function EditModal({ data, handleSubmitEdit, modalEdit, setmodalEdit, loading }) {


    let classes = useStyles()

    const [state, setstate] = useState({
        Name: "",
        ProvinceName: "",
        CityName: "",
        DirectorName: "",
        Address: '',
        PhoneNumber: '',
        CityCodePhoneNumber: '',
        IsActive: '',
        IsBranch: '',
        IsMainBranch: '',
        PostalCode: '',
        GoogleMapUrl: '',
    })

    useEffect(() => {
        setstate(data.body)
    }, [data])

    useEffect(() => {
        if (!modalEdit)
            setstate(data.body)
    }, [modalEdit])

    const handleChangeValueInsert = (value, type) => {
        setstate(prev => ({
            ...prev, [type]: value
        }))
    }

    const handleSubmit = () => {
        let res = { ...state, _id: data.id }

        handleSubmitEdit(res)
    }


    return (
        <>
            <button
                className={`btnsYellow`}
                onClick={() => setmodalEdit(true)}
            >
                ویرایش
            </button>

            <ModalCustom
                open={modalEdit}
                setOpen={setmodalEdit}
                className={classes.modal}
            >
                <Box p={3}>
                    <Box className={classes.content}>
                        <Box m={2} width={232}>
                            <TextField
                                title="شعبه"
                                fullWidth
                                variant="outlined"
                                value={state.Name}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "Name")}
                            />
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                title="استان"
                                fullWidth
                                variant="outlined"
                                value={state.ProvinceName}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "ProvinceName")}
                            />
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                title="شهر"
                                fullWidth
                                variant="outlined"
                                value={state.CityName}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "CityName")}
                            />
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                title="مسئول"
                                fullWidth
                                variant="outlined"
                                value={state.DirectorName}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "DirectorName")}
                            />
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                title="آدرس"
                                fullWidth
                                variant="outlined"
                                value={state.Address}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "Address")}
                            />
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                title="کد معرف شعبه"
                                fullWidth
                                variant="outlined"
                                value={state.recommender_id}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "recommender_id")}
                            />
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                title="تلفن"
                                fullWidth
                                variant="outlined"
                                value={state.PhoneNumber}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "PhoneNumber")}
                            />
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                title="کد"
                                fullWidth
                                variant="outlined"
                                value={state.CityCodePhoneNumber}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "CityCodePhoneNumber")}
                            />
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                id="standard-select-competitions"
                                select
                                label={"فعال/غیرفعال"}
                                value={state.IsActive}
                                fullWidth
                                variant="outlined"
                                onChange={(event) =>
                                    handleChangeValueInsert(event.target.value, "IsActive")
                                }
                            >
                                <MenuItem value="TRUE">فعال</MenuItem>
                                <MenuItem value="FALSE">غیر فعال</MenuItem>
                            </TextField>
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                id="standard-select-competitions"
                                select
                                label={"شعبه/نمایندگی"}
                                value={state.IsBranch}
                                fullWidth
                                variant="outlined"
                                onChange={(event) =>
                                    handleChangeValueInsert(event.target.value, "IsBranch")
                                }
                            >
                                <MenuItem value="TRUE">شعبه</MenuItem>
                                <MenuItem value="FALSE">نمایندگی</MenuItem>
                            </TextField>
                        </Box>
                        <Box m={2} width={232}>
                            <TextField
                                title="کد پستی"
                                fullWidth
                                variant="outlined"
                                value={state.PostalCode}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "PostalCode")}
                            />
                        </Box>
                        <Box m={2} width={232}>
                            <Checkbox
                                checked={state.IsMainBranch === 'TRUE' ? true : false}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                onClick={(event) => handleChangeValueInsert(event.target.checked ? 'TRUE' : 'FALSE', 'IsMainBranch')}
                            />
          شعبه مرکزی
        </Box>
                        <Box m={2} width={'90%'}>
                            <TextField
                                title="نقشه"
                                fullWidth
                                variant="outlined"
                                value={state.GoogleMapUrl}
                                onChange={(e) => handleChangeValueInsert(e.target.value, "GoogleMapUrl")}
                            />
                        </Box>

                    </Box>

                    <Box mt={4} textAlign="end">
                        {
                            loading
                                ? <CircularProgress style={{ width: 30, height: 30, marginLeft: 15 }} />
                                : <button className="btnsGreen" onClick={handleSubmit}>ثبت</button>
                        }
                        <button className="btnsRed" onClick={() => setmodalEdit(false)}>انصراف</button>
                    </Box>

                </Box>
            </ModalCustom>
        </>
    )
}
