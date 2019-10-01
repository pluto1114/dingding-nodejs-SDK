var r = () => {
  return {
    errcode: '0',
    message: 'success',
    items: [],
    itemMap: {},

    setErrcode(val) {
      this.errcode = val
      return this
    },

    setMessage(val) {
      this.message = val
      return this
    },

    setItems(val) {
      this.items = val
      return this
    },

    setItemMap(val) {
      this.itemMap = val
      return this
    },
    fail(message='fail'){
      this.errcode='-1'
      this.message=message
      return this
    }
  }
}
module.exports = r