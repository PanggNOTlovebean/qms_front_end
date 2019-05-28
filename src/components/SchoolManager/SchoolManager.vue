<template>
  <div class="wrapper">
    <Table class="schooltable" border :columns="columns2" :data="data3"></Table>
    <Modal v-model="isShowDialog" title="修改学校信息" @on-ok="ok">
      <Row>
        学校名称
        <Input type="text" v-model="change.name"/>学校性质：
        <Input type="text" v-model="change.type"/>:
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
          key: 'school_id',
          width: '200%',
          // fixed: 'left'
        },
        {
          title: '名称',
          key: 'name',
          width: '200%'
        },
        {
          title: '性质',
          key: 'type',
          width: '200%'
        },
        {
          title: 'Action',
          key: 'action',
          // fixed: 'right',
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
    this.axios.get("/getAllSchool").then(function (response) {
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
      let deleteData = { "school_id": that.data3[index].school_id}
      // console.log(deleteData);
      this.axios.post("/deleteSchool", deleteData).then(function (response) {
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
      this.change.school_id = this.data3[index].school_id;
      this.change.name = this.data3[index].name;
      this.change.type = this.data3[index].type;
      console.log(this.data3);
      console.log(this.change);
    },
    ok () {
      let that = this
      let index = this.index
      this.axios.post("/updateSchool", this.change).then(function (response) {
        that.$Message.success('success');
        that.data3[index].school_id = that.change.school_id;
        that.data3[index].name = that.change.name;
        that.data3[index].type = that.change.type;
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
  width: 802px;
}
.wrapper {
  width: 59%;
  margin-left: 20%;
  margin-top: 30px;
}
</style>
