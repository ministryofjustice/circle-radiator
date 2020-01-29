const express = require('express')
const request = require('request')
const router = express.Router()

const Build = require('../model/build_model')

router.get('/health/:uri/:endpoint', (req, res) => {
  req.headers['host'] = req.params.uri
  req.headers['Access-Control-Allow-Origin'] = '*'
  req.headers['Accept-Encoding'] = 'gzip, deflate, br'
  res.header('Access-Control-Allow-Origin', '*')
  req.pipe(request(`https://${req.params.uri}/${req.params.endpoint}`)).pipe(res)
})

router.get('/build/:name', (req, res) => {
  Build.find({ name: req.params.name }, (err, docs) => {
    res.send(err ? void 0 : docs[0])
  })
})

router.put('/build', (req, res) => {
  const build = {
    name: `${req.body.type}-${req.body.data.reponame}`,
    build: req.body.data.build_num,
    data: req.body.data
  }

  Build.findOneAndUpdate({ name: `${req.body.type}-${req.body.data.reponame}` }, build, {}, (err, result) => {
    result = result || new Build(build)
    result.save(e => {
      if (!e) {
        res.send('Saved build')
      }
    })
  })
})

module.exports = router
