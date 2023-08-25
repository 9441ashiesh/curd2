var Userdb = require('../models/model')

exports.create=(req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }
    //new book

    const book = new Userdb({
        BookID:req.body.bookid,
        BookName:req.body.bookname,
        AuthorName:req.body.authorname,
        BookPrice:req.body.bookprice,
        PublishedDate:req.body.publisheddate,
        IsAvailable:req.body.isavailable
    })
    //save book in the database
    book
        .save(book)
        .then(data=>{
            //res.send(data)
            res.redirect('/add-book')
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while creating a create operation"
            });
        });
}

exports.getBook=(req,res)=>{
    Userdb.find()
        .then(book=>res.send(book))
        .catch(err=>{
            res.status(500).send({message:err.message || "Error Occurred while retriving book information"})
        })
}

exports.find=(req,res)=>{
    //validate request
    if(req.query.id){
        const id=req.query.id;
        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found book with id"+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving book with id"+id})
            })
        }
    else{
        Userdb.find()
            .then(book=>{
                res.send(book)
            })
            .catch(err=>{
                res.status(500).send({message:err.message || "Error Occurred while retriving book information"})
            })
    }
}

exports.update=(req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"Data to update can not be empty"})
    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Update book with ${id}.Maybe book not found`})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error Update book information"})
        })
        
    
}

exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Delete with id ${id}.Maybe id is wrong`})
            }else{
                res.send({
                    message:"book was deleted successfully!"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete book with id="+id
            });
        });
}