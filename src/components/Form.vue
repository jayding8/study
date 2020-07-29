<template>
  <el-table
    :data="tableData"
    style="width: 100%">
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
    <el-table-column
      label="代码"
      prop="bond_id">
    </el-table-column>
    <el-table-column
      label="名称"
      prop="bond_nm">
    </el-table-column>
    <el-table-column
      label="现价"
      prop="price"
      sortable>
    </el-table-column>
    <el-table-column
      label="溢价率"
      prop="premium_rt"
      sortable>
    </el-table-column>
    <el-table-column
      label="双低"
      prop="dblow"
      sortable>
    </el-table-column>
    <el-table-column
      label="到期时间"
      prop="maturity_dt">
    </el-table-column>
    <el-table-column
      label="剩余规模"
      prop="curr_iss_amt">
    </el-table-column>
<!--     <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
    </el-table-column> -->
  </el-table>
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
    data() {
      return {
        tableData: [{
                "bond_id": "113570",
                "bond_nm": "百达转债",
                "stock_id": "sh603331",
                "stock_nm": "百达精工",
                "convert_price": "11.54",
                "convert_price_valid_from": "2020-07-20",
                "convert_dt": "2020-09-17",
                "maturity_dt": "2026-03-10",
                "next_put_dt": "2024-03-11",
                "put_dt": null,
                "put_notes": null,
                "put_price": "100.000",
                "put_inc_cpn_fl": "y",
                "put_convert_price_ratio": "68.57",
                "put_count_days": 30,
                "put_total_days": 30,
                "put_real_days": 0,
                "repo_discount_rt": "0.00",
                "repo_valid_from": null,
                "repo_valid_to": null,
                "turnover_rt": "0.92",
                "redeem_price": "110.000",
                "redeem_inc_cpn_fl": "n",
                "redeem_price_ratio": "130.000",
                "redeem_count_days": 15,
                "redeem_total_days": 30,
                "redeem_real_days": 0,
                "redeem_dt": null,
                "redeem_flag": "X",
                "orig_iss_amt": "2.800",
                "curr_iss_amt": "2.800",
                "rating_cd": "A+",
                "issuer_rating_cd": "A+",
                "guarantor": "股份质押的担保",
                "force_redeem": null,
                "real_force_redeem_price": null,
                "convert_cd": "未到转股期",
                "repo_cd": null,
                "ration": null,
                "ration_cd": "753331",
                "apply_cd": "754331",
                "online_offline_ratio": null,
                "qflag": "N",
                "qflag2": "N",
                "ration_rt": "46.370",
                "fund_rt": "buy",
                "margin_flg": "",
                "pb": "2.53",
                "pb_flag": "N",
                "total_shares": "178950520.0",
                "sqflg": "Y",
                "sprice": "11.78",
                "svolume": "2017.54",
                "sincrease_rt": "0.86%",
                "qstatus": "00",
                "bond_value": "buy",
                "bond_value2": "buy",
                "last_time": "15:00:28",
                "convert_value": "102.08",
                "premium_rt": "7.74%",
                "year_left": "5.619",
                "ytm_rt": "0.86%",
                "ytm_rt_tax": "0.37%",
                "price": "109.980",
                "full_price": "109.980",
                "increase_rt": "0.23%",
                "volume": "284.92",
                "convert_price_valid": "Y",
                "adj_scnt": 0,
                "adj_cnt": 0,
                "redeem_icon": "",
                "redeem_style": "Y",
                "owned": 0,
                "noted": 0,
                "bond_value3": "buy",
                "ref_yield_info": "",
                "adjust_tip": "",
                "adjusted": "N",
                "option_tip": "",
                "left_put_year": "-",
                "short_maturity_dt": "26-03-10",
                "dblow": "117.72",
                "force_redeem_price": "15.00",
                "put_convert_price": "8.08",
                "convert_amt_ratio": "13.3%",
                "stock_net_value": "0.00",
                "stock_cd": "603331",
                "pre_bond_id": "sh113570",
                "repo_valid": "有效期：-",
                "convert_cd_tip": "未到转股期；2020-09-17 开始转股",
                "price_tips": "全价：109.980 最后更新：15:00:28"
            },
            {
                "bond_id": "123045",
                "bond_nm": "雷迪转债",
                "stock_id": "sz300652",
                "stock_nm": "雷迪克",
                "convert_price": "20.13",
                "convert_price_valid_from": "2020-07-10",
                "convert_dt": "2020-09-18",
                "maturity_dt": "2026-03-11",
                "next_put_dt": "2024-03-11",
                "put_dt": null,
                "put_notes": null,
                "put_price": "100.000",
                "put_inc_cpn_fl": "y",
                "put_convert_price_ratio": "69.35",
                "put_count_days": 30,
                "put_total_days": 30,
                "put_real_days": 0,
                "repo_discount_rt": "0.00",
                "repo_valid_from": null,
                "repo_valid_to": null,
                "turnover_rt": "1.20",
                "redeem_price": "113.000",
                "redeem_inc_cpn_fl": "n",
                "redeem_price_ratio": "130.000",
                "redeem_count_days": 15,
                "redeem_total_days": 30,
                "redeem_real_days": 0,
                "redeem_dt": null,
                "redeem_flag": "X",
                "orig_iss_amt": "2.880",
                "curr_iss_amt": "2.880",
                "rating_cd": "A+",
                "issuer_rating_cd": "A+",
                "guarantor": "无担保",
                "force_redeem": null,
                "real_force_redeem_price": null,
                "convert_cd": "未到转股期",
                "repo_cd": null,
                "ration": null,
                "ration_cd": "380652",
                "apply_cd": "370652",
                "online_offline_ratio": null,
                "qflag": "N",
                "qflag2": "N",
                "ration_rt": "44.120",
                "fund_rt": "buy",
                "margin_flg": "",
                "pb": "2.17",
                "pb_flag": "N",
                "total_shares": "88000000.0",
                "sqflg": "Y",
                "sprice": "20.32",
                "svolume": "1016.89",
                "sincrease_rt": "2.11%",
                "qstatus": "00",
                "bond_value": "buy",
                "bond_value2": "buy",
                "last_time": "15:00:03",
                "convert_value": "100.94",
                "premium_rt": "8.67%",
                "year_left": "5.622",
                "ytm_rt": "1.55%",
                "ytm_rt_tax": "0.94%",
                "price": "109.700",
                "full_price": "109.700",
                "increase_rt": "0.95%",
                "volume": "378.15",
                "convert_price_valid": "Y",
                "adj_scnt": 0,
                "adj_cnt": 0,
                "redeem_icon": "",
                "redeem_style": "Y",
                "owned": 0,
                "noted": 0,
                "bond_value3": "buy",
                "ref_yield_info": "",
                "adjust_tip": "",
                "adjusted": "N",
                "option_tip": "",
                "left_put_year": "-",
                "short_maturity_dt": "26-03-11",
                "dblow": "118.37",
                "force_redeem_price": "26.17",
                "put_convert_price": "14.09",
                "convert_amt_ratio": "16.1%",
                "stock_net_value": "0.00",
                "stock_cd": "300652",
                "pre_bond_id": "sz123045",
                "repo_valid": "有效期：-",
                "convert_cd_tip": "未到转股期；2020-09-18 开始转股",
                "price_tips": "全价：109.700 最后更新：15:00:03"
            }]
      }
    }
  }
</script>
