 <!-- eslint-disable  -->
<template>
 <div>
   <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>导入试题</BreadcrumbItem>
      <BreadcrumbItem to="/Entryer/Newquestion">选择试题模版</BreadcrumbItem>
      <BreadcrumbItem>判断题 </BreadcrumbItem>
    </Breadcrumb>
    <Card>
       <div class="info-wrapper">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70 ">
          <FormItem label="分值" prop="score">
            <Row>
              <Col span="10">
                <Input v-model="formValidate.score" type="number" placeholder="请输入分值"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="难度" prop="hardness">
            <Rate show-text v-model="formValidate.hardness">
              <span style="color: #f5a623">{{ valueCustomText }}</span>
            </Rate>
          </FormItem>
          <FormItem
            v-for="(item, index) in formValidate.items"
            v-show="item.status"
            :key="index"
            :label="'知识点' + item.index "
            :prop="'items.' + index + '.value'"
            :rules="{required: false, message: '知识点 ' + item.index +'不能为空', trigger: 'blur'}"
          >
            <Row>
              <Col span="10">
                <Input type="text" v-model="item.value" placeholder="请输入知识点"></Input>
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            <Row>
              <Col span="5" offset="2">
                <Button type="dashed" long @click="handleAdd" icon="md-add">添加知识点</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
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
            正确答案：
          </Col>
        </Row>
          <Row>
            <Col offset="2">

            <RadioGroup v-model="rightChoose" size="large">
              <Radio v-for="item in items" v-bind:key="item"  :label="item">
                  <span>{{item}}</span>
              </Radio>
            </RadioGroup>
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

          <editor-bar class="editor" v-model="editor.analysis" :isClear="isClear" ></editor-bar>
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
            index: 1,
      formValidate: {
        hardness: 0,
        score: 0,
        items: [
          {
            value: '',
            index: 1,
            status: 1,
          }
        ]
      },
      ruleValidate: {
        score: [
          { required: true, message: '分值不能为空' },
        ],
      },
      editor: {
        stem: '',
        analysis:'',
      },
      rightChoose:'',
      items:['对','错'],
      isClear: false
    }
  },
  methods: {
    intoNext () {
      var intoList = this.$store.getters.getAddList
      var typeList = ['singlechoose', 'multiplechoose', 'judge', 'blank', 'discuss']
      var i = 0
      for (i in typeList) {
        if(intoList[typeList[i]==undefined]){
          this.$Message.error("error")
        }
        if (intoList[typeList[i]].length != 0) {
          let paperId = intoList['paper_id']
          let queId = intoList[typeList[i]].shift()
          console.log(queId);
          this.$store.dispatch("updateList", intoList)
          this.editor={
            stem: '',
            analysis: '',
          }
          this.rightChoose= '',
          this.isClear=true
          this.$router.push("/Entryer/" + typeList[i] + "forpaper/" + queId)
          return
        }
      }
      this.$Message.success("试卷导入成功")
      this.$router.push("/Entryer/Newpaper")
    },
   addQuestion () {
      var index
      var stem = this.editor.stem
      var answer="<p>"+this.rightChoose+"</p>"
      var analysis = this.editor.analysis
      var postdata = {
        "info_id": this.$route.params.id,
        "stem": stem,
        "answer": answer,
        "analysis": analysis,
          "form":this.formValidate
      }
      const that = this
      if(this.checkValid()==false||this.formValidate.score == 0){
        that.$Message.warning('请完善信息');
      }
      else{
         this.axios.post("/addQuestionDetail", postdata).then(function (response) {
        that.$Message.success('插入成功');
        that.intoNext()
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
      if (this.editor.stem == ""||this.rightChoose=="")
        return false
      return true
    },
    addChoice(){
      const len=this.items.length
      if(len>10){
        return 
      }
      this.items.push(String.fromCharCode(this.items[len-1].charCodeAt()+1))
    }, addChoice () {
      const len = this.items.length
      if (len > 10) {
        return
      }
      this.items.push(String.fromCharCode(this.items[len - 1].charCodeAt() + 1))
    },
    handleAdd () {
      this.index++;
      this.formValidate.items.push({
        value: '',
        index: this.index,
        status: 1,
        deleteStatus: 1
      })
    },
  },
  computed: {
    valueCustomText () {
      switch (this.hardness) {
        case 0:
          return "";
        case 1:
          return "简单";
        case 2:
          return "容易";
        case 3:
          return "中等";
        case 4:
          return "较难";
        case 5:
          return "困难";
      }
      return ""
    }
  },
  components: {
    EditorBar
  }, computed: {
    valueCustomText () {
      switch (this.formValidate.hardness) {
        case 0:
          return "";
        case 1:
          return "简单";
        case 2:
          return "容易";
        case 3:
          return "中等";
        case 4:
          return "较难";
        case 5:
          return "困难";
      }
      return ""
    }
  },
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
.info-wrapper {
  padding-left: 15%;
}
</style>
