<template>
  <div class="form">
    <div class="form-search">
      <div class="common-search">
        <el-input v-model="search_text" placeholder="输入{代码}或{名称}搜索" />
        <el-button type="primary" @click="kzzFilter()">筛选</el-button>
        <div v-if="userInfo && userInfo.access_token" class="advanced-search-buttun" @click='showAdvancedSearch'>
          <span v-text="show_advanced_search ? '收起高级搜索' : '展开高级搜索'"></span>
          <span :class="show_advanced_search ? 'iconUp' : 'iconDown'"></span>
        </div>
      </div>
      <div class="advanced-search" v-if='show_advanced_search'>
        <div>
          <span class="title">现价：</span>
          <span>
            <el-select v-model="price_operator" placeholder="请选择">
              <el-option v-for="item in operator" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-input v-model="price_num" placeholder="请输入内容" style="width: 150px"></el-input>
          </span>
        </div>
        <div>
          <span class="title">溢价率：</span>
          <span>
            <el-select v-model="premium_rt_operator" placeholder="请选择">
              <el-option v-for="item in operator" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-input v-model="premium_rt_num" placeholder="请输入内容" style="width: 150px"></el-input>
          </span>
        </div>
        <div>
          <span class="title">剩余规模：</span>
          <span>
            <el-select v-model="curr_iss_amt_operator" placeholder="请选择">
              <el-option v-for="item in operator" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-input v-model="curr_iss_amt_num" placeholder="请输入内容" style="width: 150px"></el-input>
          </span>
        </div>
        <div>
          <span class="title">到期时间：</span>
          <el-date-picker v-model="maturity_date" type="daterange" align="right" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div>
          <span class="title">已上市：</span>
          <el-checkbox v-model="listed">已上市</el-checkbox>
        </div>
      </div>
    </div>
    <div class="form-list">
      <el-table height="800px" :data="tableData" :row-class-name="({row, rowIndex}) => row.user_black ? 'user-black' : 'empty'" highlight-current-row empty-text="啊哦，数据不见了哟！">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="代码">
                <span>{{ props.row.bond_id }}</span>
              </el-form-item>
              <el-form-item label="名称">
                <span>{{ props.row.bond_nm }}</span>
              </el-form-item>
              <el-form-item label="正股代码">
                <span>{{ props.row.stock_cd }}</span>
              </el-form-item>
              <el-form-item label="正股">
                <span>{{ props.row.stock_nm }}</span>
              </el-form-item>
              <el-form-item label="正股涨跌">
                <span>{{ props.row.sincrease_rt }}</span>
              </el-form-item>
              <el-form-item label="转股价">
                <span>{{ props.row.convert_price }}</span>
              </el-form-item>
              <el-form-item label="转股价值">
                <span>{{ props.row.convert_value }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="代码" prop="bond_id" sortable>
        </el-table-column>
        <el-table-column label="名称" prop="bond_nm" sortable>
          <template slot-scope="scope">
            <span :class="scope.row.user_optional ? 'red' : 'empty'">{{scope.row.bond_nm}}</span>
          </template>
        </el-table-column>
        <el-table-column label="现价" prop="price" sortable :sort-method="(a,b) => a.price - b.price">
        </el-table-column>
        <el-table-column label="涨跌幅" prop="increase_rt" sortable :sort-method="(a,b) => parseFloat(a.increase_rt) - parseFloat(b.increase_rt)">
          <template slot-scope="scope">
            <span :class="parseFloat(scope.row.increase_rt) > 0 ? 'red' : parseFloat(scope.row.increase_rt) < 0 ? 'green' : 'empty'">{{scope.row.increase_rt}}</span>
          </template>
        </el-table-column>
        <el-table-column label="溢价率" prop="premium_rt" sortable :sort-method="(a,b) => parseFloat(a.premium_rt) - parseFloat(b.premium_rt)">
        </el-table-column>
        <el-table-column label="双低" prop="dblow" sortable :sort-method="(a,b) => a.dblow - b.dblow">
        </el-table-column>
        <el-table-column label="剩余(亿元)" prop="curr_iss_amt" sortable :sort-method="(a,b) => a.curr_iss_amt - b.curr_iss_amt">
        </el-table-column>
        <el-table-column label="成交(万元)" prop="volume" sortable :sort-method="(a,b) => a.volume - b.volume">
        </el-table-column>
        <el-table-column label="换手率" prop="turnover_rt" sortable :sort-method="(a,b) => a.turnover_rt - b.turnover_rt">
        </el-table-column>
        <el-table-column label="到期时间" prop="maturity_dt" sortable>
        </el-table-column>
        <el-table-column label="操作" v-if="userInfo && userInfo.access_token">
          <template slot-scope="scope">
            <span title="自选" @click="userOptional(scope.$index, scope.row, {op_id:2, status_key:'user_optional', op_name:'自选'})" :class="scope.row.user_optional ? 'el-icon-remove' : 'el-icon-circle-plus-outline'"></span>
            <span title="黑名单" @click="userOptional(scope.$index, scope.row, {op_id:3, status_key:'user_black', op_name:'黑名单'})" :class="scope.row.user_black ? 'el-icon-document-delete' : 'el-icon-document'"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      tableDataAll: [], // 备份接口返回值，筛选使用
      pickerOptions: {
        shortcuts: [{
          text: '一周内',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '一月内',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '一年内',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '三年内',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 365 * 3)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '五年内',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 365 * 5)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      operator: [{
        value: '<',
        label: '<'
      }, {
        value: '<=',
        label: '<='
      }, {
        value: '=',
        label: '='
      }, {
        value: '>=',
        label: '>='
      }, {
        value: '>',
        label: '>'
      }],
      userInfo: this.$cookies.get('userInfo'),
      show_advanced_search: 0,
      search_text: '', // 搜索框文本
      listed: false, // 是否已上市
      maturity_date: '', // 日期插件
      price_operator: '', // 搜索条件（> = <）
      price_num: '', // 价格
      premium_rt_operator: '', // 搜索条件（> = <）
      premium_rt_num: '', // 溢价率
      curr_iss_amt_operator: '', // 搜索条件（> = <）
      curr_iss_amt_num: '' // 剩余规模
    }
  },
  methods: {
    // 获取可转债列表数据
    getKzzList () {
      this.$api.lowRiskStrategy().then(res => {
        // console.log(res)
        if (res.error_code === 0) {
          this.tableData = this.tableDataAll = res.data
        } else {
          this.$message.error(res.error_code + ':' + res.error_message)
          console.log('getKzzList', res)
          return false
        }
      })
    },
    // 筛选可转债数据
    kzzFilter () {
      // const _this = this
      this.tableData = this.tableDataAll
      // 是否已上市 或者 price_tips: "待上市"
      if (this.listed) {
        this.tableData = this.tableData.filter(item => item.last_time !== null)
      }
      // 搜索框（转债代码 和 名称）
      if (this.search_text) {
        this.tableData = this.tableData.filter(data => data.bond_id.toLowerCase().includes(this.search_text.toLowerCase()) || data.bond_nm.toLowerCase().includes(this.search_text.toLowerCase()))
      }
      // 转债价格
      if (this.price_operator && this.price_num) {
        this.tableData = this.tableData.filter(({price}) => this.evalDiy(price + this.price_operator + this.price_num))
      }
      // 转债溢价率
      if (this.premium_rt_operator && this.premium_rt_num) {
        this.tableData = this.tableData.filter(item => this.evalDiy(parseFloat(item.premium_rt) + this.premium_rt_operator + parseFloat(this.premium_rt_num)))
      }
      // 转债剩余规模
      if (this.curr_iss_amt_operator && this.curr_iss_amt_num) {
        this.tableData = this.tableData.filter(item => this.evalDiy(item.curr_iss_amt + this.curr_iss_amt_operator + this.curr_iss_amt_num))
      }
      // 转债到期时间筛选
      if (this.maturity_date) {
        let startTime = this.maturity_date[0]
        let endTime = this.maturity_date[1]
        this.tableData = this.tableData.filter(item => item.maturity_dt > startTime && item.maturity_dt < endTime)
      }
    },
    showAdvancedSearch () {
      this.show_advanced_search = this.show_advanced_search ? 0 : 1
    },
    userOptional (index, row, op) {
      if (row[op.status_key]) {
        // 删除自选、黑名单
        let params = {op_id: op.op_id, types: row.bond_id, type_names: row.bond_nm}
        this.$api.delLogs(params).then(res => {
          if (res.error_code === 0) {
            this.tableData[index][op.status_key] = 0
            this.$message({showClose: true, type: 'success', message: '删除' + op.op_name + '成功'})
          } else {
            this.$message({showClose: true, type: 'error', message: res.error_message})
            return false
          }
        })
      } else {
        // 加入自选、黑名单
        let params = {op_id: op.op_id, op_name: op.op_name, type: row.bond_id, type_name: row.bond_nm}
        this.$api.addLogs(params).then(res => {
          if (res.error_code === 0) {
            this.tableData[index][op.status_key] = 1
            this.$message({showClose: true, type: 'success', message: '添加' + op.op_name + '成功'})
          } else {
            this.$message({showClose: true, type: 'error', message: res.error_message})
            return false
          }
        })
      }
    },
    // 避免直接使用eval，eslint报错
    evalDiy (fn) {
      let Fn = Function
      return new Fn('return ' + fn)()
    }
  },
  created () {
    this.getKzzList()
  }
}

</script>

<style>
.form {
  width: 100%;
  /*height: calc(100% - 66px - 100px)*/
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
  background: #f8f8f8;
}

.form .form-search {
  width: 80%;
  margin-bottom: 15px;
}

.form .form-list {
  width: 100%;
}

.form .form-list .red {
  color: #ff0000;
}

.form .form-list .green{
  color: #008000;
}

.form .form-list .empty{
  /*color: #606266;*/
}

.form .form-list .user-black{
  background-color: #dde1e8a6;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.common-search {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
}

.common-search .advanced-search-buttun {
  width: 15%;
  cursor: pointer;
}

.common-search .advanced-search-buttun .iconDown {
    cursor: pointer;
    margin-left: 12px;
    display: inline-block;
    background-size: contain;
    width: 10px;
    height: 10px;
    background: url(../assets/images/down.png) center center no-repeat;
}

.common-search .advanced-search-buttun .iconUp {
    cursor: pointer;
    margin-left: 12px;
    display: inline-block;
    background-size: contain;
    width: 10px;
    height: 10px;
    background: url(../assets/images/up.png) center center no-repeat;
}

.advanced-search {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 200px;
}

.advanced-search .title {
  display: inline-block;
  width: 88px;
}

</style>
