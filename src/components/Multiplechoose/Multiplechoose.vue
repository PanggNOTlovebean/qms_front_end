 <!-- eslint-disable  -->
<template>
 <div>
   <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>导入试题</BreadcrumbItem>
      <BreadcrumbItem to="/Entryer/Newquestion">选择试题模版</BreadcrumbItem>
      <BreadcrumbItem>多选题</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div class="editor-wrapper">
        <Row>
          <Col class="ch">
            试题题干：
          </col>
        </Row>
        <br>
        <Row>
          <Col span="13" offset="2">

          <editor-bar class="editor" v-model="editor.stem" :isClear="isClear" @change="change"></editor-bar>
          </col>
        </Row>
      </div>
      <br>

      <div class="editor-wrapper">
        <Row>
          <Col class="ch">
            可选项：
          </col>
        </Row>
        <br>  
        <Row v-for="(item,index) in items" v-bind:key="item" style="margin-top:20px">
          <Col span="2" class="ch" >
           ({{item}}):
          </Col>
          <Col span="13">
            <editor-bar class="choice" v-model="editor.choice[index]" :isClear="isClear" @change="change"></editor-bar>
          </Col>
          <br>

        </Row>
        <Row>
          <br>
           <Col offset="13" span="3">
             <Button class="add_btn" type="dashed" @click="addChoice" >添加新选项</Button>
           </Col>
        </Row>
        
      </div>

      <div class="editor-wrapper">
        <Row>
          <Col class="ch">
            正确答案：
          </Col>
        </Row>
          <Row>
            <Col offset="2">

            <CheckboxGroup  v-model="rightChoose" @on-change="checkChange" size="large">
              <Checkbox  v-for="item in items" v-bind:key="item"  :label="item">
                  <span>{{item}}</span>
              </Checkbox >
            </CheckboxGroup >
            </Col>
        </Row>
       
      </div>
      <br>

      <div class="editor-wrapper">
        <Row>
          <Col class="ch">
            题目解析:
          </col>
        </Row>
        <br>
        <Row>
          <Col span="13" offset="2">

          <editor-bar class="editor" v-model="editor.analysis" :isClear="isClear" @change="change"></editor-bar>
          </col>
        </Row>
      </div>
      <br>
       <div class="editor-wrapper">
       <Row>
          <br>
           <Col offset="13" span="3">
             <Button class="add_btn" type="primary" @click="addQuestion" >上传新试题</Button>
           </Col>
        </Row>
        </div>
    </Card>
 </div>
</template>

<script type="text/ecmascript-6">

import EditorBar from '@/components/EditorBar/EditorBar.vue'
export default {
  data () {
    return {
      editor: {
        stem: '',
        choice:['','','','','','','','','','','','','','','','',''],
        analysis:'',
      },
      rightChoose:[],
      items:['A','B','C','D'],
      isClear: false
    }
  },

  methods: {
    addQuestion(){
      //提交后台
      console.log(this.editor)
      console.log(this.rightChoose)
    },
    change (val) {
      console.log(val)
    },
    addChoice(){
      const len=this.items.length
      if(len>10){
        return 
      }
      this.items.push(String.fromCharCode(this.items[len-1].charCodeAt()+1))
    },
    checkChange(data){
      console.log(data);
    }
  },
  components: {
    EditorBar
  }
}
</script>

<style>
.ch{
  font-size: 20px 
}
.editor-wrapper{
  padding-left: 15%
}
.editor{
  width: 100%;
  height: 20%;
}
.choice .text{
  height: 100px !important;
}
.add_btn{
  /* margin: 0px !important; */
  /* padding:0px !important; */
}
</style>
