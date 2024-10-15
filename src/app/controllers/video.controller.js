require("dotenv").config();
const ColorConsole = require("../lib/color-console");

const VideoModel = require("../models/video.model");
const { deleteOnCloudiary } = require("../utils/delete.cloudiary");

class VideoController {
  getAllVideosByUserID = async (req, res) => {
    const userID = req.params.userID;

    try {
      const videos = await VideoModel.find({
        userID,
      });

      return res.status(200).json({
        msg: "Get all videos successfully",
        data: videos,
      });
    } catch (error) {
      console.error(`Failed to get all videos of user ${userID}`, error);

      return res.status(500).json({
        msg: `Failed to get all videos of user ${userID}`,
      });
    }
  };

  getVideoByID = async (req, res) => {
    const videoID = req.params.videoID;

    try {
      const result = await VideoModel.findById(videoID);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      ColorConsole.error(`Failed to get video ${videoID}`);

      return res.status(500).json({
        msg: `Failed to get video ${videoID}: ${error}`,
      });
    }
  };

  uploadVideoByUserID = async (userID, videoUrl) => {
    VideoModel.create({
      userID,
      videoUrl,
    })
      .then((data) => {
        console.log("Uploaded video successfully", data);
      })
      .catch((error) => {
        console.error("[UPLOAD_VIDEO]", error);
      });
  };

  updateVideoByUserID = async (req, res) => {
    const videoID = req.params.videoID;
    const userID = req.params.userID;

    try {
      const { newVideo } = req.body;
      const videoModel = await VideoModel.findById({ videoID, userID });

      videoModel.video = newVideo || VideoModel.video;

      const updatedVideo = await VideoModel.save();

      return res.status(200).json({
        msg: `Updates video successfully`,
        data: updatedVideo,
      });
    } catch (error) {
      ColorConsole.error(`Failed to update video ${videoID}`);

      return res.status(500).json({
        msg: `Failed to update video: ${error}`,
      });
    }
  };

  deleteAllVideosByUserID = async (req, res) => {
    const userID = req.params.userID;
    try {
      const result = await VideoModel.deleteMany({ userID });

      return res.status(200).json({
        msg: `Delete all videos of user ${userID} successfully`,
        count: result.deletedCount,
      });
    } catch (error) {
      ColorConsole.error(
        `Failed to delete all videos of user ${userID} successfully`,
      );

      return res.status(500).json({
        msg: `Failed to delete all videos of user ${userID}: ${error}`,
      });
    }
  };

  deleteVideoByID = async (mediaValue) => {
    deleteOnCloudiary(mediaValue, false);

    await VideoModel.findOneAndDelete({
      videoUrl: { $regex: mediaValue },
    });
  };
}

const videoController = new VideoController();

module.exports = {
  videoController,
};
