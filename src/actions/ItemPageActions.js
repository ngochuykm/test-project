import * as types from '../constant'

export function getListItem(payload){
    return({
        type: types.GET_ITEM_REQUEST,
        payload
    })
}
export function create(payload){
    return({
        type:types.CREATE_ITEM_REQUEST,
        payload
    })
}
export function update(payload){
    return({
        type:types.UPDATE_ITEM_REQUEST,
        payload
    })
}
export function deleteId(payload){
    return({
        type:types.DELETE_ITEM_REQUEST,
        payload
    })
}
export function getPage(payload){
    return({
        type:types.GETPAGE_ITEM_REQUEST,
        payload
    })
}
export function searchData(payload){
    return({
        type:types.SEARCHDATA_ITEM_REQUEST,
        payload
    })
}
