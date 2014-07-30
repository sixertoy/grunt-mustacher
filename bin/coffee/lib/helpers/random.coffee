"use strict"
MustacherHelperRandom = undefined
Handlebars = require("handlebars")
_utils = require("../utils")
MustacherHelperRandom = ((_) ->
  MustacherHelperRandom = ->
  MustacherHelperRandom::register = ->
    args = undefined
    $this = this
    _.registerHelper "$random", ->
      args = _utils.arguments(arguments_)
      $this.compile.apply $this, args

    return

  MustacherHelperRandom::compile = (round, minVal, maxVal) ->
    min = undefined
    max = undefined
    bool = false
    result = Math.random()
    if _utils.isBoolean(round) and not _utils.isNumber(round)
      bool = round
      result = Math.random() * minVal  if _utils.isNumber(minVal)
      result = ((Math.random() * (maxVal - minVal)) + minVal)  if _utils.isNumber(maxVal)
    else if _utils.isNumber(round)
      min = round
      result = Math.random() * min
      if _utils.isNumber(minVal)
        max = minVal
        result = Math.random() * (max - min) + min
    result = Math.floor(result)  if bool
    result

  MustacherHelperRandom
)(Handlebars)
module.exports = new MustacherHelperRandom()
