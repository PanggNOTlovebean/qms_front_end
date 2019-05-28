 <!-- eslint-disable  -->
<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <div class="icon-wrapper">
          <Icon type="ios-contact-outline" size="50" color="#2d8cf0"/>
          <div class="zhongwen" v-show="!isCollapsed">管理员，您好！</div>
          <div class="zhongwen" v-show="isCollapsed">
            <p>&nbsp</p>
          </div>
        </div>
        <Menu
          :active-name="activeMenu"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
          @on-select="menuSelect"
        >
          <MenuItem name="1">
            <Icon type="ios-hammer-outline"/>
            <span>试题管理</span>
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-hammer-outline"/>
            <span>试卷管理</span>
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-hammer-outline"/>
            <span>学校管理</span>
          </MenuItem>

          <MenuItem name="4">
            <Icon type="ios-git-network"/>
            <span>手动组卷</span>
          </MenuItem>
          <MenuItem name="5">
            <Icon type="ios-git-network"/>
            <span>自动组卷</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <!-- <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header> -->
        <Content :style="{padding: '0 16px 16px'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
// import Newquestion from  '../components/Newquestion/Newquestion.vue'
export default {
  data () {
    return {
      isCollapsed: false,

    };
  },
  created () {
    console.log(this.$route.path);
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    activeMenu () {
      return 0
      //   if(this.$route.path=="/Manager/QuetionManager"){
      //     console.log(111);
      //     return "1";
      //   }
      //   else if(this.$route.path=="/Manager/SchoolManager"){
      //     console.log(222);
      //      return "2";
      //   }
      //   else
      //     return "0";
      // }
    }
  },
  methods: {
    menuSelect (name) {
      // this.isCollapsed = true
      //菜单切换
      // console.log(name);
      // console.log(name);
      switch (name) {
        case "1":
          this.$router.push('/Manager/QuestionManager')
          break
        case "2":
          this.$router.push('/Manager/PaperManager')
          break
        case "3":
          this.$router.push('/Manager/SchoolManager')
          break
        case "5":
          this.$router.push('/Manager/MakePaperAuto')

      }

    }
  },
  components: {
    // Newquestion
  }
}
</script>

<style scoped>
.icon-wrapper {
  text-align: center;
}
.zhongwen {
  color: wheat;
  margin-bottom: 20px;
}
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 80px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>