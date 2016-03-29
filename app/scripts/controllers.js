'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            $scope.dishes = menuFactory.getDishes().query().$promise.then( function(response){
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
            
/*
            $scope.dishes= {};
             menuFactory.getDishes()
            .then(
                function(response) {
                    $scope.dishes = response.data;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
*/
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
            
            
        }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {
            
           
          
            
            $scope.sendFeedback = function() {
               
               
                feedbackFactory.myFeedback().save($scope.feedback);
                
                console.log($scope.feedback);
                
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            
            $scope.showDish = true;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish=true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            /*
            $scope.dish = {};
                        menuFactory.getDish(parseInt($stateParams.id,10))
            .then(
                function(response){
                    $scope.dish = response.data;
                    $scope.showDish=true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            */
        }])
        
     .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };
        $scope.submitComment = function () {
            $scope.mycomment.date = new Date().toISOString();
            console.log($scope.mycomment);
            $scope.mycomment.rating = parseInt(($scope.mycomment.rating),10);
            $scope.dish.comments.push($scope.mycomment);
            menuFactory.getDishes().update({
                id: $scope.dish.id
            }, $scope.dish);
            $scope.commentForm.$setPristine();
            $scope.mycomment = {
                rating: 5,
                comment: "",
                author: "",
                date: ""
            };
        }
            }])

       
       
        .controller ('IndexController',['$scope','menuFactory','corporateFactory', function($scope, menuFactory,corporateFactory){
            $scope.showPromotion = false;
            $scope.promotionMessage = "Finding the best promotion...";
            $scope.promotion = menuFactory.getPromotion().get({id:0}).$promise.then(
                function(response){
                    $scope.promotion = response;
                    $scope.showPromotion = true;
                },
                function(response){
                    $scope.promotionMessage = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:0}).$promise.
            then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                 function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
            /*
            $scope.dish={};
            menuFactory.getDish(0)
            .then(
                function(response){
                    $scope.dish = response.data;
                    $scope.showDish = true;
                },
                 function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            */
            $scope.leadershipMessage = "Loading...";
            $scope.showLeadership = false;
            $scope.chef = corporateFactory.getLeaders().get({id:3}).$promise.
            then(
                function(response){
                    $scope.showLeadership = true;
                    $scope.chef = response;
                },
                function(response){
                    $scope.leadershipMessage = "Error: "+response.status + " " + response.statusText;
                }
            );
        }])
        
        .controller ('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
            $scope.leadershipMessage = "Loading...";
            $scope.showLeadership = false;
            $scope.leaders = corporateFactory.getLeaders().query().$promise.
            then(
                function(response){
                    $scope.showLeadership = true;
                    $scope.leaders = response;
                },
                function(response){
                    $scope.leadershipMessage = "Error: "+response.status + " " + response.statusText;
                }
            );
           
        }])

;