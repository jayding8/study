<template>
  <div>
    <div>
      <div>
        <span>
          <el-select v-model="filter_option" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </span>
        <span>
          <el-select v-model="operator" placeholder="请选择">
            <el-option v-for="item in operatorOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </span>
        <span>
          <el-input v-model="input_num" placeholder="请输入内容" style="width: 150px"></el-input>
        </span>
      </div>
      <div>
        <span>到期时间：</span>
        <el-date-picker v-model="maturity_date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary" @click="kzzFilter()">筛选</el-button>
      </div>
      <div>
        <el-input style="width: 150px" v-model="search_text" size="mini" placeholder="输入关键字搜索" />
      </div>
    </div>
    <div>
      <el-table :data="tableData.filter(data => !search_text || data.bond_id.toLowerCase().includes(search_text.toLowerCase()) || data.bond_nm.toLowerCase().includes(search_text.toLowerCase()))" style="width: 100%">
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
        <el-table-column label="现价" prop="price" sortable>
        </el-table-column>
        <el-table-column label="溢价率" prop="premium_rt" sortable>
        </el-table-column>
        <el-table-column label="双低" prop="dblow" sortable>
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

</style>
<script>
export default {
  data () {
    return {
      tableData: [],
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
      options: [{
        value: 'price',
        label: '现价'
      }, {
        value: 'premium_rt',
        label: '溢价率'
      }, {
        value: 'curr_iss_amt',
        label: '剩余规模'
      }],
      operatorOptions: [{
        value: 'lt',
        label: '<'
      }, {
        value: 'lt_et',
        label: '<='
      }, {
        value: 'et',
        label: '='
      }, {
        value: 'gt_et',
        label: '>='
      }, {
        value: 'gt',
        label: '>'
      }],
      search_text: '', // 搜索框文本
      maturity_date: '', // 日期插件
      filter_option: '', // 搜索选项options
      operator: '', // 搜索条件（> = <）
      input_num: '' // 搜索内容
    }
  },
  methods: {
    // 获取可转债列表数据
    getKzzList () {
      // console.log('getKzzList', this.$api)
       this.$api.lowRiskStrategy().then(res => {
          console.log(res)
          this.tableData = res
       })
    },
    // 筛选可转债数据
    kzzFilter () {
      console.log(this.maturity_date[0])
      console.log(this.maturity_date[1])
    }
  },
  created () {
    console.log('created')
    this.getKzzList()
  }

}

</script>
