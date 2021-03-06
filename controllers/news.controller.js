const News = require("../models/News.model");
const e = require("express");

module.exports.newsController = {
  postNews: async (req, res) => {
    try {
      const { community, title, text } = req.body;
      const { filename } = req.file;
      console.log(req.file, req.body);
      
      const createNews = await News.create({
        community,
        title,
        text,
        image: filename,
      });
      res.json(createNews);
    } catch (error) {
      console.error({ error: e.message });
    }
  },

  getAllNews: async (req, res) => {
    try {
      const getFunction = await News.find({});
      res.json(getFunction);
    } catch (error) {
      console.error({ error: "Ошибка при получении новостей" });
    }
  },
  getNewsByCommunity: async (req, res) => {
    try {
      const getNews = await News.find({ community: req.params.id });
      res.json(getNews);
    } catch (error) {
      console.error({ error: "Ошибка при получении новостей по id" });
    }
  },
  addLike: async (req, res) => {
    try {
      const like = await News.findByIdAndUpdate(req.params.id, {
        $addToSet: { likes: req.body.likes },
      });
      res.json(like);
    } catch (error) {
      console.error({ error: "Ошибка при добавлении лайков" });
    }
  },
  deleteLike: async (req, res) => {
    try {
      console.log(req.body.likes);
      const likeDel = await News.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likes: req.body.likes },
        },
        {
          new: true,
        }
      );
      res.json(likeDel);
    } catch (error) {
      res.status(504).json({ error: "Ошибка при удалении лайков" });
    }
  },
  addDislike: async (req, res) => {
    try {
      const dilike = await News.findByIdAndUpdate(req.params.id, {
        $addToSet: { dislikes: req.body.dislikes },
      });
      res.json(dilike);
    } catch (error) {
      res.json({ error: "Ошибка добавления дизлайков" });
    }
  },
  delDislike: async (req, res) => {
    try {
      const dislikeDel = await News.findByIdAndUpdate(req.params.id, {
        $pull: { dislikes: req.body.dislikes },
      });
      res.json(dislikeDel);
    } catch (error) {
      res.json({ error: "Ошибка удаления дизлайка" });
    }
  },
  deleteNews: async (req, res) => {
    try {
      const deleteNewsFunction = await News.findByIdAndRemove(req.params.id);
      res.json(deleteNewsFunction);
    } catch (error) {
      console.error({ error: "Ошибка при удалении новостей" });
    }
  },
};
