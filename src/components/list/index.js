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

const SortableItem = SortableElement(({data, index, del}) => {

    const storage = JSON.parse(localStorage.getItem('john'));

    return (
        <div className="item">
            <div className="columns">
                <div className="column">
                    <span className="item-name">{data.name}</span>
                    <span className={`tag item-tag ${equivalences[data.tag]}`}>{data.tag}</span>
                </div>
                <div className="column">
                    {storage && <p className="is-pulled-right">
                        <a className="button item-priority is-danger"
                           onClick={del(data.id)}
                           style={{marginLeft: '5px'}}>Delete</a>
                    </p>}
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
                          strokeColor={'#3676D9'} />
                </div>
                <div className="column is-narrow">
                    <p className="item-price">{data.price} € {data.daily ? 'par jour' : ''}</p>
                </div>
            </div>

        </div>
    );
});

const SortableList = SortableContainer(({items, del}) => {
    return <ul>{items.map((value, index) => <SortableItem key={`item-${index}`} 
                                                          index={index}
                                                          del={del}
                                                          data={value} />)}</ul>
});


class List extends Component{

    constructor(props){
        super(props);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.adder = this.adder.bind(this);
        this.list = this.list.bind(this);
        this.change = this.change.bind(this);
        this.add = this.add.bind(this);
        this.del = this.del.bind(this);

        this.state = {
            name: 'Produit vaiselle',
            price: 20,
            tag: 'food',
            description: '',
            daily: false,
            isAdd: false,
            items: props.list
        }
    }

    componentWillReceiveProps(next){
        if(next.list){
            return this.setState({items: next.list});
        }
    }
    
    change(type, options){
        return (e) => {
            const value = e.target.value;
            return this.setState({[type]: options ? options.val : value})
        }
    }

    add(){
        const {addItem} = this.props;
        const {items} = this.state;
        const {name, price, tag, description, daily} = this.state;
        this.setState({isAdd: false});
        return addItem({name, price, tag, description, daily, priority: items.length});
    }

    del(id){
        const {deleteItem} = this.props;
        return () => deleteItem(id);
    }

    onSortEnd({oldIndex, newIndex}){
        const {actions} = this.props;
        const newArray = arrayMove(this.state.items, oldIndex, newIndex);
        actions.items.update(newArray);
        return this.setState({items: newArray});
    }

    adder(){
        const {name, price, tag, description, daily} = this.state;

        return (
            <div>
                <div className="columns">
                    <div className="column list-form">
                        <p className="control">
                            <input className="input"
                                   onChange={this.change('name')}
                                   value={name}
                                   type="text"
                                   placeholder="Name"/>
                        </p>

                        <p className="control">
                            <input className="input"
                                   onChange={this.change('price')}
                                   value={price}
                                   type="text"
                                   placeholder="Price"/>
                        </p>

                        <div className="control">
                            <div className="select is-fullwidth">
                                <select  value={tag}
                                         onChange={this.change('tag')}>
                                    <option>food</option>
                                    <option>health</option>
                                    <option>material</option>
                                </select>
                            </div>
                        </div>

                        <div className="control">
                            <textarea className="textarea"
                                      value={description}
                                      onChange={this.change('description')}
                                      placeholder="Explain why is it for"/>
                        </div>

                        <p>Daily ?</p>
                        <p className="control">
                            <label className="radio">
                                <input onChange={this.change('daily', {val: true})}
                                       value={daily}
                                       type="radio"
                                       name="question"/>
                                Yes
                            </label>
                            <label className="radio">
                                <input onChange={this.change('daily', {val: false})}
                                       value={daily}
                                       type="radio"
                                       name="question"/>
                                No
                            </label>
                        </p>

                        <p className="control is-pulled-right">
                            <button onClick={() => this.setState({isAdd: false})}
                                    className="button is-info is-outlined list-button">Annuler</button>
                            <button onClick={this.add}
                                    className="button is-success is-outlined list-button">Ajouter</button>
                        </p>

                    </div>
                </div>
            </div>
        )
    }

    list(){
        const {user, currentZone} = this.props;
        const {items} = this.state;

        return (
            <div>
                <div className="columns">
                    <div className="column">
                        <p style={{fontSize: '1.3em', textAlign: 'center', marginTop: 10}}>Zone: {currentZone && currentZone.name}</p>
                    </div>
                </div>
                <div className="columns is-paddingless">
                    <div className="column list">
                        {items.length > 0 && <SortableList items={items}
                                      del={this.del}
                                      distance={5}
                                      onSortEnd={this.onSortEnd} />}
                    </div>
                </div>
                {!items.length && <p style={{fontSize: '1.3em', textAlign: 'center'}}>No items for this zone, please select an other marker</p>}
                <p className="control is-pulled-right">
                    {user.logged && <button onClick={() => this.setState({isAdd: true})}
                            className="button is-info is-outlined list-button">Ajouter un item</button>}
                </p>
            </div>


        );
    }

    render(){
        const {user} = this.props;
        const {isAdd} = this.state;

        return (
            <div>
                {!user.logged && <div className="columns is-paddingless">
                    <div className="column ia">

                    </div>
                </div>}
                {isAdd ? this.adder() : this.list()}
            </div>
        );
    }
}


export default connect((state) => ({
    user: state.user
}), mapDispatchToProps)(List);