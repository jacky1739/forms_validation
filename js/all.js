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
        this.$refs.userProductModal.openModal();
    },
});

app.component('userProductModal', productModal);

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount("#app");