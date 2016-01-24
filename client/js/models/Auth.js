var m = require('mithril');

var storage;
if (!storage) {
    try {
        storage = localStorage;
    } catch (e) {
        storage = {};
    }
}

var Auth = module.exports = {
    token: storage.token,
    userid: storage.userid,

    // trade credentials for a token
    login: function(userid, password) {
        return m.request({
                method: 'POST',
                url: '/auth/login',
                data: {
                    userid: userid,
                    password: password
                },
                unwrapSuccess: function(res) {
                    Auth.token = storage.token = res.token;
                    Auth.userid = storage.userid = res.userid;
                    return { token: res.token, userid: res.userid };
                } 
            })
            .then(function(data) {
                // Auth.token = storage.token = token;// duplicate as above
                // console.log('auth31-data', data);
            });
    },

    // delete token and storage
    logout: function() {
        this.token = false;
        this.userid = false;
        delete storage.token;
        delete storage.userid;
    },

    // signup on the server for new login credentials
    register: function(userid, email, password, password2) {
        return m.request({
            method: 'POST',
            url: '/auth/register',
            data: {
                userid: userid,
                email: email,
                password: password,
                password2: password2
            }
        });
    },

    // ensure verify token is correct
    // verify: function(token){
    //   return m.request({
    //     method: 'POST',
    //     url: '/auth/verify',
    //     data: {token: token}
    //   });
    // },
    verify: function(token) {
        return m.request({
            method: 'GET',
            url: '/auth/verify',
            data: {
                token: token
            }
        });
    },

    // get current user object
    user: function() {
        return Auth.req('/auth/user');
    },

    // make an authenticated request
    req: function(options) {
        if (typeof options == 'string') {
            options = {
                method: 'GET',
                url: options
            };
        }
        var oldConfig = options.config || function() {};
        options.config = function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + Auth.token);
            oldConfig(xhr);
        };

        // try request, if auth error, redirect
        // TODO: remember where the user was, originally
        var deferred = m.deferred();
        m.request(options).then(deferred.resolve, function(err) {
            if (err.status === 401) {
                Auth.originalRoute = m.route();
                m.route('/login');
            }
        });

        return deferred.promise;
    }
};
