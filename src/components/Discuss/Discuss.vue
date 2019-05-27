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

          <editor-bar class="editor" v-model="editor.stem" :isClear="isClear" ></editor-bar>
          </col>
        </Row>
      </div>
      <br>

      <div class="editor-wrapper">
        <Row>
          <Col class="ch">
            参考答案:
          </col>
        </Row>
        <br>  
         <Row>
          <Col span="13" offset="2">

          <editor-bar class="editor" v-model="editor.answer" :isClear="isClear" ></editor-bar>
          </col>
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

          <editor-bar class="editor" v-model="editor.analysis" :isClear="isClear" ></editor-bar>
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
        answer:'',
        analysis:'',
      },
      rightChoose:'',
      items:['1'],
      isClear: false,
      addAble:true,
    }
  },
  methods: {
    addQuestion () {
      var postdata = {
        "info_id": this.$route.params.id,
        "stem": this.editor.stem,
        "answer": this.editor.answer,
        "analysis": this.editor.analysis
      }

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
      if (this.editor.stem == ""||this.editor.answer=="")
        return false
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
