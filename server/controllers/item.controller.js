const { User, ToWatch, Watched } = require('../database-mongo/Item.model');

exports.getPrefsById = function (req, res) {
    Promise.all([
        ToWatch.find({ userId: req.headers.userid }),
        Watched.find({ userId: req.headers.userid })
    ]).then((r) => res.send(r)).catch((err) => res.send(err))

};

exports.addPref = function (req, res) {
    if (req.body.watched) {
        let watched = req.body.watched
        watched.userId = req.headers.userid
        Watched.create(watched).then(() => {
            ToWatch.findByIdAndDelete(watched._id).then((e) => console.log(e))
        }).catch((err) => res.send(err))
    }
    else if (req.body.toWatch) {
        let toWatch = req.body.toWatch
        toWatch.userId = req.headers.userid

        ToWatch.create(toWatch).then((r) => {
            res.send()
        }).catch((err) => res.send(err))
    }
};
