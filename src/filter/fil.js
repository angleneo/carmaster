export default [
  {
    name: 'money',
    fil: (value) => {
      if (!value) return '0.00'
      value = parseFloat(value).toFixed(2)
      return value
    }
  },
  {
    name: 'status',
    fil: (value) => {
      if (value !== 0 && !value) return '未知状态'
      value = parseInt(value)
      if (value === -1) return '已取肖'
      if (value === 0) return '预约中'
      if (value === 1) return '待确认'
      if (value === 2) return '待支付'
      if (value === 3) return '施工中'
      if (value === 4) return '已完成'
    }
  },
  {
    name: 'orderurl',
    fil: (value) => {
      return '/order/' + value
    }
  }
]
