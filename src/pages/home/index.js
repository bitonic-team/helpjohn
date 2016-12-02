import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../utils';
import {NavBar, Map, List} from '../../components';

class Home extends Component{

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props){
        super(props);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.zoneChange = this.zoneChange.bind(this);
        this.state = {
            zone: 1
        }
    }

    componentWillMount(){
        const {actions} = this.props;
        actions.items.getZones();
        return actions.items.list(this.state.zone);
    }

    addItem(payload){
        const {actions} = this.props;
        return actions.items.add({...payload, price: parseFloat(payload.price)});
    }

    deleteItem(id){
        const {actions} = this.props;
        return actions.items.del(id);
    }

    zoneChange(zone){
        const {actions} = this.props;
        this.setState({zone});
        return actions.items.list(zone);
    }

    render(){
        const {items, user} = this.props;
        const {list, zones} = items;

        const currentZone = user.logged
            ? zones.find(x => x.id === user.profile.zone)
            : zones.find(x => x.id === this.state.zone);

        const filteredZone = user.logged
            ? zones.filter(x => x.id === user.profile.zone)
            : zones;

        return (
            <div>
                <NavBar/>
                <div className="columns is-gapless">
                    <div className="column">
                        <List list={list}
                              currentZone={currentZone}
                              deleteItem={this.deleteItem}
                              addItem={this.addItem}/>
                    </div>
                    <div className="column is-7"
                         style={{height: '100vh'}}>
                        <Map onClickMarker={this.zoneChange}
                             zones={filteredZone}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    user: state.user,
    items: state.items
}), mapDispatchToProps)(Home);