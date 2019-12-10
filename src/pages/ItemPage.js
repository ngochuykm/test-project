import React from 'react'
import ItemContainer from '../containers/ItemPageContainer'


class ItemPage extends React.Component{
    render(){
        return(
            <div className="ItemPage">
                <a className="itemPage" href="http://localhost:3000/items" > Trang Item</a>
                <ItemContainer/>
            </div>
        );
    }
}

export default ItemPage;