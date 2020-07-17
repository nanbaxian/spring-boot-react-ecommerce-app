import React, {useEffect, useState} from 'react';
import CheckboxList from "../../../ui/checkboxList";
import log from 'loglevel';
import {useDispatch, useSelector} from "react-redux";
import {ADD_SELECTED_CATEGORY, SAVE_SORT_LIST} from "../../../../actions/types";
import CheckboxMoreButton from "./checkboxMoreButton";
import CheckboxSearchBar from "./checkboxSearchBar";
import {useSortList} from "./sortListHook";

export default function ApparelCheckBox() {
    const TITLE = "Apparel"
    const propName = "apparels"
    const dispatch = useDispatch()
    const apparelList = useSelector(state => state.filterAttributesReducer ?
        state.filterAttributesReducer.apparels : null)
    const selectedApparels = useSelector(state => state.selectedFilterAttributesReducer.apparels)
    const [searchApparelList, setSearchApparelList] = useState(null)

    useSortList(apparelList, propName)

    if (!apparelList) {
        log.debug(`[ApparelCheckBox] apparelList is null`)
        return null
    }

    const getActiveApparelList = () => {
        return searchApparelList ? searchApparelList : apparelList
    }

    const handleSearchListChange = (searchList) => {
        setSearchApparelList(searchList)
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[ApparelCheckBox] handleCheckBoxChange(id) = ${id}, value = ${value}`)
        dispatch({
            type: ADD_SELECTED_CATEGORY,
            payload: {
                apparels: {
                    id, value
                }
            }
        })
    }

    log.debug(`[ApparelCheckBox] selectedApparels = ${JSON.stringify(selectedApparels)}`)

    log.info(`[ApparelCheckBox] Rendering ApparelCheckBox Component`)

    return (
        <>
            <CheckboxSearchBar title={TITLE}
                               placeholderText="Search for Apparels"
                               checkboxList={apparelList}
                               searchListHandler={handleSearchListChange}
            />
            <CheckboxList attrList={getActiveApparelList()}
                          fontSize="0.9rem"
                          title={TITLE}
                          maxItems={6}
                          selectedAttrList={selectedApparels}
                          onChangeHandler={handleCheckBoxChange}/>
            <CheckboxMoreButton title={TITLE}
                                checkboxList={apparelList}
                                propName={propName}
                                selectedCheckboxList={selectedApparels}
                                checkboxChangeHandler={handleCheckBoxChange}/>

        </>
    );
}