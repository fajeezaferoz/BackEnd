const mongoose = require('mongoose');

const authorizerSchema = new mongoose.Schema({
  Authorizer_ID: { type: String, unique: true },
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone_Number: { type: String, required: true, unique: true },
  roles: { type: Array, required: true}
}, { timestamps: true });
 
authorizerSchema.pre('save', function(next) {
    if (!this.Authorizer_ID) {
      // Generate Authorizer_ID from username (lowercase and joined with '-')
      this.Authorizer_ID = this.username.toLowerCase().replace(/\s+/g, '-');
    }
    next();
  });
  
  // Export the schema as a model
const Authorizer = mongoose.model("authorizer", authorizerSchema, "authorizer");
  
module.exports = Authorizer;
  