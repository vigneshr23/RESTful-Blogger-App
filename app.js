var express     = require("express"),
    bodyParser  = require("body-parser"),
    bodySanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    mongoose    = require("mongoose"),
    app         = express();
    
    //setup
    app.set("view engine","ejs");
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodySanitizer());
    app.use(methodOverride("_method"));
    
    mongoose.connect("mongodb://localhost/restful_blog_app",{useMongoClient: true});
    
    // title, image, body, created-date
    var blogSchema = new mongoose.Schema({
        title: String,
        image: {type: String, default: '/image/no-image.jpg'},
        body: String,
        created: {type: Date, default: Date.now}
    });
    
    var Blog = mongoose.model("Blog", blogSchema);
    
    /*Blog.create({
        title: "test blog",
        image: "http://www.vigneshofficial.com/wp-content/uploads/2017/08/nodejs-creating-rest-api.png",
        body: "<p>Accourding to the source of <em>Wikipidia</em><br>Representational state transfer (REST) or RESTful web services is a way of providing interoperability between computer systems on the Internet. REST-compliant Web services allow requesting systems to access and manipulate textual representations of Web resources using a uniform and predefined set of stateless operations.</p>"
    });
    */
    
    // Restful routes
    
    app.get("/", function(req, res){
       res.redirect("/blogs");
    });
    
    // Index route
    app.get("/blogs", function(req, res){
        Blog.find({}, function(err, blogs) {
            if(!err){
                res.render("index",{"blogs": blogs});
            }
            else {
                console.log("err");
            }
            
        });
    });
    
    // create new blog form
    app.get("/blogs/new", function(req, res) {
        res.render("new");
    });
    
    // create blog and redirect
    app.post("/blogs", function(req, res) {
        req.body.blog.body = req.sanitize(req.body.blog.body);
       // create blog
       Blog.create(req.body.blog, function(err, newBlog) {
           if(!err) {
               console.log(newBlog);
               res.redirect("/blogs");
           }
           else {
               console.log(err);
               res.render("new");
           }
       });
       
    });
    
    
    // Show route
    app.get('/blogs/:id', function(req, res) {
        Blog.findById(req.params.id, function(err, newblog) {
            if(!err) {
                res.render("show", {"blog": newblog});
            }
            else {
                res.send('Blog not found.<br /> <a href="/blogs">Go back</a>');
            }
        });
    });
    
    // Edit route
    app.get('/blogs/:id/edit', function(req, res) {
        Blog.findById(req.params.id, function(err, editBlog){
            if(!err) {
                res.render("edit", {"editBlog": editBlog});
            }
            else {
                res.render("not-found",{"key":req.params.id});
            }
        });
    });
    
    // update route
    app.put('/blogs/:id', function(req, res) {
        req.body.blog.body = req.sanitize(req.body.blog.body);
       Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
           if(!err) {
               res.redirect("/blogs/" +req.params.id);
           }
           else {
               res.redirect("/blogs");
           }
       });
      // res.send('PUT Req for update');
    });
    
    // delete route
    app.delete('/blogs/:id', function(req, res) {
        Blog.findByIdAndRemove(req.params.id, function(err) {
            if(!err) {
                res.redirect("/blogs");
            }
            else {
                res.send("<p>Something went wrong!</p>");
            }
        });
    });
    
    
    // Invalid request
    app.get("*/:key", function(req, res) {
        var reqParams = req.params.key;
        res.render("not-found",{"key":reqParams});
    });
    
    app.listen(3000, function(){
        console.log("Server started...");
    });