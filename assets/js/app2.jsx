var React = require('react')
var auth = require('./auth')

module.exports = React.createClass({
   /*
   getInitialState(){
        return {'user':[]}
    },
    */
    constructor(props) {
    super(props);
    this.state = {count: [] };
  }


  /*componentDidMount 하위컴포넌트에서 상위컴포넌트*/
    componentDidMount() {
        this.loadUserData()
    },

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    logoutHandler(){
        auth.logout(
        this.context.router.replace('/app/login')    //'/app/login '
        )
         /*
         auth.login(username, pass, (loggedIn) => {
            this.context.router.replace('/app/logout/')
        })*/
    },


    loadUserData() {
       $.ajax({
            method: 'GET',
            url: '/api/users/i/',
            datatype: 'json',
            headers: {
                'Authorization': 'Token ' + localStorage.token
            },
            success: function(res) {
                this.setState({user: res})
            }.bind(this)
        })
     },


    render() {
     return(
      <div>
            <h3>안녕,테스트 중이에요~1차 완료~You are now logged in, {this.state.user.username}</h3>
            <button onClick={this.logoutHandler}>Log out</button>
            </div>

     )
    }


})