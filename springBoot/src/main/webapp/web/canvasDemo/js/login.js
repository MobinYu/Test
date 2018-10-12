var app = new Vue({
  el: "#app",
  mixins: [pageMix],
  data: {
    baseInfo: {
      userName: "",
      passwd: ""
    }
  },
  mounted: function () {},
  created: function () {},
  methods: {
    submit() {
      var vm = this;
      this.ajax({
        serviceType: "crossDomainCall",
        type: "POST",
        url: 'http://192.168.252.119:8084/shencai-auth-web/service/auth/auth/login', //新框架服务        
        // url: "http://192.168.252.119:8081/shencai-cm-web/service/sys/user/user/login", //老框架服务
        data: {
          loginName: vm.baseInfo.userName,
          password: fw.ed.RsaUtils.encrypt(vm.baseInfo.passwd)
        },
        success: function (resultData) {
          console.log(resultData);
          if (vm.ResultStatusEnum.SUCCESS == resultData.status) {
            window.location = "../../entrySelect.html?ticket=" + resultData.data;
          } else {
            if (!fw.core.util.ObjectUtils.hasValue(resultData.info)) {
              vm.$Message.error("登录异常");
            } else {
              vm.$Message.error(resultData.info);
            }
          }
        },
        error: function () {
          vm.$Message.error("登录异常");
        }
      });
    }
  }
});