<template>
  <div style="padding: 0px 100px">
    <div>
      <div class="common-search">
        <el-input v-model="search_text" placeholder="输入关键字搜索" />
        <el-button type="primary" @click="kzzFilter()">筛选</el-button>
      </div>
      <div class="advanced-search">
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
      </div>
    </div>
    <div>
      <el-table height="800px" :data="tableData" style="width: 100%;" highlight-current-row empty-text="啊哦，数据不见了哟！">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="代码">
                <span>{{ props.row.bond_id }}</span>
              </el-form-item>
              <el-form-item label="名称">
                <span>{{ props.row.bond_nm }}</span>
              </el-form-item>
              <el-form-item label="现价">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="溢价率">
                <span>{{ props.row.premium_rt }}</span>
              </el-form-item>
              <el-form-item label="双低">
                <span>{{ props.row.dblow }}</span>
              </el-form-item>
              <el-form-item label="到期时间">
                <span>{{ props.row.maturity_dt }}</span>
              </el-form-item>
              <el-form-item label="剩余规模">
                <span>{{ props.row.curr_iss_amt }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="代码" prop="bond_id">
        </el-table-column>
        <el-table-column label="名称" prop="bond_nm">
        </el-table-column>
        <el-table-column label="现价" prop="price" sortable :sort-method="(a,b) => a.price - b.price">
        </el-table-column>
        <el-table-column label="溢价率" prop="premium_rt" sortable :sort-method="(a,b) => parseFloat(a.premium_rt) - parseFloat(b.premium_rt)">
        </el-table-column>
        <el-table-column label="双低" prop="dblow" sortable :sort-method="(a,b) => a.dblow - b.dblow">
        </el-table-column>
        <el-table-column label="到期时间" prop="maturity_dt">
        </el-table-column>
        <el-table-column label="剩余规模" prop="curr_iss_amt">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style>
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
  width: 1000px;
  justify-content: flex-start;
  align-items: center;
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
<script>
export default {
  data () {
    return {
      tableData: [],
      tableDataAll: [], // 备份接口返回值，筛选使用
      pickerOptions: {
        shortcuts: [{
          text: '下周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '下个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '下三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
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
      search_text: '', // 搜索框文本
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
          console.log('getKzzList', res)
          return false
        }
      })
    },
    // 筛选可转债数据
    kzzFilter () {
      // const _this = this
      this.tableData = this.tableDataAll
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
