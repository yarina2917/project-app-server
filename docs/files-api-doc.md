**Get files**
----

* **URL**

   /files/get

* **Params:**

    type = [image/audio/file]
   
* **Method:**

   GET
   
* **Headers**
    
    x-api-key: [string]  
         
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
        {
            "_id": "5dfa660287c5ba2d97a86b84",
            "title": "Test",
            "path": "test.jpg"
        }
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]

**Upload file**
----

* **URL**

   /files/upload

* **Params:**

    type = [image/audio/file]
    
    title = [string]
    
    extname = [string]  
   
* **Method:**

   POST
   
* **Headers**
    
    x-api-key: [string]  
         
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
        {
            "_id": "5dfa660287c5ba2d97a86b84",
            "title": "Test",
            "path": "test.jpg",
        }
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]
      
**Delete file**
----

* **URL**

   /files/delete/:id
   
* **Method:**

   Delete
   
* **Params:**

    path = [string]   

* **Headers**
    
    x-api-key: [string]  
    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
       {"message": "Success"}
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]      
