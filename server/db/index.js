const { db } = require('./db.js');
const { Employee } = require('./models/Employee.js');
const { Component } = React;
const { HashRouter, Route, Link } = ReactRouterDOM;

module.exports = { db, Employee };

//Store -globalized state

class Store{
    constructor(initialState){
        this.state =  initialState;
        this.listeners =  [];
    }
    subscribe(listener){
    this.listeners.push(listener);
    return()=> this.listeners = this.listeners.filter(_listener => _listener !== listener) 

    }
    dispatch(change){
        this.state = {...this.state, ...change};
        this.listeners.forEach(listener(this.state))
    }
}

const connect = (Component) => {

    class Connected extends Component {
        constructor() {
            super(),
                this.state = store.state;
        }
        componentWillUnMount() {
            this.unsubscribe();
        }
        compnentDidMount() {
            this.unsubscribe = store.subscribe(state => this.setState(state))
        }
        render(){
            return(
                <Component {...this.state} {...this.props}/>
            )
        }
    }

return Connected;
}

const store = new Store({employees:[]})

const addEmployees = () => {
    Employee.get("")
}

class Nav extends Component{
    constructor(){
        super();
        this.state = store.state;
        
    }
    componentDidMount() {
        store.subscribe(state => this.setState(state))
    }

    render(){
        const  { employees } = this.state
        return (
            <nav>
                <Link to="/employees">Employees</Link>
            </nav>
        )
    }

}

// class Employees extends Component{
//     constructor(){
//         super(),
//         this.state = store.state
//     }

//     componentWillMount(){
//         this.unsubscribe();
//     }

//     componentDidMount(){
//         this.unsubscribe = store.subscribe(state => this.setState(state))
//     }

//     render(){
//         const { employees } = this.state
//         return(
//             <ul>
//                 {
//                     employees.map((employee, idx) => {
//                     <li key = {idx}>{employee.name}</li>
//                     }
//                     )
//                 }
//             </ul>
//         )
//     }

// }

const Employees = connect(({employees}) => {
    return (
            <ul>
                {
                    employees.map((employee, idx) => {
                    <li key = {idx}>{employee.name}</li>
                    }
                    )
                }
            </ul>
        )
})


class App extends Component{
    componentDidMount(){
        addEmployees()
    }
    render(){
        <HashRouter>
            <Route component = { Nav }/>
        </HashRouter>
    }
}

//Action-describes what you want to do 
//Reducer - takes action and modifies 