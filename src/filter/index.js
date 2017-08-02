import fil from './fil'
const install = function (Vue, opts = {}) {
  fil.forEach(f => {
    console.log(f)
    Vue.filter(f.name, f.fil)
  })
}
export default install
