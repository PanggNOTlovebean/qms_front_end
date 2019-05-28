<template>
  <div class="wrapper">
    <Table class="schooltable" border :columns="columns2" :data="data3"></Table>
    <Modal v-model="isShowDialog" title="修改学校信息" @on-ok="ok">
      <Row>
        试卷名称
        <Input type="text" v-model="change.name"/>年级
        <Select v-model="change.grade" placeholder="请选择年级">
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
        </Select>学科:
        <Select v-model="change.subject" placeholder="请选择科目">
          <Option value="chinese">语文</Option>
          <Option value="math">数学</Option>
          <Option value="english">英语</Option>
          <Option value="physical">物理</Option>
          <Option value="chemistry">化学</Option>
          <Option value="biology">生物</Option>
          <Option value="politics">政治</Option>
          <Option value="geography">地理</Option>
          <Option value="history">历史</Option>
        </Select>总分：
          <Input type="number" v-model="change.score"/>
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
          key: 'paper_id',
          width: '200%',
          // fixed: 'left'
        },
        {
          title: '名称',
          key: 'name',
          width: '200%'
        },
        {
          title: '学科',
          key: 'subject_ch',
          width: '200%'
        },
        {
          title: '年级',
          key: 'grade',
          width: '200%'
        },
        {
          title: '学校',
          key: 'school_name',
          width: '200%'
        },
        {
          title: '总分',
          key: 'score',
          width: '200%'
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
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
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
      inedx: 0,
      change: {
        school_id: 0,
        name: "",
        type: "",
      }
    }
  },
  created () {
    let that = this
    this.axios.get("/getAllPaper").then(function (response) {
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

    remove (index) {
      let that = this
      let deleteData = { "paper_id": that.data3[index].paper_id }
      // console.log(deleteData);
      this.axios.post("/deletePaper", deleteData).then(function (response) {
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
      this.index = index
      this.isShowDialog = true
      this.change.paper_id = this.data3[index].paper_id;
      this.change.name = this.data3[index].name;
      this.change.grade = this.data3[index].grade;
      this.change.subject = this.data3[index].subject;
      this.change.score = this.data3[index].score;
      console.log(this.data3);
      console.log(this.change);
    },
    ok () {
      let that = this
      let index = this.index
      let subject_dict = {
        'chinese': '语文',
        'math': '数学',
        'english': '英语',
        'physical': '物理',
        'chemistry': '化学',
        'biology': '生物',
        'politics': '政治',
        'geography': '地理',
        'history': '历史',

      }
      this.axios.post("/updatePaper", this.change).then(function (response) {
        that.$Message.success('success');
        that.data3[index].paper_id = that.change.paper_id;
        that.data3[index].grade = that.change.grade;
        that.data3[index].subject = that.change.subject;
        that.data3[index].subject_ch =subject_dict[that.change.subject]
        that.data3[index].score = that.change.score;
        that.data3[index].name = that.change.name;
      }).catch(function (error) {
        console.log(error);
        that.$Message.error('error');
        // handle error
        // console.log(error)
      }).finally(function () {
        // always executed
      });

    }
  }
}

</script>
<style scoped>
.schooltable {
  /* margin-left: 20 */

  width: 100%;
}
.wrapper {
  width: 80%;
  margin-left: 10%;
  margin-top: 30px;
}
</style>
