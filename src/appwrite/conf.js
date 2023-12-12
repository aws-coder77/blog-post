import config from "../config/config";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    imageId = "",
    blogContent = "",
    title = "",
    blogStatus = "false",
    userId = "",
  }) {
    try {
      const documentId = ID.unique();
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        documentId,
        { imageId, blogContent, title, blogStatus, userId }
      );
    } catch (error) {
      console.log("appwrite service ---> Create Post :: error ", error);
    }
    return null;
  }

  async updatePost(blogId, { title, blogContent, imageId, blogStatus }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        blogId,
        {
          title,
          blogContent,
          imageId,
          blogStatus,
        }
      );
    } catch (error) {
      console.log("appwrite service ---> Update Post :: error ", error);
    }
  }

  async deletePost(blogId) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        blogId
      );
      return true;
    } catch (error) {
      console.log("appwrite service ---> Delete Post :: error ", error);
      return false;
    }
    return false;
  }

  async getPost(collectionId) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        collectionId
      );
    } catch (error) {
      console.log("appwrite service ---> Get Post  :: error ", error);
      return false;
    }
    return false;
  }

  async getPosts() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId
      );
    } catch (error) {
      console.log("appwrite service ---> Get All Post :: error ", error);
      return false;
    }
    return false;
  }
  async getHomePosts() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.limit(10)]
      );
    } catch (error) {
      console.log("appwrite service ---> Get All Post :: error ", error);
      return false;
    }
    return false;
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("appwrite service ---> Upload File :: error ", error);
      return false;
    }
    return false;
  }

  async deleteFile(imageId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, imageId);
      return true;
    } catch (error) {
      console.log("appwrite service ---> Delete File :: error ", error);
      return false;
    }

    return false;
  }

  getFilePreview(imageId) {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, imageId);
    } catch (error) {
      console.log("appwrite service ---> get File Preview :: error ", error);
      return false;
    }
  }

  async getUserPost(curser) {
    try {
      const queryOptions = [Query.limit(20), Query.equal("blogStatus", "true")];

      if (curser !== null && !isNaN(curser)) {
        queryOptions.push(Query.offset(curser));
      }

      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queryOptions
      );
    } catch (error) {
      console.log("appwrite service ---> get User Post :: error ", error);
      return false;
    }
  }
}

const service = new Service();

export default service;
