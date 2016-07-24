var React = require('react')
var auth = require('./auth')

module.exports = React.createClass({
   getInitialState: function() {
        return {'user':[]}
    },

    componentDidMount: function() {
        this.loadUserData()
    },

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    logoutHandler: function() {
        auth.logout(
        this.context.router.replace('/app/logout/')    //'/app/login '
        )
         /*
         auth.login(username, pass, (loggedIn) => {
            this.context.router.replace('/app/logout/')
        })*/
    },

    loadUserData: function() {
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

    render: function() {
        return (
            <div>
            <h3>안녕,테스트 중이에요~1차 완료~You are now logged in, {this.state.user.username}</h3>
            <button onClick={this.logoutHandler}>Log out</button>
            </div>
        )
    }
})


  let user = 'email=' + encodeURIComponent(this.refs.email.getValue())
             + '&password=' + encodeURIComponent(this.refs.password.getValue());


    // create an AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.onload = function() {
      let state = {};