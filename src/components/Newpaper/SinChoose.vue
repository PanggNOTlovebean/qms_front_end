
<template>
<!-- eslint-disable  -->
  <div>
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>导入试卷</BreadcrumbItem>
      <BreadcrumbItem to="/Entryer/NewPaper">选择试卷模版</BreadcrumbItem>
      <BreadcrumbItem>单选题</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div class="editor-wrapper">
        <Row>
          <Col class="ch">试题题干：</Col>
        </Row>
        <br>
        <Row>
          <Col span="13" offset="2">
            <editor-bar class="editor" v-model="editor.stem" :isClear="isClear" ></editor-bar>
          </Col>
        </Row>
      </div>
      <br>

      <div class="editor-wrapper">
        <Row>
          <Col class="ch">可选项：</Col>
        </Row>
        <br>
        <Row v-for="(item,index) in items" v-bind:key="item" style="margin-top:20px">
          <Col span="2" class="ch">({{item}}):</Col>
          <Col span="13">
            <editor-bar
              class="choice"
              v-model="editor.choice[index]"
              :isClear="isClear"

            ></editor-bar>
          </Col>
          <br>
        </Row>
        <Row>
          <br>
          <Col offset="13" span="3">
            <Button class="add_btn" type="dashed" @click="addChoice">添加新选项</Button>
          </Col>
        </Row>
      </div>

      <div class="editor-wrapper">
        <Row>
          <Col class="ch">正确答案：</Col>
        </Row>
        <Row>
          <Col offset="2">
            <RadioGroup v-model="rightChoose" size="large">
              <Radio v-for="item in items" v-bind:key="item" :label="item">
                <span>{{item}}</span>
              </Radio>
            </RadioGroup>
          </Col>
        </Row>
        <!-- <Row>
          <Col class="ch">难度：</Col>
        </Row>
        <Row>
            <Col offset="2">
            <Rate show-text v-model="hardness">
              <span style="color: #f5a623">{{ valueCustomText }}</span>
            </Rate>
            </Col>  
        </Row> -->
      </div>
      <br>

      <div class="editor-wrapper">
        <Row>
          <Col class="ch">题目解析</Col>
        </Row>
        <br>
        <Row>
          <Col span="13" offset="2">
            <editor-bar
              class="editor"
              v-model="editor.analysis"
              :isClear="isClear"  
            ></editor-bar>
          </Col>
        </Row>
      </div>
      <br>
      <div class="editor-wrapper">
        <Row>
          <br>
          <Col offset="13" span="3">
            <Button class="add_btn" type="primary" @click="addQuestion">插入下一题</Button>
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
        choice: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        analysis: '',
      },
      hardness:0,
      rightChoose: '',
      items: ['A', 'B', 'C', 'D'],
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
            choice: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            analysis: '',
          }
          this.hardness=0;
          this.rightChoose= '',
          this.items=['A', 'B', 'C', 'D'],
          this.isClear=true
          this.$router.push("/Entryer/" + typeList[i] + "forpaper/" + queId)
          break;
        }
      }
    },
    addQuestion () {
      var index
      var stem = this.editor.stem
      for (index in this.items) {
        stem += "<p>(" + this.items[index] + ") :</p>" + this.editor.choice[index]
      }
      var answer = "<p>" + this.rightChoose + "</p>"
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
        that.intoNext()
      }).catch(function (error) {
        // handle error
        console.log(error)
        that.$Message.error("error");
      }).finally(function () {
        // always executed
      });
      }
     
    },
    checkValid () {
      var index
      if (this.editor.stem == "" || this.rightChoose == "")
        return false
      for (index in this.items) {
        if (this.editor.choice[index] == "")
          return false
      }
      return true
    },
    addChoice () {
      const len = this.items.length
      if (len > 10) {
        return
      }
      this.items.push(String.fromCharCode(this.items[len - 1].charCodeAt() + 1))
    }
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
  }
}
</script>

<style>
.ch {
  font-size: 20px;
}
.editor-wrapper {
  padding-left: 15%;
}
.editor {
  width: 100%;
  height: 20%;
}
.choice .text {
  height: 100px !important;
}
</style>
