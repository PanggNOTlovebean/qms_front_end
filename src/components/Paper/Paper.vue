<template>
  <div class="p-wrapper">
    <div class="b-wrapper">
      <Button type="dashed" @click="change">{{bt_status}}</Button>
      <Button type="dashed" class="btn btn-primary" v-on:click="getPdf()">导出PDF</Button>
    </div>

    <Card>
      <div id="pdfDom">
        <div class="paper-name">{{name}}</div>
        <div v-show="!status">
          <div class="question-header" v-show="singlechoose.length">选择题(每题{{singlechoose_score}}分)</div>
          <div class="question-wrapper" v-for="(item,index) in singlechoose">
            <p>第{{index+1}}题：</p>
            <div class="desc" v-html="item.stem"></div>
            <br>
          </div>
          <br>
          <br>
          <div class="question-header" v-show="multiplechoose.length">多选题(每题{{multiplechoose_score}}分)</div>
          <div class="question-wrapper" v-for="(item,index) in multiplechoose">
            <p>第{{index+1}}题：</p>
            <div class="desc" v-html="item.stem"></div>
            <br>
          </div>
          <br>
          <br>
          <div class="question-header" v-show="judge.length">判断题(每题{{judge_score}}分)</div>
          <div class="question-wrapper" v-for="(item,index) in judge">
            <p>第{{index+1}}题：</p>
            <div class="desc" v-html="item.stem"></div>
            <br>
          </div>
          <br>
          <br>
          <div class="question-header"  v-show="blank.length">填空题(每题{{blank_score}}分)</div>
          <div class="question-wrapper" v-for="(item,index) in blank">
            <p>第{{index+1}}题：</p>
            <div class="desc" v-html="item.stem"></div>
            <br>
          </div>
          <br>
          <br>
          <div class="question-header" v-show="discuss.length">简答题(每题{{discuss_score}}分)</div>
          <div class="question-wrapper" v-for="(item,index) in discuss">
            <p>第{{index+1}}题：</p>
            <div class="desc" v-html="item.stem"></div>
            <br>
          </div>
        </div>
        <div v-show="status">
          <div class="question-header" v-show="singlechoose.length">选择题答案(每题{{singlechoose_score}}分)</div>
          <div class="question-wrapper" v-for="(item,index) in singlechoose">
            <p>第{{index+1}}题：</p>
            <div class="desc" v-html="item.answer"></div>解析：
            <div class="desc" v-html="item.analysis"></div>
            <br>
          </div>

          <div class="question-header" v-show="multiplechoose.length">多选题答案(每题{{multiplechoose_score}}分)</div>
          <div class="question-wrapper" v-for="(item,index) in multiplechoose">
            <p>第{{index+1}}题：</p>
            <div class="desc" v-html="item.answer"></div>解析：
            <div class="desc" v-html="item.analysis"></div>
            <br>
          </div>

          <div class="question-header" v-show="judge.length">判断题答案(每题{{judge_score}}分)</div>
          <div class="question-wrapper" v-for="(item,index) in judge">
            <p>第{{index+1}}题：</p>
            <div class="desc" v-html="item.answer"></div>解析：
            <div class="desc" v-html="item.analysis"></div>
            <br>
          </div>

          <div class="question-header" v-show="blank.length">填空题答案(每题{{blank_score}}分)</div>
          <div class="question-wrapper" v-for="(item,index) in blank">
            <p>第{{index+1}}题：</p>
            <div class="desc" v-html="item.answer"></div>解析：
            <div class="desc" v-html="item.analysis"></div>
            <br>
          </div>

          <div class="question-header" v-show="discuss.length">简答题答案(每题{{discuss_score}}分)</div>
          <div class="question-wrapper" v-for="(item,index) in discuss">
            <p>第{{index+1}}题：</p>
            <div class="desc" v-html="item.answer"></div><p>解析：</p>
            <div class="desc" v-html="item.analysis"></div>
            <br>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      singlechoose: [],
      multiplechoose: [],
      judge: [],
      blank: [],
      discuss: [],
      name: '',
      bt_status: '显示答案',
      status: false,
      singlechoose_score: 0,
      multiplechoose_score: 0,
      judge_score: 0,
      blank_score: 0,
      discuss_score: 0,

    }
  },

  created () {
    let singlechoose = sessionStorage.getItem('singlechoose')
    let multiplechoose = sessionStorage.getItem('multiplechoose')
    let judge = sessionStorage.getItem('judge')
    let blank = sessionStorage.getItem('blank')
    let discuss = sessionStorage.getItem('discuss')
    if (typeof singlechoose == "string")
      singlechoose = singlechoose.split(',')
    if (typeof multiplechoose == "string")
      multiplechoose = multiplechoose.split(',')
    if (typeof judge == "string")
      judge = judge.split(',')
    if (typeof blank == "string")
      blank = blank.split(',')
    if (typeof discuss == "string")
      discuss = discuss.split(',')
    console.log(singlechoose);
    console.log(multiplechoose);
    console.log(judge);
    console.log(blank);
    console.log(discuss);
    this.singlechoose_score = sessionStorage.getItem('singlechoose_score')
    this.multiplechoose_score = sessionStorage.getItem('multiplechoose_score')
    this.judge_score = sessionStorage.getItem('judge_score')
    this.blank_score = sessionStorage.getItem('blank_score')
    this.discuss_score = sessionStorage.getItem('discuss_score')
    this.name = sessionStorage.getItem('paper_name')
    this.htmlTitle = sessionStorage.getItem('paper_name')


    let that = this
    for (var i in singlechoose) {
      let arg = { 'question_detail_id': singlechoose[i] }
      this.axios.post("/getOneQuestion", arg).then(function (response) {
        that.singlechoose.push(response.data)
      }).catch(function (error) {
        // handle error
        // console.log(error)
      }).finally(function () {
        // always executed
      });
    }

    for (var i in multiplechoose) {
      let arg = { 'question_detail_id': multiplechoose[i] }
      this.axios.post("/getOneQuestion", arg).then(function (response) {
        that.multiplechoose.push(response.data)
      }).catch(function (error) {
        // handle error
        // console.log(error)
      }).finally(function () {
        // always executed
      });
    }
    for (var i in judge) {
      let arg = { 'question_detail_id': judge[i] }
      this.axios.post("/getOneQuestion", arg).then(function (response) {
        that.judge.push(response.data)
      }).catch(function (error) {
        // handle error
        // console.log(error)
      }).finally(function () {
        // always executed
      });
    }
    for (var i in blank) {
      let arg = { 'question_detail_id': blank[i] }
      this.axios.post("/getOneQuestion", arg).then(function (response) {
        that.blank.push(response.data)
      }).catch(function (error) {
        // handle error
        // console.log(error)
      }).finally(function () {
        // always executed
      });
    }
    for (var i in discuss) {
      let arg = { 'question_detail_id': discuss[i] }
      this.axios.post("/getOneQuestion", arg).then(function (response) {
        that.discuss.push(response.data)
      }).catch(function (error) {
        // handle error
        // console.log(error)
      }).finally(function () {
        // always executed
      });
    }
  },
  components: {
  },
  methods: {
    change () {
      if (this.bt_status == '显示答案') {
        this.status = true
        this.bt_status = "显示题目"
      }
      else {
        this.status = false
        this.bt_status = "显示答案"
      }
      return
    }
  },
  computed: {
    htmlTitle () {
      if (this.status) {
        return this.name + "(答案)"
      }
      else
        return this.name + "(试题)"
    }
  },
}
</script>

<style>
.p-wrapper .paper-name {
  text-align: center;
  font-size: 50px;
}
.p-wrapper .question-header {
  font-size: 20px;
}
.p-wrapper {
  margin-left: 20%;
  width: 60%;
  margin-top: 30px;
}
.p-wrapper .desc {
  margin-left: 5%;
}
.b-wrapper {
  text-align: right;
}
</style>
