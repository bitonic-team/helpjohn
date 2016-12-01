import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {Line} from 'rc-progress';
import {mapDispatchToProps} from '../../utils';

const equivalences = {
    health: 'is-info',
    food: 'is-success',
    material: 'is-warning'
};

const SortableItem = SortableElement(({data, index}) => {
    return (
        <div className="item">
            <div className="columns">
                <div className="column">
                    <span className="item-name">{data.name}</span>
                    <span className={`tag item-tag ${equivalences[data.tag]}`}>{data.tag}</span>
                </div>
                <div className="column">
                    <p className="item-priority is-pulled-right">
                        <span className="tag item-tag">Priorité {index + 1}</span>
                    </p>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <Line percent={10}
                          strokeWidth={1.5}
                          trailWidth={1.5}
                          strokeColor={'#3498db'} />
                </div>
                <div className="column is-narrow">
                    <p className="item-price"> / 500 €</p>
                </div>
            </div>

        </div>
    );
});

const SortableList = SortableContainer(({items}) => {
    return <ul>{items.map((value, index) => <SortableItem key={`item-${index}`} 
                                                          index={index} 
                                                          data={value} />)}</ul>
});


class List extends Component{

    constructor(props){
        super(props);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.state = {
            items: [{name: 'Papier toilette', tag: 'health'}, {name: 'Eau minérale', tag: 'food'}]
        }
    }

    onSortEnd({oldIndex, newIndex}){
        return this.setState({items: arrayMove(this.state.items, oldIndex, newIndex)});
    }

    render(){
        const {user} = this.props;
        const {items} = this.state;

        return (
            <div>
                {!user.logged && <div className="columns is-paddingless">
                    <div className="column ia">

                    </div>
                </div>}
                <div className="columns is-paddingless">
                    <div className="column list">
                        <SortableList items={items}
                                      onSortEnd={this.onSortEnd} />
                    </div>
                </div>
            </div>
        );
    }
}


export default connect((state) => ({
    user: state.user
}), mapDispatchToProps)(List);