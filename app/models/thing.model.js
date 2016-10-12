// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ThingSchema = new Schema({
  
  name: String,
  info: String
});

ThingSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Thing', ThingSchema);

