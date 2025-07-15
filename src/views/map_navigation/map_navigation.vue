<!-- // 地图导航功能开始 -->
<template>
  <div class="map_navigation">
    <div id="map_navigation"></div>
    <div class="result">
      <div class="search">
        <el-input
          v-model="originkeyword"
          placeholder="请输入起点"
          @input="originSearch"
        />
        <el-input
          v-model="destinationkeyword"
          placeholder="请输入终点"
          @input="destinationSearch"
        />
        <el-select style="width: 60%;" v-model="navigationType" placeholder="选择导航方式" @change="handleNavigationChange">
          <el-option label="驾车导航" value="driving" />
          <el-option label="步行导航" value="walking" />
          <el-option label="骑行导航" value="riding" />
          <el-option label="公交导航" value="transfer" />
        </el-select>
        <el-select v-if="navigationType !== 'walking'" style="width: 60%;" v-model="currentPolicy" placeholder="选择导航策略" @change="handlePolicyChange">
          <el-option label="最快捷模式" :value="0" />
          <el-option label="最经济模式" :value="1" />
          <el-option label="最短距离" :value="2" />
          <el-option label="考虑实时路况" :value="4" />
        </el-select>
        <el-button type="primary" @click="planRoute">导航</el-button>
      </div>
      <div id="result"></div>
    </div>
    <div class="panel">
      <div id="panel"></div>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import mixin from "@/mixins/page.js";

