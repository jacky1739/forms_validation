Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});

VeeValidateI18n.loadLocaleFromURL('../zh_TW.json');
// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為輸入字元立即進行驗證
});

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
            product: {},
            // props 傳遞到內層的站存資料
            forms: {
                user: {
                    name: '',
                    email: '',
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
        getProducts(){
            const api = `${base_url}api/${api_path}/products`;
            axios.get(api).then(res => {
                if(res.data.success){
                    this.products = res.data.products;
                    console.log(this.products);

                }
            })
        },
        openModal(item) {
            this.loadingStatus.loadingItem = item.id;
            console.log(item.id);
            const api = `${base_url}api/${api_path}/product/${item.id}`
            axios.get(api).then(res => {
                console.log(res);
                if(res.data.success){
                    this.product = res.data.product;
                    // console.log(this.product);
                    this.$refs.userProductModal.openModal();
                    this.loadingStatus.loadingItem = '';
                }
            })
        },
        addCart(id, qty = 1){
            this.loadingStatus.loadingItem = id;
            const cart = {
                product_id: id,
                qty
            }
            console.log(cart);
            const api = `${base_url}api/${api_path}/cart`
            axios.post(api, {data:cart}).then(res => {
                if(res.data.success){
                    console.log(res);
                    alert(res.data.message)
                    this.getCart();
                    this.loadingStatus.loadingItem = '';
                }
            })
        },
        getCart(){
            const api = `${base_url}api/${api_path}/cart`
            axios.get(api).then(res => {
                console.log(res);
                this.cart = res.data.data;
                console.log(this.cart);
            })
        },
        updateCart(item){
            this.loadingStatus.loadingItem = item.id;
            const api = `${base_url}api/${api_path}/cart/${item.id}`;
            const cart = {
                product_id: item.product.id,
                qty: item.qty
            }
            console.log(api, cart);
            axios.put(api, {data:cart}).then(res => {
                console.log(res);
                this.loadingStatus.loadingItem = '';
            })
        },
        onSubmit(){
            const api = `${base_url}api/${api_path}/order`
            console.log(this.forms);
            axios.post(api, {data:this.forms}).then(res => {
                console.log(res);
                if(res.data.success){
                    this.$refs.form.resetForm();
                    this.getCart();
                    this.forms.messages = '';
                }
            })

        }
    },
    mounted() {
        // this.$refs.userProductModal.openModal();
        this.getProducts();
        this.getCart();
    },
});

app.component('userProductModal', productModal);

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount("#app");