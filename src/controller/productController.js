
export const productPostController = (req, res) => {
    const connection = req.app.locals.db;
    connection.collection('products').insertOne(req.body, (error, data) => {
        if (error) {
            res.status(500).send({ insert: false, message: 'Upload Error' })
        }
        res.status(200).send(data.result);
    })
}
export const productGetController = (req, res) => {
    const connection = req.app.locals.db;
    connection.collection('products').find({}).toArray((error, data) => {
        if (error) {
            res.status(500).send({ data: false, message: 'product fetch error' })
        }
        if (data.length > 0) {
            res.status(200).send({ data });
        } else {
            res.status(204).send({ data: false, message: 'No Product Available' })
        }
    })
}

