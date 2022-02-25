<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">前台</a> -->
      <router-link class="navbar-brand" to="/">前台</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品頁面</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">購物車</router-link>
          </li>
        </ul>
      </div>

      <router-link to="/cart" class="btn btn-primary position-relative">
        結帳
         <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {{carts.carts?.length}}
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      carts: {}
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
    }
  },
  mounted () {
    this.getCarts()
    emitter.on('get-cart-num', () => {
      this.getCarts()
    })
  }
}
</script>
