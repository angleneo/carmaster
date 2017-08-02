<template>
  <div class="dmodal">
    <div class="mask">
    </div>
    <div class="modal-content">
      <div class="title"><b class="left">{{data.title}}</b> <img src="./images/icon-delete.png" class="right p-d"></div>
      <p class="text-center popup-m p-d">{{data.content}}</p>
      <div class="title p-d text-center popup-m box-riaud">
        <button type="button" @click="confirmYes" class="btn btn-primary p-orange box-width">{{data.yes}}</button>
        <button type="button" @click="confirmNo" class="btn btn-primary p-orange-b box-width">{{data.no}}</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'DlModal',
    data () {
      return {
        reValue: this.value,
        modals: {
          'confirm-order': {
            title: '确认订单',
            content: '请检查施工情况，并确认订单',
            yes: '确认',
            no: '取消'
          },
          'cancel-order': {
            title: '取消订单',
            content: '亲，您真的要取消此订单吗？',
            yes: '是',
            no: '否'
          }
        }
      }
    },
    mounted () {
      if (!this.dlType) {
        this.dlType = 'confirm-order'
      }
    },
    computed: {

      mtype: function () { return this.dlType },
      data: function () { return this.modals[this.mtype] }
    },
    props: ['dlType', 'dlOptions', 'value'],
    watch: {
      reValue (v) {
        this.$emit('input', v)
      }
    },
    methods: {
      async confirmYes () {
        if (this.dlOptions && this.dlOptions.yes) {
          this.dlOptions.yes()
        }
      },
      async confirmNo () {
        if (this.dlOptions && this.dlOptions.no) {
          this.dlOptions.no()
        }
      }
    }
  }
</script>
<style>
  .dmodal {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  .dmodal .mask {
    display: block;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color:#000;
    opacity:0.3;
  }
  .dmodal .modal-content {
    position: absolute;
    z-index: 10000;
    background: #fff;
    opacity: 1;
    border-radius: 8px;
    width: 60%;
    /*  height: 12.5rem;*/
    top: 35%;
    left: 20%;
  }
  .dmodal .modal-content .title {
    width: 100% ;
    background:#eeeeee;
    padding:2% 3%;
    display: inline-block;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

  }
</style>
