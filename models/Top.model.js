const mongoose = require("mongoose");

const topSchema = mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  communityId: [
    {
      ref: "community",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Top = mongoose.model("Top", topSchema);

module.exports = Top;
