// fetch homepage of the website from ../views/index.ejs and render it
exports.homeRoutes = (req, res) => {
    res.render('index');
}
// fetch add_user page from ../views/add_user.ejs and render it
exports.add_book = (req, res) => {
    res.render('add_book');
}
// fetch update_user page from ../views/update_user.ejs and render it
exports.update_book = (req, res) => {
    res.render('update_book');
}
