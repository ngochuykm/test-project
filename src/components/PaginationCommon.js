import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
class PaginationCommon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 11,
      totalPage: 20,
      pager: ""
    };
  }

  handleChooseActivePage(activePage) {
    this.props.onPaginate(activePage)
  }

  render() {
    let totalPage = this.props.totalPage;
    // Negate access to a page that doesn't have any data
    let activePage = this.props.activePage > totalPage ? totalPage : this.props.activePage;

    return (
      <div>
        {/* Hidden pagination bar if we don't have any data */}
        {totalPage ?
          <div className="nav-paginate">
            <Pagination>
              {(activePage !== 1) &&
                <div onClick={() => { this.handleChooseActivePage(1) }}>
                  <Pagination.First />
                </div>
              }
              {(activePage !== 1) &&
                <div onClick={() => { this.handleChooseActivePage(activePage - 1) }}>
                  <Pagination.Prev />
                </div>
              }
              {(activePage !== 1 && activePage !== 2) &&
                <div onClick={() => { this.handleChooseActivePage(1) }}>
                  <Pagination.Item>{1}</Pagination.Item>
                </div>
              }
              {(activePage === 4) &&
                <div onClick={() => { this.handleChooseActivePage(2) }}>
                  <Pagination.Item>{2}</Pagination.Item>
                </div>
              }
              {(activePage !== 1 && activePage !== 2 && activePage !== 3 && activePage !== 4) &&
                <Pagination.Ellipsis disabled />
              }
              {activePage !== 1 &&
                <div onClick={() => { this.handleChooseActivePage(activePage - 1) }}>
                  <Pagination.Item>
                    {activePage - 1}
                  </Pagination.Item>
                </div>
              }
              <div onClick={() => { this.handleChooseActivePage(activePage) }}>
                <Pagination.Item active>
                  {activePage}
                </Pagination.Item>
              </div>
              {(activePage !== totalPage) &&
                <div onClick={() => { this.handleChooseActivePage(activePage + 1) }}>
                  <Pagination.Item>
                    {activePage + 1}
                  </Pagination.Item>
                </div>
              }
              {(activePage === (totalPage - 3)) &&
                <div onClick={() => { this.handleChooseActivePage(totalPage - 1) }}>
                  <Pagination.Item>{totalPage - 1}</Pagination.Item>
                </div>
              }

              {(activePage !== totalPage && activePage !== (totalPage - 1) && activePage !== (totalPage - 2) && activePage !== (totalPage - 3)) &&
                <Pagination.Ellipsis disabled />
              }

              {(activePage !== totalPage && activePage !== (totalPage - 1)) &&
                <div onClick={() => { this.handleChooseActivePage(totalPage) }}>
                  <Pagination.Item>{totalPage}</Pagination.Item>
                </div>
              }


              {(activePage !== totalPage) &&
                <div onClick={() => { this.handleChooseActivePage(activePage + 1) }}>
                  <Pagination.Next />
                </div>
              }
              {(activePage !== totalPage) &&
                <div onClick={() => { this.handleChooseActivePage(totalPage) }}>
                  <Pagination.Last />
                </div>
              }
            </Pagination>
          </div>
          :
          <div></div>
        }
      </div>
    );
  }

}

export default PaginationCommon;
