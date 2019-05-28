<template>
  <div class="wrapper">
    <Table class="table" border :columns="columns2" :data="data3"></Table>
    <Modal v-model="isShowDialog" title="修改试题信息" @on-ok="ok">
      <Row>
        来源卷:
        <Input type="text" v-model="change.paper_name"/>难度：
        <Input type="text" v-model="change.hardness"/>分值:
        <Input type="text" v-model="change.score"/>题号:
        <Input type="text" v-model="change.position"/>年级:
        <Input type="text" v-model="change.grade"/>知识点：
        <Input type="text" v-model="change.knowledges"/>
      </Row>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      columns2: [
        {
          title: 'id',
          key: 'question_detail_id',
          width: '200%',
          fixed: 'left'
        },
        {
          title: '题型',
          key: 'type_ch',
          width: '200%'
        },
        {
          title: '学科',
          key: 'subject_ch',
          width: '200%'
        },
        {
          title: '来源卷',
          key: 'paper_name',
          width: '200%'
        },
        {
          title: '难度',
          key: 'hardness',
          width: '200%'
        },
        {
          title: '分值',
          key: 'score',
          width: '100%'
        },
        {
          title: '学校',
          key: 'school_name',
          width: '100%'
        },
        {
          title: '题号',
          key: 'position',
          width: '100%'
        },
        {
          title: '年级',
          key: 'grade',
          width: '100%'
        },
        {
          title:'知识点',
          key:'knowledges',
          width:'100%'
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, 'View'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.index)
                  }
                }
              }, 'edit'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete'),

            ]);
          }
        }
      ],
      data3: [
      ],
      isShowDialog: false,
      inedx:0,
      change: {
        question_detail_id: 0,
        question_info_id: 0,
        hardness: 0,
        paper_id: 0,
        paper_name: '',
        grade: 0,
        position: 0,
        score: 0,
        knowledges:"",
      }
    }
  },
  created () {
    let that = this
    this.axios.get("/getAllQuestion").then(function (response) {
      console.log(response);
      that.data3 = response.data
    }).catch(function (error) {
      // handle error
      // console.log(error)
    }).finally(function () {
      // always executed
    });
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '试题信息',
        content: `题干:${this.data3[index].stem}<br>答案：${this.data3[index].answer}<br>解析：${this.data3[index].analysis}`
      })
    },
    remove (index) {
      let that = this
      let deleteData = { "question_info_id": that.data3[index].question_info_id }
      // console.log(deleteData);
      this.axios.post("/deleteQuestion", deleteData).then(function (response) {
        that.$Message.success('success');
        that.data3.splice(index, 1);
      }).catch(function (error) {
        that.$Message.error('error');
        // handle error
        // console.log(error)
      }).finally(function () {
        // always executed
      });
      // this.data3.splice(index, 1);
    },
    edit (index) {
      this.index=index
      this.isShowDialog = true
      this.change.question_detail_id = this.data3[index].question_detail_id;
      this.change.question_info_id = this.data3[index].question_info_id;
      this.change.hardness = this.data3[index].hardness
      this.change.paper_id = this.data3[index].paper_id
      this.change.paper_name = this.data3[index].paper_name
      this.change.grade = this.data3[index].grade
      this.change.score = this.data3[index].score
      this.change.position = this.data3[index].position
      this.change.knowledges = this.data3[index].knowledges
      this.change.knowledges_id=this.data3[index].knowledges_id 
    },
    ok () {
      let that = this
      let index=this.index
      this.axios.post("/updateQuestion", this.change).then(function (response) {
        that.$Message.success('success');
        that.data3[index].question_detail_id = that.change.question_detail_id;
        that.data3[index].question_info_id = that.change.question_info_id;
        that.data3[index].hardness = that.change.hardness
        that.data3[index].paper_id = that.change.paper_id
        that.data3[index].paper_name = that.change.paper_name
        that.data3[index].grade = that.change.grade
        that.data3[index].score = that.change.score
        that.data3[index].position = that.change.position
        that.data3[index].knowledges = that.change.knowledges
        that.data3[index].knowledges_id = that.change.knowledges_id
      }).catch(function (error) {
        console.log(error);
        that.$Message.error('error');
        // handle error
        // console.log(error)
      }).finally(function () {
        // always executed
      });
      
    }
  },
  
}

</script>
<style>
  .wrapper {
  margin-top: 30px;
}
</style>
