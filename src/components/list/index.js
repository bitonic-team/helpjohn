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

const SortableItem = SortableElement(({data, index, del, donate, amount}) => {

    const storage = JSON.parse(localStorage.getItem('john'));
    const percent = (data.amount) / data.price * 100;

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
                    {(amount && !storage) && <p className="is-pulled-right">
                        <a className="button item-priority is-outlined"
                           onClick={donate(data.id)}
                           style={{marginLeft: '5px'}}>Participate</a>
                    </p>}
                    <p className="item-priority is-pulled-right">
                        <span style={{fontSize: '0.9em'}}
                              className="tag item-tag">Priority{index + 1}</span>
                    </p>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <Line percent={percent > 100 ? 100 : percent}
                          strokeWidth={1.5}
                          trailWidth={1.5}
                          strokeColor={'#3676D9'} />
                    {percent >= 100 && <p>Yeeah, we explode the donations for today ({percent}%)</p>}
                </div>
                <div className="column is-narrow">
                    <p className="item-price">{data.price} € {data.daily ? 'per day' : ''}</p>
                </div>
            </div>

        </div>
    );
});

const SortableList = SortableContainer(({items, del, donate, amount}) => {
    return <ul>{items.map((value, index) => <SortableItem key={`item-${index}`} 
                                                          index={index}
                                                          del={del}
                                                          amount={amount}
                                                          donate={donate}
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
        this.donate = this.donate.bind(this);

        this.state = {
            name: '',
            pseudo: '',
            amount: '',
            price: '',
            tag: 'food',
            description: '',
            daily: false,
            isAdd: false,
            items: props.list,
            step: 1
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

    donate(id){
        const {donate} = this.props;
        const {pseudo, amount} = this.state;
        return () => {
            this.setState({step: 3, amount: ''});
            return donate({id, name: pseudo, amount: parseFloat(amount)})
        }
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
                                    className="button is-info is-outlined list-button">Cancel</button>
                            <button onClick={this.add}
                                    className="button is-success is-outlined list-button">Add</button>
                        </p>

                    </div>
                </div>
            </div>
        )
    }

    list(){
        const {user, currentZone} = this.props;
        const {items, amount} = this.state;

        return (
            <div>
                <div className="columns">
                    <div className="column">
                        <p style={{fontSize: '1.3em', textAlign: 'center', marginTop: 10}}> Refugees intervention zone: {currentZone && currentZone.name || 'Inconnue'}</p>
                    </div>
                </div>
                <div className="columns is-paddingless">
                    <div className="column list">
                        {items.length > 0 && <SortableList items={items}
                                                           amount={amount}
                                                           del={this.del}
                                                           donate={this.donate}
                                                           shouldCancelStart={() => !user.logged}
                                                           distance={5}
                                                           onSortEnd={this.onSortEnd} />}
                    </div>
                </div>
                {!items.length && <p style={{fontSize: '1.3em', textAlign: 'center'}}>No items for this zone, please select an other marker</p>}
                <p className="control is-pulled-right">
                    {user.logged && <button onClick={() => this.setState({isAdd: true})}
                            className="button is-info is-outlined list-button">Add an item</button>}
                </p>
            </div>


        );
    }

    render(){
        const {user, currentZone} = this.props;
        const {isAdd, step, pseudo, amount} = this.state;

        return (
            <div>
                {!user.logged && <div className="columns is-paddingless">
                    <div className="column ia">
                        {step === 1 && <div>
                            <p style={{fontSize: '1.4em', textAlign: 'center'}}>
                                Hello I'm John Doe, give me your name to know you better:
                            </p>
                            <input className="input"
                                   style={{marginTop: '20px'}}
                                   onChange={this.change('pseudo')}
                                   value={pseudo}
                                   type="text"
                                   placeholder="Donator name"/>

                            <button onClick={() => this.setState({step: 2})}
                                    style={{marginTop: '10px'}}
                                    className="button is-info is-outlined is-pulled-right">OK Let's go</button>

                        </div>}

                        {step === 2 && <div>
                            <p style={{fontSize: '1.4em', textAlign: 'center'}}>
                                Choose your amount and click "Participate" on one card:
                            </p>
                            <input className="input"
                                   style={{marginTop: '20px'}}
                                   onChange={this.change('amount')}
                                   value={amount}
                                   type="text"
                                   placeholder="amount"/>
                        </div>}

                        {step === 3 && <div>
                            <p style={{fontSize: '1.4em', textAlign: 'center'}}>
                                Thank you very much from the {currentZone.pop} refugees from {currentZone.name}
                                <button onClick={() => this.setState({step: 1})}
                                        style={{marginTop: '10px'}}
                                        className="button is-info is-outlined is-pulled-right">Participate again</button>
                            </p>
                        </div>}
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