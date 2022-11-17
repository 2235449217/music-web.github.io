// useRef获取dom，useEffect发送请求，useState存储数据，useCallback回调
import React, { memo, useRef, useEffect, useState, useCallback } from "react";
// 封装的工具函数
import { getSizeImage, formatDate, getPlaySong } from "@/utils/format-utils";
// 滚动条组件
import { Slider } from "antd";
import { NavLink } from "react-router-dom";
import { message } from "antd";
// 样式
import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";
// 通过hooks请求的方法，存储redux
import { useDispatch, useSelector, shallowEqual } from "react-redux";
// redux中请求的方法
import {
  getSongDetailAction,
  changeSequenceAction,
  changeCurrentIndexAndSongAction,
  changeCurrentLyricIndexAction,
} from "../store/actionCreators";

// import { getSongDetail } from "@/services/player";

export default memo(function HYAppPlayerBar() {
  // 1.props and state  接受父组件传来的数据和存在state中的数据
  //   存储歌曲播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //   存储进度调
  const [progress, setProgress] = useState(0);
  //      是否滚动调有改变
  const [isChanging, setIsChanging] = useState(false);
  //设置是否播放的变量
  const [isPlaying, setIsPlaying] = useState(false);

  // 2.redux hook 解构获取里面的数据

  const { currentSong, sequence, lyricList, currentLyricIndex } = useSelector(
    (state) => ({
      currentSong: state.getIn(["player", "currentSong"]),
      // 获取原来的sequence
      sequence: state.getIn(["player", "sequence"]),
      // 歌词
      lyricList: state.getIn(["player", "lyricList"]),
      currentLyricIndex: state.getIn(["player", "currentLyricIndex"]),
    }),
    shallowEqual
  );
  // 调用useDispatch 使用redux
  const dispatch = useDispatch();
  // other hooks 获取组件dom示例
  const audioRef = useRef();

  //  初次渲染调用函数 发起网络请求，调用store中的action方法
  useEffect(() => {
    dispatch(getSongDetailAction(167876));
  }, [dispatch]);
  // 初次渲染进来设置的src 歌曲路径
  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
    audioRef.current
      .play()
      .then((res) => {
        setIsPlaying(true);
      })
      .catch((err) => {
        setIsPlaying(false);
      });
  }, [currentSong]);

  //   照片预处理
  const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
  //   歌手
  const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
  //   歌曲总时长时间戳
  const duration = currentSong.dt || 0;
  //  歌曲总时长格式时间
  const showDuration = formatDate(duration, "mm:ss");
  const showCurrentTime = formatDate(currentTime, "mm:ss");
  //   progress 进度条
  //   const progress = (currentTime / duration) * 100;

  // handle function 处理函数

  //   播放音乐的方法
  const playMusic = useCallback(() => {
    setIsPlaying(!isPlaying);
    isPlaying
      ? audioRef.current.pause()
      : audioRef.current.play().catch((err) => {
          setIsPlaying(false);
        });
  }, [isPlaying]);
  // 监听歌曲播放进度
  const timeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    if (!isChanging) {
      setCurrentTime(currentTime * 1000);
      setProgress(((currentTime * 1000) / duration) * 100);
    }
    // 获取当前的歌词
    let i = 0;
    for (; i < lyricList.length; i++) {
      let lyricItem = lyricList[i];
      if (currentTime * 1000 < lyricItem.time) {
        break;
      }
    }
    if (currentLyricIndex !== i - 1) {
      // 避免操作频繁，只有当当前的currentLyricIndex和i - 1不同的时候才会发生改变
      dispatch(changeCurrentLyricIndexAction(i - 1));
      const content = lyricList[i - 1] && lyricList[i - 1].content;
      // antd中的属性
      message.open({
        key: "lyric",
        content: content,
        duration: 0,
        className: "lyric-class",
      });
    }
  };
  const changeSequence = () => {
    let currentSequence = sequence + 1;
    if (currentSequence > 2) {
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence));
  };
  // 上一首，下一首的歌曲切换
  const changeMusic = (tag) => {
    dispatch(changeCurrentIndexAndSongAction(tag));
  };

  const handleMusicEnded = () => {
    if (sequence === 2) {
      // 单曲循环
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(changeCurrentIndexAndSongAction(1));
    }
  };

  //  进度条改变调用函数
  const sliderChange = useCallback(
    (value) => {
      setIsChanging(true);
      const currentTime = (value / 100) * duration;
      setCurrentTime(currentTime);
      setProgress(value);
    },
    [duration]
  );
  //  进度条改变之后调用函数
  const sliderAfterChange = useCallback(
    (value) => {
      const currentTime = ((value / 100) * duration) / 1000;
      audioRef.current.currentTime = currentTime;
      setCurrentTime(currentTime * 1000);
      setIsChanging(false);
      if (!isPlaying) {
        playMusic();
      }
    },
    // 依赖发生改变调用函数
    [duration, isPlaying, playMusic]
  );

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button
            className="sprite_player prev"
            onClick={(e) => changeMusic(-1)}
          ></button>
          <button
            className="sprite_player play"
            onClick={(e) => playMusic()}
          ></button>
          <button
            className="sprite_player next"
            onClick={(e) => changeMusic(1)}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <a href="#/" className="singer-name">
                {singerName}
              </a>
            </div>
            <div className="progress">
              {/* value监听  进度条 */}
              <Slider
                defaultValue={30}
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button
              className="sprite_player btn loop"
              onClick={(e) => changeSequence()}
            ></button>
            <button className="sprite_player btn playlist"></button>
          </div>
        </Operator>
      </div>
      {/* onTimeUpdate监听歌曲播放进度 */}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => timeUpdate(e)}
        onEnded={(e) => handleMusicEnded()}
      />
    </PlaybarWrapper>
  );
});
