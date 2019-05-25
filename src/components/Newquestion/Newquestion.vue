 <!-- eslint-disable  -->
<template>
  <div>
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem >导入试题</BreadcrumbItem>
      <BreadcrumbItem >选择试题模版</BreadcrumbItem>
    </Breadcrumb>

    <Card class="card">
      <div class="form-wrapper" style="height: 100% ">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70 ">
          <FormItem label="学校" prop="schoolName">
            <Row>
              <Col span="10">
                <Input v-model="formValidate.name" placeholder="请输入学校"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="科目" prop="subject">
            <Row>
              <Col span="10">
                <Select v-model="formValidate.subject" placeholder="请选择科目">
                  <Option value="language">语文</Option>
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
          <FormItem label="题型" prop="type">
            <Row>
              <Col span="10">
                <Select v-model="formValidate.type" placeholder="请选择题型">
                  <Option value="singlechoose">单选题</Option>
                  <Option value="multiplechoose">多选题</Option>
                  <Option value="blank">填空题</Option>
                  <Option value="junde">判断题</Option>
                  <Option value="answer">简答题</Option>
                  <Option value="Comprehension">综合题</Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="难度" prop="hardness">
            <Rate show-text v-model="formValidate.hardness">
              <span style="color: #f5a623">{{ valueCustomText }}</span>
            </Rate>
          </FormItem>

          <FormItem label="来源卷" prop="paper">
            <Row>
              <Col span="10">
                <Input v-model="formValidate.paper" placeholder="请输入试卷名"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="分值" prop="score">
            <Row>
              <Col span="10">
                <Input v-model="formValidate.score" placeholder="请输入分值"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="题号" prop="position">
            <Row>
              <Col span="10">
                <Input v-model="formValidate.position" placeholder="请输入题号"></Input>
              </Col>
            </Row>
          </FormItem>

          <FormItem
            v-for="(item, index) in formValidate.items"
            v-if="item.status"
            :key="index"
            :label="'知识点' + item.index "
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: '知识点 ' + item.index +'不能为空', trigger: 'blur'}"
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

          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">生成试题模版</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      index: 1,
      width: 100,
      formValidate: {
        schoolName: '',
        subject: '',
        type: '',
        gender: '',
        hardness: 0,
        paper: '',
        score: '',
        position: '',
        items: [
          {
            value: '',
            index: 1,
            status: 1,
          }
        ]
      },
      ruleValidate: {
        subject: [
          { required: true, message: '科目不能为空', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '题型不能为空', trigger: 'change' }
        ],
        score: [
          { required: true, message: '分值不能为空', trigger: 'change' },
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
        console.log(valid);
        if (valid) {
          console.log(this.formValidate.type);
          switch(this.formValidate.type){
            
            case "singlechoose":
              this.$router.push("/Entryer/Singlechoose")
          }
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
.card {
  margin-left: 20%;
  width: 60%;
}
.form-wrapper {
  padding-left: 10%;
}
</style>