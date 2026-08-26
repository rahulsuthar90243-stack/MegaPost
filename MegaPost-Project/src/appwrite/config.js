import conf from '../configVariable/conf';
import { Client, ID , Databases, Storage, Query} from 'appwrite';

export class Serivice {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.AppWriteURL)
        .setProject(conf.AppWriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
 
    async createPost({title, content, featureImage, status, userId}){
        try {
            const createPost = await this.databases.createDocument(
                conf.AppWriteDatabaseID,
                conf.AppWriteCollectionID,
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
            const updatePost = await this.databases.updateDocument(
                conf.AppWriteDatabaseID,
                conf.AppWriteCollectionID,
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
            await this.databases.deleteDocument(
                conf.AppWriteDatabaseID,
                conf.AppWriteCollectionID,
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
            return await this.databases.getDocument(
                conf.AppWriteDatabaseID,
                conf.AppWriteCollectionID,
                slug,
            )
        } catch (error) {
            console.log("AppWrite Service ::getPost error: ", error);
            return false;
        }
    }

    async getPosts(querys = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.AppWriteDatabaseID,
                conf.AppWriteCollectionID,
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
            conf.AppWriteBucketID,
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
            await this.bucket.deleteFile(
                conf.AppWriteBucketID,
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
        conf.AppWriteBucketID,
        fileId,
    )    
    }
}
const service = new Serivice();
export default service;