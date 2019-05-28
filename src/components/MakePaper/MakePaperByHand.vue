<template>
  <div>
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>自动组卷 </BreadcrumbItem>
      <BreadcrumbItem>选择组卷模版</BreadcrumbItem>
    </Breadcrumb>

    <Card class="card">
      <div class="form-wrapper" style="height: 100% ">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
          <FormItem label="试卷名称" prop="name">
            <Row>
              <Col span="10">
                <Input v-model="formValidate.name" placeholder="请输入试卷名"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="年级" prop="grade">
            <Row>
              <Col span="10">
                <Select v-model="formValidate.grade" placeholder="请选择科目">
                  <Option value="1">一年级</Option>
                  <Option value="2">二年级</Option>
                  <Option value="3">三年级</Option>
                  <Option value="4">四年级</Option>
                  <Option value="5">五年级</Option>
                  <Option value="6">六年级</Option>
                  <Option value="7">初一</Option>
                  <Option value="8">初二</Option>
                  <Option value="9">初三</Option>
                  <Option value="10">高一</Option>
                  <Option value="11">高二</Option>
                  <Option value="12">高三</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="科目" prop="subject">
            <Row>
              <Col span="10">
                <Select v-model="formValidate.subject" placeholder="请选择科目">
                  <Option value="chinese">语文</Option>
                  <Option value="math">数学</Option>
                  <Option value="english">英语</Option>
                  <Option value="physical">物理</Option>
                  <Option value="chemistry">化学</Option>
                  <Option value="biology">生物</Option>
                  <Option value="politics">政治</Option>
                  <Option value="geography">地理</Option>
                  <Option value="history">历史</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="选择题数" prop="singlechoose">
            <Row>
              <Col span="5">
                <InputNumber disabled :max="20" :min="0" :step="1" v-model="formValidate.singlechoose.num"></InputNumber>
              </Col>
              <Col span="5">
                <span>单个分值&nbsp&nbsp&nbsp</span>
                <InputNumber :max="20" :min="0" :step="1" v-model="formValidate.singlechoose.score"></InputNumber>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="多选题数" prop="multiplechoose">
            <Row>
              <Col span="5">
                <InputNumber disabled :max="10" :min="0" :step="1" v-model="formValidate.multiplechoose.num"></InputNumber>
              </Col>
              <Col span="5">
                <span>单个分值&nbsp&nbsp&nbsp</span>
                <InputNumber
                  :max="10"
                  :min="0"
                  :step="1"
                  v-model="formValidate.multiplechoose.score"
                ></InputNumber>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="判断题数" prop="judge">
            <Row>
              <Col span="5">
                <InputNumber disabled :max="20" :min="0" :step="1" v-model="formValidate.judge.num"></InputNumber>
              </Col>
              <Col span="5">
                <span>单个分值&nbsp&nbsp&nbsp</span>
                <InputNumber :max="20" :min="0" :step="1" v-model="formValidate.judge.score"></InputNumber>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="填空题数" prop="blank">
            <Row>
              <Col span="5">
                <InputNumber  disabled :max="20" :min="0" :step="1" v-model="formValidate.blank.num"></InputNumber>
              </Col>
              <Col span="5">
                <span>单个分值&nbsp&nbsp&nbsp</span>
                <InputNumber :max="20" :min="0" :step="1" v-model="formValidate.blank.score"></InputNumber>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="简答题数" prop="discuss">
            <Row>
              <Col span="5">
                <InputNumber disabled :max="20" :min="0" :step="1" v-model="formValidate.discuss.num"></InputNumber>
              </Col>
              <Col span="5">
                <span>单个分值&nbsp&nbsp&nbsp</span>
                <InputNumber :max="20" :min="0" :step="1" v-model="formValidate.discuss.score"></InputNumber>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="总分" prop="score">
            <Row>
              <Col span="10">
                <Input v-model="score" type="number" disabled placeholder="请输入总分"></Input>
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">手动选题</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </div>
    </Card>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formValidate: {
        name: '',
        subject: '',
        grade: '',
        score: '',
        singlechoose: {
          num: 0, score: 0
        },
        multiplechoose: {
          num: 0, score: 0
        },
        judge: {
          num: 0, score: 0
        },
        blank: {
          num: 0, score: 0
        },
        discuss: {
          num: 0, score: 0
        },
      },
      ruleValidate:
      {
        name: [
          { required: true, message: '试卷名不能为空', trigger: 'blur' },
        ],
        grade: [
          { required: true, message: '年级不能为空', trigger: 'blur' },
        ],
        subject: [
          { required: true, message: '科目不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    handleSubmit (name) {
      //  console.log(this.formValidate.type);
      //  console.log(name);
      //  console.log( this.$refs[name]);
      this.$refs[name].validate((valid) => {
        // console.log(valid);
        if (valid) {
          // console.log(this.formValidate.type);
          const that = this
          // console.log(postdata);
          let postdata = this.formValidate
          postdata["score"] = this.score
          // console.log(postdata);
          sessionStorage.setItem('singlechoose_score',that.formValidate.singlechoose.score)
          sessionStorage.setItem('multiplechoose_score',that.formValidate.multiplechoose.score)
          sessionStorage.setItem('judge_score',that.formValidate.judge.score)
          sessionStorage.setItem('blank_score',that.formValidate.blank.score)
          sessionStorage.setItem('discuss_score',that.formValidate.discuss.score)
          sessionStorage.setItem('grade',that.formValidate.grade)
          sessionStorage.setItem('subject',that.formValidate.subject)
          
          sessionStorage.setItem('paper_name',that.formValidate.name)

          sessionStorage.removeItem('singlechoose')
          sessionStorage.removeItem('multiplechoose')
          sessionStorage.removeItem('judge')
          sessionStorage.removeItem('blank')
          sessionStorage.removeItem('discuss')


          this.$router.push("/Manager/addQuestion")
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    handleAdd () {
      this.index++;
      this.formValidate.items.push({
        value: '',
        index: this.index,
        status: 1,
        deleteStatus: 1
      })    },

  },
  computed: {
    score () {
      let ret = this.formValidate.singlechoose.num * this.formValidate.singlechoose.score
      ret += this.formValidate.multiplechoose.num * this.formValidate.multiplechoose.score
      ret += this.formValidate.blank.num * this.formValidate.blank.score
      ret += this.formValidate.judge.num * this.formValidate.judge.score
      ret += this.formValidate.discuss.num * this.formValidate.discuss.score
      // console.log(ret);
      return ret
    }
  },
}
</script>
<style>
.card {
  margin-left: 15%;
  width: 70%;
}
.form-wrapper {
  padding-left: 10%;
}
</style>  