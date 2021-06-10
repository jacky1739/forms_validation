import productModal from './productModal.js';

const api_path =  'jacky';
const base_url =  'https://vue3-course-api.hexschool.io/';

const app = Vue.createApp({
    data() {
        return {
            // 讀取效果
            loadingStatus: {
                loadingItem: '',
            },
            //產品列表
            products: [],
            // props 傳遞到內層的站存資料
            forms: {
                user: {
                    name: '',
                    emil: '',
                    tel: '',
                    address: '',
                },
                messages: '',
            },
            // 購物車列表
            cart: {}
        };
    },
    methods: {

    },
    mounted() {
        // this.$refs.userProductModal.openModal();
    },
});

app.component('userProductModal', productModal);

app.mount("#app");