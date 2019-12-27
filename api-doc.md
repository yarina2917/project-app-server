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
                "firstName": "Test1",
                "lastName": "Test2",
                "email": "test1@gmail.com",
                "role": "ADMIN"
            },
            {
                "_id": "5dfa660287c5ba2d97a86b84",
                "firstName": "Test1",
                "lastName": "Test2",
                "email": "test2@gmail.com",
                "role": "USER"
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
            "firstName": "Test",
            "lastName": "Test",
            "email": "test@gmail.com",
            "role": "ADMIN",
            "password": "fd465fds4fsd"
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
    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
       {
           "_id": "5dfa660287c5ba2d97a86b84",
           "firstName": "Test",
           "lastName": "Test",
           "email": "test@gmail.com",
           "role": "ADMIN"
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

   POST

* **Data params**
    
    email = [string]
    
    password = [string] 
    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
       {
           "apiKey": "9ca188ff-1285-451c-ac98-9f00a136aae4",
           "_id": "5dfa660287c5ba2d97a86b84",
           "firstName": "Test",
           "lastName": "Test",
           "email": "test@gmail.com",
           "password": "fdsa465f4das",
           "role": "ADMIN"
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
        {"message": "Success"}
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
           "firstName": "Test",
           "lastName": "Test",
           "email": "test@gmail.com",
           "role": "ADMIN"
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
       {"message": "Success"}
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]
