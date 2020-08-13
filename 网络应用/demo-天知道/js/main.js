/*
   请求地址:http://wthrcdn.etouch.cn/weather_mini
*/
var app = new Vue({
    el: "#app",
    data: {
        city: '',
        weatherList:[]
    },
    methods: {
        searchWeather: function () {
            // console.log("天气查询");
            // console.log(this.city);
            //调用接口
            var that=this;
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+this.city).then(function (res) {
                    // console.log(res.data.data.forecast);
                    that.weatherList = res.data.data.forecast;
                },function(err){
                    console.log(err);
                })
        },
        changeCity:function(city){
            this.city=city;
            this.searchWeather();
        }
    }
})