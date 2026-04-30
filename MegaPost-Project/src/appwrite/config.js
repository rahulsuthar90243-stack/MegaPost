import conf from '../conf.js';  
import { Client, ID , Databases, Storage, Query} from 'appwrite';

export class Serivice {
    client = new Client();
    Databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteURL)
        .setProject(conf.appWriteProjectID);
        this.Databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
 
    async createPost({title, slug, content, featureImage, status, userId}){
        try {
            const createPost = await this.Databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appWriteCollectionID,
                ID.unique(),
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId,
                });
                return createPost;
        } catch (error) {
            console.log("AppWrite Service ::createPost error: ", error);
        }
    }

    async updatePost(slug, {title, content, featureImage, status}){
        try {
            const updatePost = await this.Databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                }
            );
            return updatePost;
        } catch (error) {
            console.log("AppWrite Service ::updatePost error: ", error);
        }
    } 

    async deletePost(slug){
        try {
            await this.Databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appWriteCollectionID,
                slug,
            )
            return true;
            
        } catch (error) {
            console.log("AppWrite Service ::deletePost error: ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.Databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appWriteCollectionID,
                slug,
            )
        } catch (error) {
            console.log("AppWrite Service ::getPost error: ", error);
            return false;
        }
    }

    async getPosts(querys = [Query.equal("status", "active")]){
        try {
            return await this.Databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appWriteCollectionID,
                querys,
            )
            
        } catch (error) {
            console.log("AppWrite Service ::getPosts error: ", error);
            return false;
            
        }
    }

    // file upload
    async updateFile(file){
    try {
        return await this.bucket.createFile(
            conf.appWriteBucketID,
            ID.unique(),
            file,
        )
    } catch (error) {
        console.log("AppWrite Service ::updateFile error: ", error);
        return false;
    }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appWriteBucketID,
                fileId,
            )
            return true;
        } catch (error) { 
            console.log("AppWrite Service ::deleteFile error: ", error);
            return false;
        }
    }

    getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appWriteBucketID,
        fileId,
    )    
    }
}
const service = new Serivice();
export default service;