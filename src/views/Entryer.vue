 <!-- eslint-disable  -->
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <div class="icon-wrapper">
                  <Icon type="ios-contact-outline" size="50" color="#2d8cf0"/>
                  <div class="zhongwen" v-show="!isCollapsed">
                    录入员，您好！
                  </div>
                  <div class="zhongwen" v-show="isCollapsed"> 
                    <p>&nbsp</p>
                  </div>
                </div>
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses" @on-select="menuSelect">
                    <MenuItem name="1" >
                        <Icon type="md-add-circle" />
                        <span>导入试题</span>
                    </MenuItem>
                    <MenuItem name="2" >
                       <Icon type="md-add-circle" />
                        <span>导入试卷</span>
                    </MenuItem>
                    <MenuItem name="3" >
                      <Icon type="md-exit" />
                       <span>注销</span>
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
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
          menuSelect(name){
            this.isCollapsed=true
            //菜单切换
            // console.log(name);
            switch(name){
              case "1":
                this.$router.push('/Entryer/newQuestion')
            }
            
          }
        },
        components:{
          // Newquestion
        }
    }
</script>

<style scoped>
    .icon-wrapper{
      text-align: center
    }
    .zhongwen{
      color:wheat;
      margin-bottom: 20px;  
    }
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>