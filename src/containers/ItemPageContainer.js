import React from 'react'
import Item from '../components/Item'
import * as action from '../actions/ItemPageActions'
import { connect } from 'react-redux'
import PaginationCommon from '../components/PaginationCommon'
class ItemPageContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            limit: '5',
            searchData: '',
            isSearching: false
        };
    }
    componentDidMount() {
        this.props.initload()
    }

    render() {
        let totalPage
        if(this.props.itemLength % this.state.limit === 0){
            totalPage = this.props.itemLength / this.state.limit
        }else{
            totalPage = Math.ceil(this.props.itemLength / this.state.limit)
        }
        return (
            <div>
                <Item {...this.props} changeLimit={(limit) => {
                    this.setState({limit})
                }} changeTextSearch={(searchData) => {
                    this.setState({searchData})
                }} changeIsSearching={(isSearching)=>{this.setState({isSearching})}}/>
                <PaginationCommon activePage={this.props.activePage} totalPage={totalPage} onPaginate={
                    (soTrang) => {
                        console.log(this.props.itemLength)
                        this.props.getPagetoProps({
                            limit: this.state.limit,
                            pageIndex: soTrang,
                            searchData: this.state.searchData,
                            isSearching: this.state.isSearching
                        })
                    }
                } />
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        items: state.items.listItem,
        itemLength: state.items.itemLength,
        activePage: state.items.activePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initload: () => {
            dispatch(action.getListItem())
        },
        createToProps: (payload) => {
            dispatch(action.create(payload))
        },
        updateToProps: (payload) => {
            dispatch(action.update(payload))
        },
        deleteToProps: (payload) => {
            dispatch(action.deleteId(payload))
        },
        getPagetoProps: (payload) => {
            dispatch(action.getPage(payload))
        },
        searchDataToProps: (payload) => {
            dispatch(action.searchData(payload))
            console.log("yessss")
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPageContainer);