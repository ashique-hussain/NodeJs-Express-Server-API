
const profileController = (req, res) => {
    const connection = req.app.locals.db;
    const { email } = req.body;
    connection.collection('users').findOne({ email }, (error, data) => {
        if (error) {
            res.status(500).send('server error');
        }
        delete data.password;
        res.status(200).send(data);
    })
}

module.exports = profileController;