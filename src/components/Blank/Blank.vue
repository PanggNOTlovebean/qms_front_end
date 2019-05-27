 <!-- eslint-disable  -->
<template>
 <div>
   <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>导入试题</BreadcrumbItem>
      <BreadcrumbItem to="/Entryer/Newquestion">选择试题模版</BreadcrumbItem>
      <BreadcrumbItem>填空题</BreadcrumbItem>
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

          <editor-bar class="editor" v-model="editor.stem" :isClear="isClear"></editor-bar>
          </col>
        </Row>
      </div>
      <br>

      <div class="editor-wrapper">
        <Row>
          <Col class="ch">
            填空答案：
          </col>
        </Row>
        <br>  
        <Row v-for="(item,index) in items" v-bind:key="item" style="margin-top:20px">
          <Col span="2" class="ch" >
           ({{item}}):
          </Col>
          <Col span="13">
            <editor-bar class="choice" v-model="editor.choice[index]" :isClear="isClear"></editor-bar>
          </Col>
          <br>

        </Row>
        <Row>
          <br>
           <Col offset="13" span="3">
             <Button class="add_btn" v-show="addAble" type="dashed" @click="addChoice" >增加填空</Button>
           </Col>
        </Row>
        
      </div>

      <br>

      <div class="editor-wrapper">
        <Row>
          <Col class="ch">
            题目解析
          </col>
        </Row>
        <br>
        <Row>
          <Col span="13" offset="2">

          <editor-bar class="editor" v-model="editor.analysis" :isClear="isClear"></editor-bar>
          </col>
        </Row>
      </div>
      <br>
       <div class="editor-wrapper">
       <Row>
          <br>
           <Col offset="13" span="3">
             <Button class="add_btn"  type="primary" @click="addQuestion" >上传新试题</Button>
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
      items:['1'],
      isClear: false,
      addAble:true,
    }
  },
  methods: {
    addQuestion () {
      var index
      var stem = this.editor.stem
      var i=0
      var answer=""
      for (i in this.items)
        answer += "<p>("+this.items[i]+"):</p>"+this.editor.choice[i]
      var analysis = this.editor.analysis
      var postdata = {
        "info_id": this.$route.params.id,
        "stem": stem,
        "answer": answer,
        "analysis": analysis
      }
      // console.log(postdata)
      const that = this
      if(this.checkValid()==false){
        that.$Message.warning('请完善信息');
      }
      else{
         this.axios.post("/addQuestionDetail", postdata).then(function (response) {
        that.$Message.success('插入成功');
        that.$router.push({ name: "Newquestion" })
      }).catch(function (error) {
        // handle error
        // console.log(error)
        that.$Message.error('error');
      }).finally(function () {
        // always executed
      });
      }
    },
    checkValid () {
      var index
      if (this.editor.stem == "")
        return false
      for (index in this.items) {
        if (this.editor.choice[index] == "")
          return false
      }
      return true
    },
    addChoice(){
      const len=this.items.length
     
      this.items.push(String.fromCharCode(this.items[len-1].charCodeAt()+1))
      if(len>7){
        this.addAble=false
        return 
      }
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

</style>
