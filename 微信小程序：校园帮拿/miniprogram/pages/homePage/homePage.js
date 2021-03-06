const db = wx.cloud.database()
const app = getApp()
import Dialog from '/@vant/weapp/dialog/dialog'
import Toast from '/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    published_data: [],
    // 分享数据
    showShare: false,
    options: [
      [
        { name: '微信好友', icon: 'wechat', openType: 'share' },
        { name: '复制链接', icon: 'link' },
        { name: '二维码', icon: 'qrcode' },
      ]
    ],// 分享数据终

    option1: [
      { text: '全部', value: "all" },
      { text: '今天', value: "today" },
      { text: '指定日期', value: "select" },
    ],
    option2: [
      { text: '价格降序', value: 'a' },
      { text: '价格升序', value: 'b' },
    ],
    value1: "all",
    value2: 'a',

    show: false,
    category_active: 'published',
  },
  getData: function () {
    db.collection("published_list").where({
      task_status: 0
    })
      .get().then((res) => {
        this.setData({
          published_data: res.data
        })
      })
  },
  showShareAction: function () {
    this.setData({
      showShare: true
    })
  },
  closeShareAction: function () {
    this.setData({
      showShare: false
    })
  },
  accept: function (e) {
    let _this = this
    let task_id = e.currentTarget.dataset['task_id'];
    let task_publisher = e.currentTarget.dataset['task_publisher'];
    if (app.globalData.loginStatus == true) {
      console.log(app.globalData.userInfo.userid)
      console.log(task_publishe)
      if(app.globalData.userInfo.userid != task_publisher) {
        Dialog.confirm({
          title: '接受任务',
          message: '确认接受任务？',
        })
          .then(() => {
            db.collection("published_list").doc(task_id)
              .get().then((res) => {
                console.log(res)
                if (res.data.task_status == 0) {
                  console.log("成功接受")
                  db.collection('published_list').doc(task_id).update({
                    // data 传入需要局部更新的数据
                    data: {
                      task_status: 1,
                      task_accepter: app.globalData.userid
                    },
                    success: function (res) {
                      _this.getData()
                    }
                  })
                }
              })
          })
          .catch(() => {
            // on cancel
            console.log("取消")
          })
      }
      else {
        Dialog({
          title: '不可接受此任务',
          message: '接自己发布的任务，谁去帮你完成呢？',
        })
      }
    }
    else{
      Dialog({
        title: '请先登录',
        message: '登录之后才可以接受任务',
      })
    }
  },
  detail: function (e) {
    wx.navigateTo({
      url: './task_detail/task_detail?task_id=' + e.currentTarget.dataset['task_id'],
    })
  },
  new_publish: function () {
    if(app.globalData.loginStatus == true) {
      wx.navigateTo({
        url: '/pages/homePage/new_publish/new_publish',
      })
    }
    else {
      Dialog({
        title: '请先登录',
        message: '登录之后才可以发布任务',
      })
    }
  },
  to_task_detail: function () {
    wx.navigateTo({
      url: '/pages/task_detail/task_detail',
    })
  },
  select_date: function (value) {
    if (value.currentTarget.dataset.detail == 'select' || value.detail == 'select') {
      this.setData({
        show: true
      })
    }
  },
  onClose_select_date: function () {
    this.setData({
      show: false
    })
  },
  onConfirm_select_date: function () {
    this.setData({
      show: false
    })
  },
  selector: function (e) {
    console.log(e.detail.name)
    if (e.detail.name === 0) {
      wx.navigateTo({
        url: '/pages/homePage/indexBar/indexbar',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.addData()
    this.setData({
      published_data: []
    })
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      console.log("下拉刷新")
      this.getData()
      wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})