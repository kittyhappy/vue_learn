/*
1.搜索
  接口地址: https://autumnfish.cn/search/suggest
  请求方法: get
  请求关键字:keywords
  响应内容:歌曲搜索结果

2.获取歌曲url接口
  接口地址: https://autumnfish.cn/song/url
  请求方法:get
  请求参数:id
  响应内容:歌曲url地址

3.获取歌曲详情
  接口地址: https://autumnfish.cn/song/detail
  请求方法: get
  请求参数: ids(歌曲id)
  响应内容: 歌曲详情
4.获取歌曲评论
  接口地址: https://autumnfish.cn/comment/hot?type=0
  请求方法: get
  请求参数: id(歌曲id，type固定为0)
  响应内容: 歌曲url地址
5.获取mv
  接口地址: https://autumnfish.cn/mv/url
  请求方法: get
  请求参数: id(mvid， 为0说明没有id)
  响应内容: mv的地址
*/
var app = new Vue({
  el: "#player",
  data: {
    //查询
    query: "",
    //歌曲数组
    musicList: [],
    //歌曲url
    musicUrl: "",
    //歌曲封面
    musicCover: "",
    //热门评论
    hotComments:[],
    //动画播放状态
    isPlaying:false,
    isShow:false,
    mvUrl:"",
  },
  methods: {
    //歌曲搜索
    searchMusic: function () {
      var that = this;
      axios.get("https://autumnfish.cn/search/suggest?keywords=" + this.query).then(function (res) {
        // console.log(res);
        that.musicList = res.data.result.songs;
       // console.log(res.data.result.songs);
      }, function (err) {
        console.log(err);
      })
    },
    //歌曲播放
    playMusic: function (musicid) {
      var that = this
      // console.log(musicid);
      axios.get("https://autumnfish.cn/song/url?id=" + musicid).then(function (res) {
        //console.log(res);
        // console.log(res.data.data[0].url);
        that.musicUrl = res.data.data[0].url;
      }, function (err) {
        console.log(err);
      })
      //歌曲详情
      axios.get("https://autumnfish.cn/song/detail?ids=" + musicid).then(function (res) {
        //console.log(res.data.songs[0].al.picUrl);
        that.musicCover = res.data.songs[0].al.picUrl;
      }, function (err) {
        console.log(err);
      })
      //歌曲评论获取
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicid).then(function (res) {
      //  console.log(res);
      that.hotComments=res.data.hotComments;
      }, function (err) {
        console.log(err);
      })
    },
    play:function(){
      this.isPlaying=true;
    },
    pause:function(){
      this.isPlaying=false;
    },
    //播放mv
    playMV:function(mvid){
      var that=this;
      axios.get("https://autumnfish.cn/mv/url?id="+mvid).then(function(res){
        // console.log(res.data.data.url);
        that.isShow=true;
        that.mvUrl = res.data.data.url;
      },function(err){
        console.log(err);
      })
    },
    //隐藏
    hide:function(){
      this.isShow=false;
      this.mvUrl="";
    }
  }
})