import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        name: '',
        roles: [],
    }),
    actions: {
        // setUser(name, roles, email) {
        //     // console.log('Cập nhật user:', name, roles, email);
        //     this.name = name;
        //     this.roles = roles;
        //     this.email = email;
        // },
        setUser(name, roles) {
            // console.log('Cập nhật user:', name, roles, email);
            this.name = name;
            this.roles = roles;
        },
        resetUser() {
            this.name = '';
            this.roles = [];
        },
        // resetUser() {
        //     this.name = '';
        //     this.roles = [];
        //     this.email = '';
        // },
    },
});