export default {
  name: 'MapNavigation',
  mixins: [mixin],
  data() {
    return {
      location_map: null,
      placeSearch: null, // 地点搜索
      geolocation: null, // 定位
      geocoder: null, // 逆地理编码
      driving: null, // 驾车导航
      walking: null, // 步行导航
      riding: null, // 骑行导航
      transfer: null, // 公交导航
      navigationType: "driving", // 默认使用驾车导航
      currentPolicy: 0, // 默认使用最快捷模式
      originkeyword: "",  // 起点关键字
      destinationkeyword: "",  // 终点关键字
      locationType: "origin", // 定位类型
      origin: {
        lat: 22.556481,
        lng: 113.946782
      },
      destination: {
        lat: 22.556481,
        lng: 113.946782
      },
      destinationSearchTimer: null,
      originSearchTimer: null
    }
  },
  methods: {
    initLocationMap() {
      AMapLoader.load({
        key:"c6bd63c9737176f87e50162865d81db3",             
        version:"2.0",      
        plugins:[
          "AMap.PlaceSearch",//地点搜索
          "AMap.Geolocation",//定位到当前位置
          "AMap.Geocoder",//经纬度进行逆地理编码查询
          "AMap.Driving",//驾车导航
          "AMap.Transfer",//公交导航
          "AMap.Walking",//步行导航
          "AMap.Riding",//骑行导航
        ],       
      }).then((AMap) => {
        this.location_map = new AMap.Map("map_navigation", {  
          viewMode:"2D",
          zoom:12,
          animateEnable: false,
          center:[113.946782, 22.556481],
        });
        
        this.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,    // 使用高精度定位
          timeout: 5000,               // 减少超时时间
          buttonPosition: 'RB',        // 显示定位按钮，放在右下角
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: false,       // 禁用自动缩放
          showCircle: false,           // 不显示精度圈
          showMarker: true,            // 显示定位点
          showButton: true,            // 显示定位按钮
          convert: true                // 自动偏移坐标
        });
        
        this.location_map.addControl(this.geolocation);
        
        // 先检查浏览器是否支持定位
        if (!navigator.geolocation) {
          console.error('浏览器不支持定位功能');
          this.$message.error('您的浏览器不支持定位功能');
          return;
        }

        // 添加定位按钮事件监听
        this.geolocation.on('complete', (data) => {
          console.log('定位成功:', data);
          this.origin = {
            lat: data.position.lat,
            lng: data.position.lng
          }
        });

        this.geolocation.on('error', (err) => {
          console.error('定位失败:', err);
          this.$message.error('定位失败：' + err.message);
        });

        // 主动触发定位
        this.geolocation.getCurrentPosition();
        
        this.driving = new AMap.Driving({
          map: this.location_map,
          panel: "panel",
        });

        this.walking = new AMap.Walking({
          map: this.location_map,
          panel: "panel",
        });

        this.riding = new AMap.Riding({
          map: this.location_map,
          panel: "panel",
        });

        this.transfer = new AMap.Transfer({
          city: "0753",
          cityd: "0753",
          policy: AMap.TransferPolicy.LEAST_TIME,
          map: this.location_map,
          panel: "panel",
        });

        this.geocoder = new AMap.Geocoder();
      }).catch(e => {
        console.log(e);
      });
    },

    initPlaceSearch(key) {
      this.placeSearch?.clear();
      this.placeSearch = null;
      this.placeSearch = new AMap.PlaceSearch({
        pageSize: 9,
        pageIndex: 1,
        city: "0753",
        map: this.location_map,
        panel: "result"
      });
      
      this.placeSearch.search(key, (status, result) => {
        console.log(result,'yyyyyyyyy');
      });

      this.placeSearch.on('selectChanged', (e) => {
        if(this.locationType === 'origin') {
          this.originkeyword = e.selected.data.name;
          this.origin = {
            lat: e.selected.data.location.lat,
            lng: e.selected.data.location.lng
          }
        } else {
          this.destinationkeyword = e.selected.data.name;
          this.destination = {
            lat: e.selected.data.location.lat,
            lng: e.selected.data.location.lng
          }
        }
      });
    },

    destinationSearch() {
      this.locationType = 'destination';
      this.destinationSearchTimer && clearTimeout(this.destinationSearchTimer);
      this.destinationSearchTimer = setTimeout(() => {
        this.initPlaceSearch(this.destinationkeyword);
      }, 500);
    },

    originSearch() {
      this.locationType = 'origin';
      this.originSearchTimer && clearTimeout(this.originSearchTimer);
      this.originSearchTimer = setTimeout(() => {
        this.initPlaceSearch(this.originkeyword);
      }, 500);
    },

    handlePolicyChange(value) {
      if(!this.originkeyword || !this.destinationkeyword) return;
      this.clearAllRoutes();
      switch(this.navigationType) {
        case 'driving':
          this.driving.setPolicy(value);
          break;
        case 'walking':
          break;
        case 'riding':
          this.riding.setPolicy(value);
          break;
        case 'transfer':
          this.transfer.setPolicy(value);
          break;
      }
      this.planRoute();
    },

    handleNavigationChange(value) {
      if(!this.originkeyword || !this.destinationkeyword) return;
      this.clearAllRoutes();
      this.planRoute();
    },

    planRoute() {
      if(!this.originkeyword || !this.destinationkeyword) return;
      this.clearAllRoutes();
      const start = new AMap.LngLat(this.origin.lng, this.origin.lat);
      const end = new AMap.LngLat(this.destination.lng, this.destination.lat);

      switch(this.navigationType) {
        case 'driving':
          this.driving.search(start, end, (status, result) => {
            this.placeSearch.clear();
          });
          break;
        case 'walking':
          this.walking.search(start, end, (status, result) => {
            this.placeSearch.clear();
          });
          break;
        case 'riding':
          this.riding.search(start, end, (status, result) => {
            this.placeSearch.clear();
          });
          break;
        case 'transfer':
          this.transfer.search(start, end, (status, result) => {
            console.log(result,'transfer',status);
            this.placeSearch.clear();
          });
          break;
      }
    },

    clearAllRoutes() {
      this.driving?.clear();
      this.walking?.clear();
      this.riding?.clear();
      this.transfer?.clear();
    }
  },
  mounted() {
    // 高德地图的安全密钥 必须配置在全局变量中配合使用
    window._AMapSecurityConfig = {
      securityJsCode: "3d7072bf5ae2f2da1acfc01cc50b84d0",
    }
    this.initLocationMap();
  }
}
</script>

<style>
  .map_navigation {
    position: relative;
    width: 100%;
    height: calc(100vh - 150px);
    margin-top: 150px;
  }
  #map_navigation {
    width: 100%;
    height: 100%;
  }
  .result{
    position: absolute;
    top: 0;
    left: 0;
    max-height: calc(100% - 40px);
    z-index: 999;
    width: 40%;
  }
  .search {
    display: flex;
  }
  #result{
    height: 100%;
    max-width: 354px;
  }
  #panel{
    position: absolute;
    background-color: #fff;
    max-height: 80%;
    overflow-y: auto;
    top: 0px;
    right: 0px;
    width: 280px;
  }
  #panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
	display: none;
  }
  #panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
  }
  .amap-lib-transfer .plan dd h4 {
    font-size: 12px;
  }
  .amap-lib-transfer .plan dd a.icon-arrow {
    right: 0 !important;
  }
</style>
<!-- // 地图导航功能结束 -->