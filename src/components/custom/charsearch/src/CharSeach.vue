<template>
<div class="initials" style="height: 523px;">
  <ul>
    <li v-for="cha in chars"><a :href="'#'+cha">{{cha}}</a></li>
  </ul>
</div>
</template>
<script>
export default {
  name: 'DlCharsearch',
  data () {
    return {
      chars: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
    }
  }
}
</script>
