<template>
  <div class="wrapper">
    <Table class="table" border :columns="columns2" :data="data3"></Table>
    <Button @click="createPaper">生成试卷</Button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      columns2: [
        {
          title: 'id',
          key: 'question_info_id',
          width: '200%',
          fixed: 'left'
        },
        {
          title: '年级',
          key: 'grade',
          width: '200%',
        },
        {
          title: '题型',
          key: 'type_ch',
          width: '200%',
          filters: [
            {
              label: '单选题',
              value: 1
            },
            {
              label: '多选题',
              value: 2
            },
            {
              label: '填空题',
              value: 3
            },
            {
              label: '判断题',
              value: 4
            },
            {
              label: '分析题',
              value: 5
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            switch (value) {
              case 1:
                return row.type_ch == '单选题'
              case 2:
                return row.type_ch == '多选题'
              case 3:
                return row.type_ch == '填空题'
              case 4:
                return row.type_ch == '判断题'
              case 5:
                return row.type_ch == '分析题'
            }
          }
        },
        {
          title: '来源卷',
          key: 'paper_name',
          width: '200%'
        },
        {
          title: '难度',
          key: 'hardness',
          sortable: true,
          width: '200%'
        },
        {
          title: '分值',
          key: 'score',
          width: '100%',
          sortable: true
        },
        {
          title: '学校',
          key: 'school_name',
          width: '100%'
        },
        {
          title: '知识点',
          key: 'knowledges',
          width: '100%'
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
                    this.insert(params.index)
                  }
                }
              }, '导入'),
            ]);
          }
        }
      ],
      data3: [
      ],
      isShowDialog: false,
      inedx: 0,
      change: {
        question_detail_id: 0,
        question_info_id: 0,
        hardness: 0,
        paper_id: 0,
        paper_name: '',
        grade: 0,
        position: 0,
        score: 0,
        knowledges: "",
      }
    }
  },
  created () {
    let that = this
    this.axios.get("/getAllQuestion").then(function (response) {
      // console.log(response);
      that.data3 = response.data
      // console.log(that.data3);
      var i = 0

      for (var i = 0; i < that.data3.length; i++) {
        if (that.data3[i].grade != sessionStorage.getItem('grade') || that.data3[i].subject != sessionStorage.getItem('subject')) {
          // console.log(that.data3[i]);
          that.data3.splice(i, 1)
          i--;
        }
      }
    }).catch(function (error) {
      console.log(error);
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
    insert (index) {
      this.index = index
      console.log(this.data3[index].subject);
      switch (this.data3[index].type) {
        case "singlechoose":
          let singlechoose = sessionStorage.getItem('singlechoose')
          if (singlechoose)
            sessionStorage.setItem('singlechoose', singlechoose + ',' + this.data3[index].question_detail_id)
          else
            sessionStorage.setItem('singlechoose', this.data3[index].question_detail_id)
          break
        case "multiplechoose":
          let multiplechoose = sessionStorage.getItem('multiplechoose')
          if (multiplechoose)
            sessionStorage.setItem('multiplechoose', multiplechoose + ',' + this.data3[index].question_detail_id)
          else
            sessionStorage.setItem('multiplechoose', this.data3[index].question_detail_id)
          break
        case "judge":
          let judge = sessionStorage.getItem('judge')
          if (judge)
            sessionStorage.setItem('judge', judge + ',' + this.data3[index].question_detail_id)
          else
            sessionStorage.setItem('judge', this.data3[index].question_detail_id)
          break
        case "blank":
          let blank = sessionStorage.getItem('blank')
          if (blank)
            sessionStorage.setItem('blank', blank + ',' + this.data3[index].question_detail_id)
          else
            sessionStorage.setItem('blank', this.data3[index].question_detail_id)
          break
        case "discuss":
          let discuss = sessionStorage.getItem('discuss')
          if (discuss)
            sessionStorage.setItem('discuss', discuss + ',' + this.data3[index].question_detail_id)
          else
            sessionStorage.setItem('discuss', this.data3[index].question_detail_id)
          break
      }
      this.$Message.success("插入成功")
      this.data3.splice(index, 1)
    },
    createPaper(){
      this.$router.push('/Manager/Paper')
    }
  },

}

</script>
<style>
.wrapper {
  margin-top: 30px;
}
</style>
