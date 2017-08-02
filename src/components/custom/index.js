import Fmenu from './fmenu'
import CharSearch from './CharSearch'
import Stars from './stars'
import MView from './MView'
// import S4pl from './s4pl'
import Title from './title'
import DlSteps from './steps'
import DlPickplate from './pickplate'
import Goto from './goto'
const components = [
  // S4pl,
  Fmenu,
  DlSteps,
  DlPickplate,
  CharSearch,
  Stars,
  MView
]

const directives = [
  Title,
  Goto
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
  directives.map(directive => {
    Vue.directive(directive.name, directive)
  })
}
export default install
