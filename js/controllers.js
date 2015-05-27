
angular.module('commentController', [])

    .controller('mainController', function($scope, $http, Comments) {
        $scope.formData = {};

        Comments.get()
            .success(function(data) {
                $scope.comments = data;
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createComment = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            // people can't just hold enter to keep adding the same to-do anymore
            if (!$.isEmptyObject($scope.formData)) {

                // call the create function from our service (returns a promise object)
                Comments.create($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.comments = data; // assign our new list of todos
                    });
            }
        };

        $scope.deleteComment = function(id) {
            Comments.delete(id)
                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.comments = data; // assign our new list of todos
                });
        };
    })