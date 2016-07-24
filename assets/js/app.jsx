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
        auth.logout()
        this.context.router.replace('/app/login/')
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
            <h4> 안녕하세요, {this.state.user.username}님 로그인 되었습니다.</h4>
            <button onClick={this.logoutHandler}>Log out</button>
            </div>
        )
    }
})