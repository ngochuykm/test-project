import { put, takeEvery } from 'redux-saga/effects'
import getItem from '../fetchAPI/getItems'
import createItem from '../fetchAPI/createItem'
import updateItem from '../fetchAPI/updateItem'
import deleteItem from '../fetchAPI/deleteItem'
import getpageItem from '../fetchAPI/getpageItem'
import searchData from '../fetchAPI/searchData'
import * as types from '../constant'
function* getListItem() {
    try {
        const res = yield getItem()
        yield put(
            {
                type: types.GET_ITEM_SUCCESS,
                payload: res
            }
        )
    } catch (error) {
        yield put(
            {
                type: types.GET_ITEM_FAILURE,
                payload: {
                    errorMessage: error.message
                }
            }
        )
    }
}
function* search(action) {
    try {
        const res = yield searchData(action.payload)
        yield put(
            {
                type: types.SEARCHDATA_ITEM_SUCCESS,
                payload: res
            }
        )
    } catch (error) {
        yield put(
            {
                type: types.SEARCHDATA_ITEM_FAILURE,
                payload: {
                    errorMessage: error.message
                }
            }
        )
    }
}
function* createItemProps(action) {
    try {
        const allData = yield getItem()
        let totalPage 
        if(allData % action.payload.getpages.limit === 0 ){
            totalPage = allData.length / action.payload.getpages.limit
        }else{
            totalPage = allData.length / action.payload.getpages.limit + 1
        }
        const res = yield createItem(action.payload.name)
        yield put(
            {
                type: types.CREATE_ITEM_SUCCESS,
                payload: res
            }
        )
        
        yield put(
            {
                type: types.GETPAGE_ITEM_REQUEST,
                payload: {
                    pageIndex: totalPage,
                    limit: action.payload.getpages.limit
                }
            }
        )
    } catch (error) {
        yield put(
            {
                type: types.CREATE_ITEM_FAILURE,
                payload: {
                    errorMessage: error.message
                }
            }
        )
    }
}

function* updateToProps(action) {
    try {
        console.log('action of updateToProps::', action)
        const res = yield updateItem(action.payload.state)
        yield put(
            {
                type: types.UPDATE_ITEM_SUCCESS,
                payload: res
            }
        )
        yield put(
            {
                type: types.GETPAGE_ITEM_REQUEST,
                payload: action.payload.getpages
            }
        )
    } catch (error) {
        yield put(
            {
                type: types.UPDATE_ITEM_FAILURE,
                payload: {
                    errorMessage: error.message
                }
            }
        )
    }
}

function* deleteToProps(action) {
    try {
        console.log("accpayload deleet ::: ", action.payload)
        const res = yield deleteItem(action.payload.deleteID)
        yield put(
            {
                type: types.DELETE_ITEM_SUCCESS,
                payload: res
            }
        )
        const data = yield getpageItem(action.payload.getpages)
        let pageIndex = (data.length===0) ? action.payload.getpages.pageIndex-1:action.payload.getpages.pageIndex
        yield put(
            {
                type: types.GETPAGE_ITEM_REQUEST,
                payload: {
                    limit: action.payload.getpages.limit,
                    pageIndex : pageIndex,
                    searchData: action.payload.getpages.searchData,
                    isSearching: action.payload.getpages.isSearching
                }
            }
        )
    } catch (error) {
        yield put(
            {
                type: types.DELETE_ITEM_FAILURE,
                payload: {
                    errorMessage: error.message
                }
            }
        )
    }
}
function* getpageToProps(action) {
    try {
        console.log(action.payload.isSearching)
        let allData
        if(action.payload.isSearching){
            allData = yield searchData(action.payload.searchData)
        }else {
            allData = yield getItem()
        }
        const res = yield getpageItem(action.payload)
        yield put(
            {
                type: types.GETPAGE_ITEM_SUCCESS,
                payload: {
                    data: res,
                    allData: allData
                }
            }
        )
    } catch (error) {
        yield put(
            {
                type: types.GETPAGE_ITEM_FAILURE,
                payload: {
                    errorMessage: error.message
                }
            }
        )
    }
}
export const ItemSaga = [
    takeEvery(types.GET_ITEM_REQUEST, getListItem),
    takeEvery(types.CREATE_ITEM_REQUEST, createItemProps),
    takeEvery(types.UPDATE_ITEM_REQUEST, updateToProps),
    takeEvery(types.DELETE_ITEM_REQUEST, deleteToProps),
    takeEvery(types.GETPAGE_ITEM_REQUEST, getpageToProps),
    takeEvery(types.SEARCHDATA_ITEM_REQUEST, search)
];