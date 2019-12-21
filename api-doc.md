**Get users**
----
* **URL**

   /users/get
   
* **Method:**

   GET
   
* **Headers**
    
    x-api-key: [string]   
   
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
        [
            {
                "_id": "5dfa660287c5ba2d97a86b84",
                "firstName": "Yana",
                "lastName": "Yana",
                "email": "yana@gmail.com",
                "role": "Admin"
            },
            {
                "_id": "5dfa660287c5ba2d97a86b84",
                "firstName": "Yana",
                "lastName": "Yana",
                "email": "yana@gmail.com",
                "role": "User"
            }
        ]
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]
      
    
**Get user**
----

* **URL**

   /users/get-one/:id
   
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
            "firstName": "Yana",
            "lastName": "Yana",
            "email": "yana@gmail.com",
            "role": "Admin"
        }
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]

**Create user**
----

* **URL**

   /users/create
   
* **Method:**

   POST

* **Data params**

    firstName = [string]
    
    lastName = [string]
    
    email = [string]
    
    password = [string] 
    
    role = [string]
    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
       {
           "_id": "5dfa660287c5ba2d97a86b84",
           "firstName": "Yana",
           "lastName": "Yana",
           "email": "yana@gmail.com",
           "password": "12345",
           "role": "Admin"
       }
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string] 
   
**Login user**
----

* **URL**

   /users/login
   
* **Method:**

   GET

* **Headers**
    
    Authorization: [string]
    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
       {
           "apiKey": "9ca188ff-1285-451c-ac98-9f00a136aae4",
           "_id": "5dfa660287c5ba2d97a86b84",
           "firstName": "Yana",
           "lastName": "Yana",
           "email": "yana@gmail.com",
           "password": "12345",
           "role": "Admin"
       }
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]   
      
**Logout user**
----

* **URL**

   /users/logout
   
* **Method:**

   GET

* **Headers**
    
    x-api-key: [string]  
        
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
        {"message": "Successful logout"}
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]            

**Update user**
----

* **URL**

   /users/update/:id
   
* **Method:**

   PUT
   
* **Headers**
    
    x-api-key: [string]  
    
* **Data params**

    firstName = [string]
    
    lastName = [string]
    
    email = [string]
    
    password = [string] 
    
    role = [string]
    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
       {
           "_id": "5dfa660287c5ba2d97a86b84",
           "firstName": "Yana",
           "lastName": "Yana",
           "email": "yana@gmail.com",
           "password": "12345",
           "role": "Admin"
       }
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]

**Delete user**
----

* **URL**

   /users/delete/:id
   
* **Method:**

   Delete

* **Headers**
    
    x-api-key: [string]  
    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
       {"message": "User was deleted"}
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]
