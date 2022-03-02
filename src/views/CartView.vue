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
      <div class="my-5 row justify-content-center">
        <VForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="sendOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <VField id="email" name="email" type="email" class="form-control"
              :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="required|email"
              v-model="form.user.email"> </VField>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <VField id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名" rules="required" v-model="form.user.name"></VField>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <VField id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話" rules="required|min:8|max:10|numeric" v-model="form.user.tel"></VField>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <VField id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址" rules="required" v-model="form.user.address"></VField>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea id="message" class="form-control" cols="30" rows="10" v-model="form.user.message"></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger"
              :disabled="Object.keys(errors).length > 0 || carts.carts?.length ===0">送出訂單</button>
          </div>
        </VForm>
      </div>
</template>
<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      carts: {},
      isLoadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          message: ''
        }
      }
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
    },
    sendOrder () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order }).then((response) => {
        alert(response.data.message)
        this.$refs.form.resetForm()
        this.form.user.message = ''
        this.getCarts()
      }).catch((err) => {
        console.dir(err)
        alert(err.response.data.message)
      })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
