import React, { Component } from 'react'

class Item extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            updateId: '',
            updateName: '',
            deleteID: '',
            limit: '5',
            itemLengths: '',
            pages: '1',
            page: '',
            searchData: '',
            isSearching: false
        };
    }
    createItem(payloads) {
        this.setState({ isSearching: false, searchData: '' })
        this.props.createToProps(payloads)
        this.props.changeIsSearching(false)
    }
    searchData() {
        this.setState({ isSearching: true })
        this.props.searchDataToProps(this.state.searchData)
    }
    render() {
        let listData = []
        let listPage = []
        let listPages = []
        let updateId = this.state.updateId
        let updateName = this.state.updateName
        let pages = ((this.props.itemLength % this.state.limit) == 0) ? Math.floor(this.props.itemLength / this.state.limit) - 1 : Math.floor(this.props.itemLength / this.state.limit)
        let createValue = {
            name: this.state.name,
            getpages: {
                limit: this.state.limit,
                pageIndex: ((this.props.itemLength % this.state.limit) == 0) ? pages + 2 : pages + 1
            }
        }
        let updateValue = {
            state: this.state,
            getpages: {
                limit: this.state.limit,
                pageIndex: this.props.activePage,
                searchData: this.state.searchData,
                isSearching: this.state.isSearching
            }
        }
        let payloadsnext = {
            limit: this.state.limit,
            pageIndex: (this.props.activePage === pages + 1) ? this.props.activePage : this.props.activePage - 1,
            searchData: this.state.searchData,
            isSearching: this.state.isSearching
        }
        let payloadsprev = {
            limit: this.state.limit,
            pageIndex: (this.props.activePage === 1) ? this.props.activePage : this.props.activePage - 1,
            searchData: this.state.searchData,
            isSearching: this.state.isSearching
        }
        let deleteValue = {
            deleteID: this.state.deleteID,
            getpages: {
                limit: this.state.limit,
                pageIndex: this.props.activePage,
                searchData: this.state.searchData,
                isSearching: this.state.isSearching
            }
        }
        if (this.props.items) {
            listData = this.props.items.map((item, key) => {
                if (key > this.state.limit - 1) {
                    return

                } else {
                    return (
                        <tr key={key} onClick={(e) => { this.setState({ updateId: item.id, updateName: item.name, deleteID: item.id }) }}>
                            <th>{item.id}</th>
                            <th>{item.name}</th>
                        </tr>
                    )
                }
            })
        }

        if (this.props.itemLength) {

            for (let i = 0; i < pages + 1; i++) {
                listPage[i] = i + 1
            }
            listPages = listPage.map((item, key) => {
                let payloads = {
                    limit: this.state.limit,
                    pageIndex: item,
                    searchData: this.state.searchData,
                    isSearching: this.state.isSearching
                }
                return (
                    <a key={key} href="#" onClick={() => this.props.getPagetoProps(payloads)}>{item}</a>
                )
            })
        }


        return (
            <div className="App-container">
                <div className="App-data">
                    số dữ liệu tối đa :
                <select onChange={(e) => {
                        this.setState({ limit: e.target.value })
                        this.props.changeLimit(e.target.value)
                    }
                    }>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <br />
                    </select>
                    <div>
                        <input value={this.state.searchData} onChange={(e) => {
                            this.props.changeTextSearch(e.target.value)
                            this.setState({ searchData: e.target.value })
                        }
                        } />
                        <button onClick={(e) => {
                            this.searchData()
                            this.props.changeIsSearching(true)
                        }}>SEARCH</button>
                        <br />
                        <table>
                            <tbody>
                                <tr>
                                    <th className="id">ID của dữ liệu</th>
                                    <th className="name">Tên của dữ liệu</th>

                                </tr>

                                {listData}

                            </tbody>
                        </table>
                        <div className="pagination">
                            <a href="#" onClick={() => this.props.getPagetoProps(payloadsprev)}>&laquo;</a>
                            {listPages}
                            <a href="#" onClick={() => this.props.getPagetoProps(payloadsnext)}>&raquo;</a>
                        </div>
                    </div>

                </div>
                {/* thêm một phần tử */}
                <div className="App-function">
                    <div>
                        Thêm: <input onChange={(e) => this.setState({ name: e.target.value })} />
                        <button onClick={() => this.createItem(createValue)}>Gửi</button>

                        <br /> <br />
                        {/* Sửa 1 phần tử */}
                        Sửa ID: {updateId}
                        <input type="text" value={updateName} onChange={(e) => this.setState({ updateName: e.target.value })} />
                        <button onClick={() => this.props.updateToProps(updateValue)}>Gửi</button>
                        <br /> <br />
                        {/* xóa một phần tử */}
                        Delete ID : {this.state.deleteID}
                        <button onClick={() => this.props.deleteToProps(deleteValue)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item;