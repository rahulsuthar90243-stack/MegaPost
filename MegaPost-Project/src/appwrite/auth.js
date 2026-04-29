import conf from '../conf.js';  
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.AppWriteURL)
            .setProject(conf.AppWriteProjectID);
        this.account = new Account(this.client);
    }
 
    async createAccount({email, password, name}){
        try {
           const userAccount = await this.account.create(ID.unique(), email, password, name);
           if(userAccount){
            // call another function
            return this.loginAccount({email, password});
           }else{
            return userAccount;
           }
        } catch (error) { 
            throw error;
        }
    }

    async login({email, password}){
        try {
          const loginAccount = await this.account.createEmailPasswordSession(email, password);
          return loginAccount;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const currentUser = await this.account.get();
            if(currentUser){
                return currentUser;
            }else{
                return null;
            }
        } catch (error) {
            console.log("AppWrite AuthService ::getCurrentUser error: ", error);
            return null;
        }
    }

    async loginAccount(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("AppWrite AuthService ::loginAccount error: ", error);
        }
    }
}

const authService = new AuthService();

export default authService;
 