angular.module('irvingchat', [
	'ui.router'
])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/signin");
  
  $stateProvider
    .state('signin', {
      url: "/signin",
      views: {
        "": {
            templateUrl: "./client/templates/signin.html"
        }
      }
    })
    .state('signup', {
      url: "/signup",
      views: {
        "": {
            templateUrl: "./client/templates/signup.html"
        }
      }
    })
    .state('chat', {
      url: "/chat",
      views: {
        "": {
            templateUrl: "./client/templates/chat.html"
        }
      }
      // resolve: {
      //   'currentAuth': ["Auth", function(Auth){
      //     return Auth.$waitForAuth();
      //   }
      // ]}
    })
    .state('admin', {
      url: "/admin",
      views: {
        "": {
            templateUrl: "./client/templates/admin.html"
        }
      }
    })

})

// .factory('Auth', function($firebaseAuth){
//     var authData = $scope.authObj.$getAuth();
//     console.log("authData!! ", authData);
//     return {
//       authData: authData
//     };
// })

.factory('DataBase', function($state){
  var ref = new Firebase("https://irvingchat.firebaseio.com");
  var userData;
  // will use this later as there name!
  // var username;

  var createUser = function(email, password){
    // save the email to user name

    ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        // redirecting to signin page
        $state.go('signin');
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  };

  var signin = function(email, password){
    // var ref = new Firebase("https://irvingchat.firebaseio.com");
    ref.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        userData = authData;
        // redirecting to chat
        $state.go('chat');

        console.log(authData, "authData BRO!");
      }
    }, {
      remember: "sessionOnly"
    });
  };


  return {
    createUser: createUser,
    signin: signin,
    ref: ref
  };
})
