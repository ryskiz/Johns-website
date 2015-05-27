var app = angular.module("app", []);

app.controller("SiteControl", function () {
    this.infos = john;
});
var john = {
    name: 'John Mckinney',
    title: 'Contact John',
    comments: [{
        body: "Set comment",
        author: "ryan.skinner@tkc.edu"

    }]
};
app.controller("CommentController", function(){

    this.comments = {};

    this.addComment = function(site){
        this.comments.createdOn = Date.now();
        site.infos.comments.push(this.comments);
        this.comments = {};
    };
});

