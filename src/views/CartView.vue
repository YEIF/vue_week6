<template>
  <h2>購物車</h2>
  <div class="text-end">
    <button class="btn btn-outline-danger" type="button" @click="delAllCarts"
      :disabled="carts.carts?.length ===0">清空購物車</button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="carts.carts">
        <tr v-for="cart in carts.carts" :key="cart.id+'123'">
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="delCart(cart.id)">
              <i class="fas fa-spinner fa-pulse" v-if="isLoadingItem===cart.id"></i>
              x
            </button>
          </td>
          <td>
            {{ cart.product.title}}
            <!-- <div class="text-success">
              已套用優惠券
            </div> -->
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input v-model.number="cart.qty" min="1" type="number" class="form-control"
                  @blur="updateCart(cart)">
                <span class="input-group-text" id="basic-addon2">{{ cart.product.unit}}</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            <!-- <small class="text-success">折扣價：</small> -->
            {{ cart.product.price * cart.qty }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ carts.final_total}}</td>
      </tr>
      <tr>
        <!-- <td colspan="3" class="text-end text-success">折扣價</td> -->
        <!-- <td class="text-end text-success">{{ }}</td> -->
      </tr>
    </tfoot>
  </table>
</template>
<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      carts: {},
      isLoadingItem: ''
    }
  },
  methods: {
    getCarts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/`
      this.$http.get(url)
        .then((res) => {
          this.carts = res.data.data
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    delCart (id) {
      this.isLoadingItem = id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(url)
        .then((res) => {
          this.isLoadingItem = ''
          this.getCarts()
          emitter.emit('get-cart-num')
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    delAllCarts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(url)
        .then((res) => {
          this.getCarts()
          emitter.emit('get-cart-num')
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    updateCart (cart) {
      this.isLoadingItem = cart.id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${cart.id}`
      const data = {
        product_id: cart.product_id,
        qty: cart.qty
      }
      this.$http.put(url, { data })
        .then((res) => {
          this.isLoadingItem = ''
          this.getCarts()
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
