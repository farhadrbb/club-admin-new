import { Box, MenuItem, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react';



export default function Edit({ data, handleSubmitEdit, setOpenEdit, handleSubmitInsert }: any) {
    ///////////// if(data) ====> edit     else ===>insert///////////////////
    const [state, setstate] = useState<any>(initState)

    useEffect(() => {
        if (data) {
            let res: any = {}
            Object.keys(data.body)
                .forEach(item => {
                    res[item] = { label: initState[item].label, value: data.body[item] }
                })

            setstate(res)
        }
    }, [])

    const handleChange = (e: any, isin: any) => {
        let { value } = e.target;

        setstate((prev: any) => ({
            ...prev,
            [isin]: {
                label: prev[isin].label,
                value
            }
        }))
    }

    const clickSubmitEdit = () => {
        let res: any = {}
        Object.keys(state)
            .forEach(item => {
                res[item] = state[item]["value"]
            })

        if (data) {
            if (data.body.back_office_id === "null" || !data.body.back_office_id) {
                let { isin, ...otherState } = res
                handleSubmitEdit({ _id: data.id, ...otherState })
                return
            }
            let { isin, back_office_id, ...otherState } = res
            handleSubmitEdit({ _id: data.id, ...otherState })
        } else {
            handleSubmitInsert(res)
        }
        setOpenEdit(false)
    }


    return (
        <>
            <Box display="flex" flexWrap="wrap" width={1000}>
                {
                    Object.keys(state)
                        .map((item, ind) => {
                            if (item === "stock_type") {
                                return (
                                    <TextField
                                        style={{ width: 275, margin: 15 }}
                                        id="standard-select-currency"
                                        select
                                        label={state[item]["label"]}
                                        value={state[item]["value"]}
                                        onChange={(e) => handleChange(e, item)}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value={"MORTGAGE"}>
                                            ?????????????? ????????
                                        </MenuItem>
                                        <MenuItem value={"ETF"}>
                                            ?????????? ???????? ????????????
                                        </MenuItem>
                                        <MenuItem value={"BOND"}>
                                            ?????????? ????????
                                        </MenuItem>
                                        <MenuItem value={"OPTION"}>
                                            ????????????
                                        </MenuItem>
                                        <MenuItem value={"IFB"}>
                                            ??????????????
                                        </MenuItem>
                                        <MenuItem value={"TSE"}>
                                            ????????
                                        </MenuItem>
                                        <MenuItem value={"FUTURE"}>
                                            ??????
                                        </MenuItem>
                                        <MenuItem value={"ENERGY"}>
                                            ??????????
                                        </MenuItem>
                                        <MenuItem value={"IME"}>
                                            ????????
                                        </MenuItem>
                                    </TextField>
                                )
                            }
                            else if (item === "flow") {
                                return (
                                    <TextField
                                        style={{ width: 275, margin: 15 }}
                                        id="standard-select-currency"
                                        select
                                        label={state[item]["label"]}
                                        value={state[item]["value"]}
                                        onChange={(e) => handleChange(e, item)}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value={"1"}>
                                            ????????
                                        </MenuItem>
                                        <MenuItem value={"2"}>
                                            ??????????????
                                        </MenuItem>
                                        <MenuItem value={"4"}>
                                            ????????
                                        </MenuItem>

                                    </TextField>
                                )
                            }
                            else if (item === "is_active") {
                                return (
                                    <TextField
                                        style={{ width: 275, margin: 15 }}
                                        id="standard-select-currency"
                                        select
                                        label={state[item]["label"]}
                                        value={state[item]["value"]}
                                        onChange={(e) => handleChange(e, item)}
                                        helperText=""
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        <MenuItem value={"TRUE"}>
                                            ????????
                                        </MenuItem>
                                        <MenuItem value={"FALSE"}>
                                            ??????????????
                                        </MenuItem>
                                    </TextField>
                                )
                            }
                            else return (
                                <TextField
                                    label={state[item]["label"]}
                                    value={state[item]["value"]}
                                    style={{ width: 275, margin: 15 }}
                                    key={ind}
                                    onChange={(e) => handleChange(e, item)}
                                    disabled={!data ? false : item === "isin" || item === "back_office_id" ? true : false}
                                    variant="outlined"
                                    size="small"
                                />
                            )
                        })

                }
            </Box>
            <Box mt={3} display="flex" justifyContent="flex-end" >
                <button
                    className="btnsGreen"
                    onClick={clickSubmitEdit}
                >
                    ??????
                </button>

                <button
                    className="btnsRed"
                    onClick={() => setOpenEdit(false)}
                >
                    ????????
                </button>
            </Box>
        </>
    )
}

const initState: any =
{
    isin: { label: "?????????? ??????", value: "" },
    back_office_id: { label: "?????????? ??????????????????", value: "" },
    short_name: { label: "?????? ????????", value: "" },
    full_name: { label: "?????? ????????", value: "" },
    sector_code: { label: "???? ????????", value: "" },
    sector_name: { label: "?????? ????????", value: "" },
    sub_sector_code: { label: "???? ??????????????", value: "" },
    flow: { label: "??????????", value: "" },
    is_active: { label: "??????????", value: "" },
    stock_type: { label: "?????? ????????", value: "" }
}